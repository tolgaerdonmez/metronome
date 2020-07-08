import { actions as ACTION } from "../actions/metronome";
import { MetronomeReducerState } from "../../types/redux";

const initialState: MetronomeReducerState = {
  playing: false,
  bpm: 60,
  currentBeat: 0,
  beats: 4,
  notes: 2, // this is the power to calc notes with 2 => 2 ** notes
  preset: 1,
};

interface Action {
  type: string;
  payload: any;
}

export default (
  state = initialState,
  { type, payload }: Action
): MetronomeReducerState => {
  switch (type) {
    case ACTION.START:
      return { ...state, playing: true };
    case ACTION.STOP:
      return { ...state, playing: false, currentBeat: 0 };
    case ACTION.SET_BPM:
      return { ...state, bpm: payload };
    case ACTION.SET_BEATS:
      return { ...state, beats: payload };
    case ACTION.SET_NOTES:
      return { ...state, notes: payload };
    case ACTION.SET_PRESET:
      return { ...state, preset: payload };
    case ACTION.SET_CURRENT_BEAT:
      return { ...state, currentBeat: payload };
    default:
      return state;
  }
};
