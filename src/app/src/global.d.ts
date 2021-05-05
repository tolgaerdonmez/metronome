import { events } from "../../shared/events";

declare global {
  interface Window {
    eevents: typeof events;
  }
}
