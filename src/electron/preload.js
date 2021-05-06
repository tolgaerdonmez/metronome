const { contextBridge } = require("electron");
const { createEvents } = require("../lib/shared/events");

contextBridge.exposeInMainWorld("eevents", createEvents(true));
