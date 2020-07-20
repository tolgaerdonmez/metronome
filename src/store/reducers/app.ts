import { actions as ACTION } from "../actions/app";
import { AppReducerState } from "../../types/redux";

const initialState: AppReducerState = {
  focusMode: false,
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
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
