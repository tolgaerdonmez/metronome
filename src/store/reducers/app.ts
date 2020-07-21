import { actions as ACTION } from "../actions/app";
import { AppReducerState } from "../../types/redux";

const initialState: AppReducerState = {
  focusMode: false,
  shortcuts: [],
  showShortcuts: false,
};

interface Action {
  type: string;
  payload: any;
}

export default (
  state = initialState,
  { type, payload }: Action
): AppReducerState => {
  switch (type) {
    case ACTION.TOGGLE_FOCUS_MODE:
      return { ...state, focusMode: !state.focusMode };
    case ACTION.LOAD_SHORTCUTS:
      return { ...state, shortcuts: payload };
    case ACTION.TOGGLE_SHORTCUTS:
      return {
        ...state,
        showShortcuts: payload === undefined ? !state.showShortcuts : payload,
      };
    case "MAIN_MENU":
      return { ...state, focusMode: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
