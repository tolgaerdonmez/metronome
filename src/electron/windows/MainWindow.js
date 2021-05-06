const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const url = require("url");
const isDev = require("electron-is-dev");
const path = require("path");
const { createEvents } = require("../../lib/shared/events");

const eevents = createEvents(false);

class MainWindow extends BrowserWindow {
  constructor(options) {
    super(options);
    this.init();
  }

  init = () => {
    this.loadURL(
      isDev
        ? "http://localhost:3000"
        : url.format({
            pathname: path.join(__dirname, "../../index.html"),
            protocol: "file:",
            slashes: true,
          })
    );
    this.createMainMenu();

    this.ipcInit();
  };

  createMainMenu = () => {
    const mainMenuTemplate = [
      {
        label: app.name,
        submenu: [
          {
            label: "Reset App",
            accelerator: "Shift+Escape",
            click: () => this.webContents.send(eevents.resetApp.event),
          },
          {
            label: "Main Screen",
            accelerator: "Escape",
            click: () =>
              this.webContents.send(eevents.changeToMainScreen.event),
          },
          {
            label: "App Shortcuts",
            accelerator: "Shift+S",
            click: () =>
              this.webContents.send(eevents.toggleShortcutsPage.event),
          },
        ],
      },
      {
        label: "Controls",
        submenu: [
          {
            label: "Start/Stop",
            accelerator: "space",
            click: () => this.webContents.send(eevents.startStopBeats.event),
          },
          {
            label: "Toggle Focus Mode",
            accelerator: "F",
            click: () =>
              this.webContents.send(eevents.toggleToFocusScreen.event, ""),
          },
          {
            label: "Tap BPM",
            accelerator: "T",
            click: () => this.webContents.send(eevents.tapBpm.event, ""),
          },
          {
            label: "Change Sound Preset",
            accelerator: "S",
            click: () => this.webContents.send(eevents.changeSoundPreset.event),
          },
        ],
      },
      {
        label: "BPM",
        submenu: [
          {
            label: "Faster +10",
            accelerator: "numadd",
            click: () => this.webContents.send(eevents.changeBpm.event, 10),
          },
          {
            label: "Slower -10",
            accelerator: "numsub",
            click: () => this.webContents.send(eevents.changeBpm.event, -10),
          },
          {
            label: "Faster +1",
            accelerator: "Control+numadd",
            click: () => this.webContents.send(eevents.changeBpm.event, 1),
          },
          {
            label: "Slower -1",
            accelerator: "Control+numsub",
            click: () => this.webContents.send(eevents.changeBpm.event, -1),
          },
        ],
      },
      {
        label: "Beats",
        submenu: [
          {
            label: "Add Beat",
            accelerator: "B",
            click: () =>
              this.webContents.send(eevents.incrementBeatCount.event),
          },
          {
            label: "Remove Beat",
            accelerator: "Control+B",
            click: () =>
              this.webContents.send(eevents.decrementBeatCount.event),
          },
        ],
      },
      {
        label: "Window",
        submenu: [
          { role: "minimize" },
          { role: "hide" },
          { role: "close" },
          { role: "quit" },
        ],
      },
    ];

    // creating an object with all menu items, for frontend to show in the app
    this.shortcuts = mainMenuTemplate
      .slice(0, mainMenuTemplate.length - 1)
      .map((menu) => ({
        title: menu.label,
        shortcuts: [
          ...menu.submenu.map((sh) => ({
            label: sh.label ? sh.label : sh.role ? sh.role : undefined,
            mapping: sh.accelerator ? sh.accelerator : undefined,
          })),
        ],
      }));

    // if (isDev) {
    mainMenuTemplate.push({
      label: "Developer Tools",
      submenu: [
        {
          label: "Toggle DevTools",
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          },
          accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
        },
        { role: "reload" },
      ],
    });
    // }

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
  };

  ipcInit = () => {
    ipcMain.on(eevents.requestShortcutsList.event, () => {
      try {
        this.webContents.send(
          eevents.receiveShortcutsList.event,
          this.shortcuts
        );
      } catch (error) {
        console.log(error.message);
      }
    });

    ipcMain.on("reload", () => {
      this.reload();
    });
  };
}

module.exports = MainWindow;
