const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const DiscordRpc = require("discord-rpc");
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ 
    width: 800, 
    height: 600,
    show: false,
    //frameRate: 30,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      sandbox: false,
      webSecurity: false, // needed to load local images
      preload: path.join(__dirname, 'preload.js'),
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
    win.show();
  }, 5000);

  win.loadURL('https://deadshot.io')

  ////////////////////////////////////////////////////////
  ///// data exchange between main.js and preload.js /////
  ////////////////////////////////////////////////////////

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

    var skins = [];
    var imgpath = path.join(app.getPath("documents"), "DeadshotClient/gunskins");

    imageFiles.forEach(function(imageFile) {
      var pathcontainer = imgpath + "/" + `${imageFile}`

      console.log(`Processing image file: ${imageFile} pathcontainer: ` + pathcontainer);


      // push file names to skin-array
      skins.push(pathcontainer);
      
    });

    win.webContents.on('did-finish-load', () => {
      win.webContents.send('filepaths', skins)
    })

  });
  ////////////////////////////////////////////////////////
})

//app.commandLine.appendSwitch('fps', '1')
  

/*app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})*/