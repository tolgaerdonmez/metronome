import { ThunkAction } from "redux-thunk";
import { ReduxState, TapBpm } from "../../types/redux";
import { Action } from "redux";
import { bpmToMs } from "../../utils/misc";
import { beats as beatLoader } from "../../utils/sounds";

export const actions = {
  START: "START",
  STOP: "STOP",
  SET_BPM: "SET_BPM",
  SET_PRESET: "SET_PRESET",
  SET_BEATS: "SET_BEATS",
  SET_NOTES: "SET_NOTES",
  SET_CURRENT_BEAT: "SET_CURRENT_BEAT",
  SET_BEAT_TIMEOUT: "SET_BEAT_TIMEOUT",
  CLEAR_BEAT_TIMEOUT: "CLEAR_BEAT_TIMEOUT",
  TOGGLE_TAP_BPM_FOCUS: "TOGGLE_TAP_BPM_FOCUS",
  SET_TAP_BPM: "SET_TAP_BPM",
};

export const start = () => ({
  type: actions.START,
  payload: undefined,
});

export const stop = () => ({
  type: actions.STOP,
  payload: undefined,
});

export const setBpm = (bpm: number) => ({
  type: actions.SET_BPM,
  payload: bpm,
});

export const setBeats = (beats: number) => ({
  type: actions.SET_BEATS,
  payload: beats,
});

export const setNotes = (notes: number) => ({
  type: actions.SET_NOTES,
  payload: notes,
});

export const incrementBeat = (): ThunkAction<
  void,
  ReduxState,
  unknown,
  Action<any>
> => (dispatch, getState) => {
  const {
    metronome: { currentBeat, beats },
  } = getState();

  const reset = currentBeat >= beats;
  const newCBeat = reset ? 1 : currentBeat + 1;

  const action = { type: actions.SET_CURRENT_BEAT, payload: newCBeat };
  dispatch(action);
};

export const setBeatTimeout = (interval: NodeJS.Timeout) => ({
  type: actions.SET_BEAT_TIMEOUT,
  payload: interval,
});

export const clearBeatTimeout = () => ({
  type: actions.CLEAR_BEAT_TIMEOUT,
  payload: undefined,
});

let beats = beatLoader(1);

export const setPreset = (preset: number) => {
  const limit = 9;
  const _preset = preset > limit ? 1 : preset < 1 ? 1 : preset;
  beats = beatLoader(_preset);
  return {
    type: actions.SET_PRESET,
    payload: _preset,
  };
};

export const startBeats = (): ThunkAction<
  void,
  ReduxState,
  unknown,
  Action<any>
> => (dispatch, getState) => {
  const {
    metronome: { bpm },
  } = getState();
  if (bpm <= 0) {
    return dispatch(stopBeats());
  }
  dispatch(playBeat());
  const beatTimeout = setTimeout(() => {
    dispatch(startBeats());
  }, bpmToMs(bpm));
  dispatch(setBeatTimeout(beatTimeout));
  dispatch(start());
};

export const stopBeats = (): ThunkAction<
  void,
  ReduxState,
  unknown,
  Action<any>
> => (dispatch, getState) => {
  const {
    metronome: { beatTimeout },
  } = getState();
  if (beatTimeout) {
    beats.second.playing && beats.second.stop();
    dispatch(clearBeatTimeout());
    dispatch(stop());
  }
};

export const playBeat = (): ThunkAction<
  void,
  ReduxState,
  unknown,
  Action<any>
> => (dispatch, getState) => {
  dispatch(incrementBeat());
  const {
    metronome: { currentBeat, bpm },
  } = getState();
  if (bpm <= 0 || bpm > 500) return dispatch(stopBeats);
  if (currentBeat === 1 || currentBeat === 0) beats.main.play();
  else beats.second.play();
};

export const setTapBpm = (tapBpm: Partial<TapBpm>) => ({
  type: actions.SET_TAP_BPM,
  payload: tapBpm,
});

export const toggleTapBpmFocus = (): ThunkAction<
  void,
  ReduxState,
  unknown,
  Action<any>
> => (dispatch) => {
  dispatch(stopBeats());
  dispatch({
    type: actions.TOGGLE_TAP_BPM_FOCUS,
    payload: undefined,
  });
};

export const startTapBpm = (): ThunkAction<
  void,
  ReduxState,
  unknown,
  Action<any>
> => (dispatch) => {
  const startTime = Date.now();
  dispatch(setTapBpm({ startTime, count: 1 }));
};

export const incrementTapCount = (): ThunkAction<
  void,
  ReduxState,
  unknown,
  Action<any>
> => (dispatch, getState) => {
  const {
    metronome: {
      tapBpm: { count },
    },
  } = getState();
  console.log("increment tap count");
  const newEndTime = Date.now();
  dispatch(setTapBpm({ endTime: newEndTime, count: count + 1 }));
  dispatch(calculateTappedBpm());
};

export const calculateTappedBpm = (): ThunkAction<
  void,
  ReduxState,
  unknown,
  Action<any>
> => (dispatch, getState) => {
  const {
    metronome: {
      tapBpm: { count, startTime, endTime },
    },
  } = getState();

  const deltaTime = endTime - startTime;
  const rawBpm = (count * 60_000) / deltaTime;
  const bpm = Math.floor(rawBpm);

  dispatch(setBpm(bpm));
};
