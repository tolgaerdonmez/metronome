import { actions as ACTION } from "../actions/metronome";
import { MetronomeReducerState } from "../../types/redux";

const initialState: MetronomeReducerState = {
  playing: false,
  bpm: 60,
  currentBeat: 0,
  beats: 4,
  notes: 2, // this is the power to calc notes with 2 => 2 ** notes
  preset: 1,
  beatTimeout: null,
  tapBpm: {
    count: 0,
    endTime: 0,
    startTime: 0,
    focusMode: false,
  },
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
      let bpm = payload;
      if (bpm > 500) bpm = 500;
      return { ...state, bpm: bpm };
    case ACTION.SET_BEATS:
      return { ...state, beats: payload };
    case ACTION.SET_NOTES:
      return { ...state, notes: payload };
    case ACTION.SET_PRESET:
      return { ...state, preset: payload };
    case ACTION.SET_CURRENT_BEAT:
      return { ...state, currentBeat: payload };
    case ACTION.SET_BEAT_TIMEOUT:
      return { ...state, beatTimeout: payload };
    case ACTION.CLEAR_BEAT_TIMEOUT:
      if (state.beatTimeout) clearTimeout(state.beatTimeout);
      return { ...state, beatTimeout: null };
    case ACTION.TOGGLE_TAP_BPM_FOCUS:
      return {
        ...state,
        tapBpm: { ...state.tapBpm, focusMode: !state.tapBpm.focusMode },
      };
    case ACTION.SET_TAP_BPM:
      return {
        ...state,
        tapBpm: { ...state.tapBpm, ...payload },
      };
    default:
      return state;
  }
};
