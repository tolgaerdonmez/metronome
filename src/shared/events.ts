import { AppShortcut } from "../app/src/types/redux";
import { ThemeName } from "../app/src/types/theme";
import { createEventFactory } from "./EEvent";

export const createEvents = (withIpc: boolean = true) => {
  const createEvent = createEventFactory(withIpc);
  return {
    requestShortcutsList: createEvent("app:req-shortcuts-list"),
    receiveShortcutsList: createEvent<AppShortcut[]>("app:res-shortcuts-list"),
    resetApp: createEvent("app:reset"),
    toggleShortcutsPage: createEvent("app:toggle-shortcuts-list"),
    changeToMainScreen: createEvent("app:main-screen"),
    toggleToFocusScreen: createEvent("app:toggle-focus"),
    changeSoundPreset: createEvent("app:change-sound-preset"),
    changeColorTheme: createEvent<ThemeName>("app:change-color-theme"),
    incrementBeatCount: createEvent("beats:add"),
    decrementBeatCount: createEvent("beats:remove"),
    startStopBeats: createEvent("beats:start-stop"),
    changeBpm: createEvent<number>("beats:change-speed"),
    tapBpm: createEvent("beats:tap-bpm"),
  };
};
