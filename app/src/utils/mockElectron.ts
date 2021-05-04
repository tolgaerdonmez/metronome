export function mockElectron() {
  const emptyMock = (e: any, ...args: any[]) => {
    console.log(args);
    return {} as any;
  };

  if (!window.ipcRenderer) {
    window.ipcRenderer = {
      on: emptyMock,
      off: emptyMock,
      once: emptyMock,
    } as any;
  }
}
