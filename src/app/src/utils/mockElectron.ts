export function mockElectron() {
  const emptyMock = (e: any, ...args: any[]) => {
    console.log("IPC RENDERER CALLED");
    return {} as any;
  };

  if (!window.eevents) {
    window.eevents = {} as any;
  }
  window.electron = {
    ipcRenderer: {
      on: emptyMock,
      off: emptyMock,
      once: emptyMock,
    } as any,
  };
}
