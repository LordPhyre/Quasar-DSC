const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 852,
    height: 480,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      sandbox: false
    }
  })

  //BrowserWindow.maximize()
  //mainWindow.removeMenu()
  mainWindow.loadURL('https://deadshot.io')

  var cssToLoad = '';
  var mainCSS = '/* Client Settings */ #clientSettingsTab:hover{background-color:rgba(0,0,0,0.5);border-color: white!important;} #gameSettingsTab:hover{background-color:rgba(0,0,0,0.5);border-color: white!important;} #settingsDivOff{display:none!important} .activeSettings{display:block;} .inactiveSettings{display:none;} .requiresRestart::after{color:red;content:"*"} #settingsDivCli .bar { width: 100%; height: 2px; background-color: rgba(236, 236, 236, 0.295); margin: 9px 0px; }';
  
  // Main CSS
  cssToLoad += mainCSS;
  console.log('Added Branding CSS');
  
  // CSS swap
  mainWindow.webContents.on('dom-ready', function () {
      console.log('Attempting to load CSS...');
      mainWindow.webContents.send('injectCSS', cssToLoad);
  });
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
