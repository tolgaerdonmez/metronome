import { createEvents } from "../../shared/events";

declare global {
  interface Window {
    eevents: ReturnType<typeof createEvents>;
    electron: { ipcRenderer: any };
  }
}
