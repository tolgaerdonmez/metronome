export function mockElectron() {
  const emptyMock = (e: any, ...args: any[]) => {
    console.log(args);
    return {} as any;
  };

  if (!window.electron.ipcRenderer) {
    window.electron.ipcRenderer = {
      on: emptyMock,
      off: emptyMock,
      once: emptyMock,
    } as any;
  }
}
