/**
 * app:req-shortcuts-list send
 * app:res-shortcuts-list recieve
 *
 * app:reset receive
 *
 * app:toggle-shortcuts-list receive
 * app:main-screen receive
 *
 * app:toggle-focus rec
 *
 * app:change-sound-preset rec
 *
 * beats:add rec
 * beats:remove rec
 *
 * beats:start-stop rec
 * beats:change-speed rec
 *
 * beats:tap-bpm rec
 *
 *  */

import { AppShortcut } from "../app/src/types/redux";
import { createEvent } from "./EEvent";

export const events = {
  reqShortcutsList: createEvent("app:req-shotcuts-list"),
  receiveShortcutsList: createEvent<AppShortcut[]>("app:res-shotcuts-list"),
  resetApp: createEvent("app:reset"),
  toggleShortcutsPage: createEvent("app:toggle-shortcuts-list"),
  changeToMainScreen: createEvent("app:main-screen"),
  toggleToFocusScreen: createEvent("app:toggle-focus"),
  changeSoundPreset: createEvent("app:change-sound-preset"),
  incrementBeatCount: createEvent("beats:add"),
  decrementBeatCount: createEvent("beats:remove"),
  startStopBeats: createEvent("beats:start-stop"),
  changeBpm: createEvent<Number>("beats:change-speed"),
  tapBpm: createEvent("beats:tap-bpm"),
};
