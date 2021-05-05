import React, { useEffect } from "react";
import "./sass/App.scss";

import Metronome from "./components/Metronome";
import Shortcuts from "./components/Shortcuts";

import { useDispatch, useSelector } from "react-redux";
import { loadShortcuts, toggleShortcuts } from "./store/actions/app";
import { AppShortcut, ReduxState } from "./types/redux";
import { withSound } from "./utils/sounds";

function App() {
  const dispatch = useDispatch();
  const showShortcuts = useSelector(({ app }: ReduxState) => app.showShortcuts);

  // useEffect(() => {
  //   window.electron.ipcRenderer.send("app:req-shortcuts-list");
  // }, []);

  // useEffect(() => {
  //   const listener = (event: any, shortcuts: AppShortcut[]) => {
  //     dispatch(loadShortcuts(shortcuts));
  //   };
  //   window.electron.ipcRenderer.on("app:res-shortcuts-list", listener);
  //   return () => {
  //     window.electron.ipcRenderer.off("app:res-shortcuts-list", listener);
  //   };
  // }, [dispatch]);

  // useEffect(() => {
  //   const resetHandler = withSound(() =>
  //     dispatch({ type: "RESET", payload: undefined })
  //   );
  //   window.electron.ipcRenderer.on("app:reset", resetHandler);
  //   return () => {
  //     window.electron.ipcRenderer.off("app:reset", resetHandler);
  //   };
  // }, [dispatch]);

  // useEffect(() => {
  //   const listener = withSound(() => dispatch(toggleShortcuts()));
  //   window.electron.ipcRenderer.on("app:toggle-shortcuts-list", listener);
  //   return () => {
  //     window.electron.ipcRenderer.off("app:toggle-shortcuts-list", listener);
  //   };
  // }, [dispatch]);

  // useEffect(() => {
  //   const listener = withSound(() =>
  //     dispatch({ type: "MAIN_MENU", payload: undefined })
  //   );
  //   window.electron.ipcRenderer.on("app:main-screen", listener);
  //   return () => {
  //     window.electron.ipcRenderer.off("app:main-screen", listener);
  //   };
  // }, [dispatch]);

  if (showShortcuts) return <Shortcuts />;
  else return <Metronome />;
}

export default App;
