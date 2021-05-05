const { contextBridge } = require("electron");
const { events } = require("../shared/events");

contextBridge.exposeInMainWorld("eevents", events);
