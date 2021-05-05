const { contextBridge } = require("electron");
const { events } = require("../shared/dist/shared/events.js");

contextBridge.exposeInMainWorld("eevents", events);
