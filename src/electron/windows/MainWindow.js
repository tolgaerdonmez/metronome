const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const url = require("url");
const isDev = require("electron-is-dev");
const path = require("path");

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
            pathname: path.join(__dirname, "../index.html"),
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
            click: () => this.webContents.send("app:reset"),
          },
          {
            label: "Main Screen",
            accelerator: "Escape",
            click: () => this.webContents.send("app:main-screen"),
          },
          {
            label: "App Shortcuts",
            accelerator: "Shift+S",
            click: () => this.webContents.send("app:toggle-shortcuts-list"),
          },
        ],
      },
      {
        label: "Controls",
        submenu: [
          {
            label: "Start/Stop",
            accelerator: "space",
            click: () => this.webContents.send("beats:start-stop"),
          },
          {
            label: "Toggle Focus Mode",
            accelerator: "F",
            click: () => this.webContents.send("app:toggle-focus", ""),
          },
          {
            label: "Tap BPM",
            accelerator: "T",
            click: () => this.webContents.send("beats:tap-bpm", ""),
          },
          {
            label: "Change Sound Preset",
            accelerator: "S",
            click: () => this.webContents.send("app:change-sound-preset"),
          },
        ],
      },
      {
        label: "BPM",
        submenu: [
          {
            label: "Faster +10",
            accelerator: "numadd",
            click: () => this.webContents.send("beats:change-speed", 10),
          },
          {
            label: "Slower -10",
            accelerator: "numsub",
            click: () => this.webContents.send("beats:change-speed", -10),
          },
          {
            label: "Faster +1",
            accelerator: "Control+numadd",
            click: () => this.webContents.send("beats:change-speed", 1),
          },
          {
            label: "Slower -1",
            accelerator: "Control+numsub",
            click: () => this.webContents.send("beats:change-speed", -1),
          },
        ],
      },
      {
        label: "Beats",
        submenu: [
          {
            label: "Add Beat",
            accelerator: "B",
            click: () => this.webContents.send("beats:add"),
          },
          {
            label: "Remove Beat",
            accelerator: "Control+B",
            click: () => this.webContents.send("beats:remove"),
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

    if (isDev) {
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
    }

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
  };

  ipcInit = () => {
    ipcMain.on("app:req-shortcuts-list", async () => {
      try {
        this.webContents.send("app:res-shortcuts-list", this.shortcuts);
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
