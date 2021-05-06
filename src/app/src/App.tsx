import React, { useEffect } from "react";
import "./sass/App.scss";

import Metronome from "./components/Metronome";
import Shortcuts from "./components/Shortcuts";

import { useDispatch, useSelector } from "react-redux";
import { loadShortcuts, toggleShortcuts } from "./store/actions/app";
import { AppShortcut, ReduxState } from "./types/redux";
import { withSound } from "./utils/sounds";
import { useEEventOnOff } from "./hooks";
import { setPreset, stopBeats } from "./store/actions/metronome";

const { eevents } = window;

function App() {
  const dispatch = useDispatch();
  const showShortcuts = useSelector(({ app }: ReduxState) => app.showShortcuts);

  useEffect(() => {
    eevents.requestShortcutsList.send({});
  }, []);

  useEEventOnOff(
    eevents.receiveShortcutsList,
    (_: any, shortcuts: AppShortcut[]) => {
      dispatch(loadShortcuts(shortcuts));
    },
    [dispatch]
  );

  useEEventOnOff(
    eevents.resetApp,
    withSound(() => {
      dispatch(stopBeats());
      dispatch(setPreset(1));
      dispatch({ type: "RESET", payload: undefined });
    }),
    [dispatch]
  );

  useEEventOnOff(
    eevents.toggleShortcutsPage,
    withSound(() => dispatch(toggleShortcuts())),
    [dispatch]
  );

  useEEventOnOff(
    eevents.changeToMainScreen,
    withSound(() => dispatch({ type: "MAIN_MENU", payload: undefined })),
    [dispatch]
  );

  if (showShortcuts) return <Shortcuts />;
  else return <Metronome />;
}

export default App;
