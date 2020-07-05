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
        label: "File",
        submenu: [
          { role: "reload" },
          {
            label: "Quit",
            role: "quit",
          },
        ],
      },
    ];

    if (process.platform === "darwin") {
      mainMenuTemplate.unshift({
        label: app.name,
      });
    }

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
    ipcMain.on("reload", () => {
      this.reload();
    });
  };
}

module.exports = MainWindow;
