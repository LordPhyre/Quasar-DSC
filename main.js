const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {

  const mainWindow = new BrowserWindow({
    width: 852,
    height: 480,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  BrowserWindow.maximize()
  mainWindow.removeMenu()
  mainWindow.loadURL('https://deadshot.io')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
