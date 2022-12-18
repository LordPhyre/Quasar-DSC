const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

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

    //mainWindow.removeMenu()
    mainWindow.loadURL('https://deadshot.io')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// credit to gatos for the swapper folders

var swapperFolder = path.join(app.getPath("documents"), "DeadshotClient");

if (!fs.existsSync(swapperFolder)) {
    fs.mkdirSync(swapperFolder, { recursive: true });
};
if (!fs.existsSync(path.join(swapperFolder, "/gunskins"))) {
    fs.mkdirSync(path.join(swapperFolder, "/gunskins"), { recursive: true });
};

// do x for images in folder

fs.readdir(path.join(app.getPath("documents"), "DeadshotClient/gunskins"), function(err, files) {
  if (err) {
    console.error('There was an error reading the directory:', err);
    return;
  }

  // Filder actual images (.png and .jpg)
  const imageFiles = files.filter(file => file.endsWith('.png') || file.endsWith('.jpg'));

  imageFiles.forEach(function(imageFile) {
    console.log(`Processing image file: ${imageFile}`);
  });
});


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
