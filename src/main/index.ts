import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { registerIpcHandlers } from './ipc'
import { runAppBootstrap } from './bootstrap'

// Add --no-sandbox flag when running in WSL2 without a display server
if (process.platform === 'linux' && !process.env.DISPLAY && !process.env.WAYLAND_DISPLAY) {
  app.commandLine.appendSwitch('no-sandbox')
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 650,
    height: 580,
    minWidth: 580,
    minHeight: 440,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
    title: 'Claude Workspace Launcher',
    autoHideMenuBar: true,
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.maximize()
}

app.whenReady().then(() => {
  runAppBootstrap()
  registerIpcHandlers()
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
