import { ThunkAction } from "redux-thunk";
import { ReduxState } from "../../types/redux";
import { Action } from "redux";

export const actions = {
  START: "START",
  STOP: "STOP",
  SET_BPM: "SET_BPM",
  SET_PRESET: "SET_PRESET",
  SET_BEATS: "SET_BEATS",
  SET_NOTES: "SET_NOTES",
  SET_CURRENT_BEAT: "SET_CURRENT_BEAT",
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
