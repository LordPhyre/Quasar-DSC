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
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      sandbox: false,
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

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  })
})

/*const createWindow = () => {
    const mainWindow = new BrowserWindow({
        //autoHideMenuBar: true,
        width: 852,
        height: 480,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            sandbox: false,
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
      mainWindow.show();
    }, 5000);

    mainWindow.loadURL('https://deadshot.io')

    const data = { message: 'test' };

    mainWindow.webContents.send('data-from-main', data);
}*/

////////////////////////////////////////////////////////
///// file exchange between main.js and preload.js /////
////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////

/*const imageFolder = './images';

fs.readdir(imageFolder, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const filePaths = files.map((file) => path.join(imageFolder, file));

  ipcRenderer.send('image-file-paths', filePaths);
});*/


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


/*ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});*/

// Rich Presence
/*const clientId = "1016830391694413835";
const rpc = new DiscordRpc.Client({ transport: 'ipc' });
const setActivity =
  async (gameInfo) => {
      console.log(gameInfo)
      try {
          rpc.setActivity({
              details: "Playing Deadshot.io",
              state: "v" + app.getVersion(),
              startTimestamp: Date.now(),
              largeImageKey: "icon",
              buttons: [
                  { label: 'Download', url: 'https://github.com/LordPhyre/BestestBestBetterGoodDeadshotClient/' }
              ]
          })
      } catch {
      }
  }*/

  
/*const rpc = require("discord-rpc");
const client = new rpc.Client({ transport: 'ipc' });
const config = require('./config.json');

client.login({ clientId: config.ClientID }).catch(console.error);

client.on('ready', () => {
    console.log('[DEBUG] Presence now active!')
    console.log('[WARN] Do not close this Console as it will terminate the rpc')
    console.log('=================== Error Output ===================')
    client.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
            details: config.Details,
            state: config.State,
            timestamps: {
                start: Date.now()
            },
            assets: {
                large_image: config.LargeImage,
                large_text: config.LargeImageText,
                small_image: config.SmallImage,
                small_text: config.SmallImageText,
            },
            buttons: [{
                    label: config.Button1,
                    url: config.Url1
                },
                {
                    label: config.Button2,
                    url: config.Url2
                },
            ]
        }
    })
})*/
  

/*app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})*/