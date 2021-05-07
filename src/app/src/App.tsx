import React, { useEffect } from "react";
import "./sass/App.scss";

import Metronome from "./components/Metronome";
import Shortcuts from "./components/Shortcuts";

import { useDispatch, useSelector } from "react-redux";
import { loadShortcuts, toggleShortcuts } from "./store/actions/app";
import { AppShortcut, ReduxState } from "./types/redux";
import { useEEventOnOff } from "./hooks/eevents";
import { withSound } from "./utils/sounds";
import { setPreset, stopBeats } from "./store/actions/metronome";
import { useTheme } from "./hooks/theme";
import { ThemeName } from "./types/theme";

const { eevents } = window;

function App() {
  const dispatch = useDispatch();
  const showShortcuts = useSelector(({ app }: ReduxState) => app.showShortcuts);

  const [, setTheme] = useTheme();

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

  useEEventOnOff<ThemeName>(eevents.changeColorTheme, (_, theme) =>
    setTheme(theme)
  );

  if (showShortcuts) return <Shortcuts />;
  else return <Metronome />;
}

export default App;
