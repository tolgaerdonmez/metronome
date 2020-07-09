import { ThunkAction } from "redux-thunk";
import { ReduxState } from "../../types/redux";
import { Action } from "redux";
import { bpmToMs } from "../../utils/misc";
import { mainBeat, secondBeat } from "../../utils/sounds";

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

export const setPreset = (preset: number) => ({
  type: actions.SET_PRESET,
  payload: preset,
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

export const startBeats = (): ThunkAction<
  void,
  ReduxState,
  unknown,
  Action<any>
> => (dispatch, getState) => {
  dispatch(playBeat());
  const {
    metronome: { bpm },
  } = getState();
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
    secondBeat.playing && secondBeat.stop();
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
    metronome: { currentBeat },
  } = getState();
  if (currentBeat === 1 || currentBeat === 0) mainBeat.play();
  else secondBeat.play();
};
