const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 852,
        height: 480,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    var splash = new BrowserWindow({
      width: 500, 
      height: 300, 
      transparent: true, 
      frame: false, 
      alwaysOnTop: true 
    });

    splash.loadFile('splash.html');
    splash.center();

    setTimeout(function () {
      splash.close();
      mainWindow.show();
    }, 5000);

    mainWindow.removeMenu()
    mainWindow.loadURL('https://deadshot.io')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
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
