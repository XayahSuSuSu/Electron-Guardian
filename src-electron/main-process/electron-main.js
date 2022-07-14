import {app, BrowserWindow, nativeTheme, Menu} from 'electron'

const {ipcMain} = require('electron');
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : `file://${__dirname}/index.html`

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) {
}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname
}

let loginWindow
const loginURL = winURL + "#/login"

function createWindow() {
  /**
   * Initial window options
   */
  loginWindow = new BrowserWindow({
    width: 400,
    height: 480,
    useContentSize: true,
    resizable: false,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })
  loginWindow.loadURL(loginURL)
  loginWindow.on('closed', () => {
    loginWindow = null
  })
}

ipcMain.on('closeLoginWindow', () =>
  loginWindow.close()
)

let mainWindow
const mainURL = winURL + "#/main"

function openMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    resizable: false,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })
  mainWindow.loadURL(mainURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('openMainWindow', () =>
  openMainWindow()
)


app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (loginWindow === null) {
    createWindow()
  }
})

Menu.setApplicationMenu(null)
