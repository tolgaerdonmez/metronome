import { AppShortcut } from "../../types/redux";

export const actions = {
  TOGGLE_FOCUS_MODE: "TOGGLE_FOCUS_MODE",
  LOAD_SHORTCUTS: "LOAD_SHORTCUTS",
  TOGGLE_SHORTCUTS: "TOGGLE_SHORTCUTS",
};

export const toggleFocusMode = () => ({
  type: actions.TOGGLE_FOCUS_MODE,
  payload: undefined,
});

export const loadShortcuts = (shortcuts: AppShortcut[]) => ({
  type: actions.LOAD_SHORTCUTS,
  payload: shortcuts,
});

export const toggleShortcuts = (show?: boolean) => ({
  type: actions.TOGGLE_SHORTCUTS,
  payload: show,
});
