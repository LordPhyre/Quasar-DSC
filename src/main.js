const { app, BrowserWindow, ipcMain, protocol, globalShortcut} = require('electron');
const path = require('path');
const fs = require('fs');
//const DiscordRpc = require("discord-rpc");
const os = require('os-utils');
//const unzipper = require('unzipper');
const { autoUpdater } = require('electron-updater'); // implement
const swapper = require('./swapper.js'); // Swapper
let win = null
const userDataPath = path.join(app.getPath('appData'), app.getName())
const jsonpath = path.join(userDataPath, '/Settings.json');
console.log(jsonpath);

//Check if JSON exists first
if (!fs.existsSync(jsonpath)) {
    // file does not exist, create it
    const jsonsettings = { FPS: true, Online: false, Shortcuts: true, Platform: false, CPU: true, memory: true, Tmemory: false, Cores: false, Uptime: false, Ping: true,  WASD: false, Flags: false};
    fs.writeFileSync(jsonpath, JSON.stringify(jsonsettings));
} else {
    console.log("File exists");
};

// Parse the contents of the file into a JavaScript object
let jsonobj = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));
console.log(jsonobj);


// Chromium Flags based on JSON
if(jsonobj.Flags) {
    app.commandLine.appendSwitch("disable-print-preview");
    app.commandLine.appendSwitch("javascript-harmony");
    app.commandLine.appendSwitch("renderer-process-limit", 100);
    app.commandLine.appendSwitch("max-active-webgl-contexts", 100);
    app.commandLine.appendSwitch("ignore-gpu-blocklist");
    app.commandLine.appendSwitch("disable-2d-canvas-clip-aa");
    app.commandLine.appendSwitch("disable-logging");
    console.log('Enabled Experiments');

    app.commandLine.appendSwitch("in-process-gpu");
    console.log('In Process GPU is active');

    app.commandLine.appendSwitch("disable-accelerated-2d-canvas", "true");
    console.log('Disabled Accelerated 2D canvas');
} else if (!jsonobj.Flags) {
    console.log('Command Line Switches Off')
};


app.whenReady().then(() => {

  ///////////////////////////////////////////////////////////////////////////////////////////

  const request = require("request");
  let condition = 0;
  let preloadPath = path.resolve(__dirname, './preload.js');

  request("http://www.deadshot.io", function(error, response, body) {
    if (error || response.statusCode !== 200) {
      console.log("Offline");
      condition = false;
    } else {
      console.log("Online");
      condition = true;

      setTimeout(function () {
        splash.close();
        win.show();
        win.maximize()
      }, 5000);
    }
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  const splash = new BrowserWindow({
    width: 500, 
    height: 300, 
    transparent: true, 
    frame: false,
    alwaysOnTop: true,
  });

  splash.loadFile('splash-screen/splash.html');
  splash.center();

  const noInternetConnectionScreen = new BrowserWindow({
    width: 852,
    height: 480,
    show: false
  });

  noInternetConnectionScreen.setMenuBarVisibility(false);

  noInternetConnectionScreen.loadFile('offline-screen/offline.html');

  const intervalId = setInterval(() => {
    if (condition !== 0) {
      clearInterval(intervalId);
      reload();

      win = new BrowserWindow({ 
        width: 852,
        height: 480,
        show: false,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true,
          sandbox: false,
          webSecurity: false, // needed to load local images
          preload: path.join(__dirname, 'preload.js'),
        }
      })

      win.$ = win.jQuery = require('jquery/dist/jquery.min.js');

      if (condition)
      {
        win.hide();
        win.loadURL('https://deadshot.io');
      } else {
        //win.loadFile('offline.html');
        splash.hide();
        noInternetConnectionScreen.show();
        noInternetConnectionScreen.maximize();
      }

      //win.loadURL('https://deadshot.io')
      win.setMenuBarVisibility(false);

      globalShortcut.register('F6', () => win.loadURL('https://deadshot.io/'));
      globalShortcut.register('F5', () => win.reload());
      globalShortcut.register('Escape', () => win.webContents.executeJavaScript('document.exitPointerLock()', true));
      globalShortcut.register('F7', () => win.webContents.toggleDevTools());
      globalShortcut.register('F11', () => { win.fullScreen = !win.fullScreen;});

      // save for later
      /*const { download } = require('electron-dl');
      download(win, 'https://deadshot.io/maps/tf/out/compressedTextures/BlueIndoorWall.webp', {
        directory: '/path/to/save/the/file',
        filename: 'BlueIndoorWall.webp'
      }).then(dl => console.log(`Finished downloading to ${dl.getSavePath()}`))
        .catch(console.error);
        
      wget -r -np -P /path/to/save/directory https://deadshot.io/maps/tf/out/compressedTextures/ */

      var swapperFolder = path.join(app.getPath("documents"), "Quasar-DSC");

      if (!fs.existsSync(swapperFolder)) {
          fs.mkdirSync(swapperFolder, { recursive: true });
      };

      // gun skins
      if (!fs.existsSync(path.join(swapperFolder, "/gunskins"))) {
          fs.mkdirSync(path.join(swapperFolder, "/gunskins"), { recursive: true });
      };
      if (!fs.existsSync(path.join(swapperFolder, "/gunskins/ar2"))) {
        fs.mkdirSync(path.join(swapperFolder, "/gunskins/ar2"), { recursive: true });
      };
      if (!fs.existsSync(path.join(swapperFolder, "/gunskins/awp"))) {
        fs.mkdirSync(path.join(swapperFolder, "/gunskins/awp"), { recursive: true });
      };
      if (!fs.existsSync(path.join(swapperFolder, "/gunskins/vector"))) {
        fs.mkdirSync(path.join(swapperFolder, "/gunskins/vector"), { recursive: true });
      };

      // textures
      if (!fs.existsSync(path.join(swapperFolder, "/textures"))) {
        fs.mkdirSync(path.join(swapperFolder, "/textures"), { recursive: true });
      };

      // maps/industry/out/compressedTextures
      if (!fs.existsSync(path.join(swapperFolder, "/maps"))) {
        fs.mkdirSync(path.join(swapperFolder, "/maps"), { recursive: true });
      };
      if (!fs.existsSync(path.join(swapperFolder, "/maps/industry"))) {
        fs.mkdirSync(path.join(swapperFolder, "/maps/industry"), { recursive: true });
      };
      if (!fs.existsSync(path.join(swapperFolder, "/maps/industry/out"))) {
        fs.mkdirSync(path.join(swapperFolder, "/maps/industry/out"), { recursive: true });
      };
      if (!fs.existsSync(path.join(swapperFolder, "/maps/industry/out/compressedTextures"))) {
        fs.mkdirSync(path.join(swapperFolder, "/maps/industry/out/compressedTextures"), { recursive: true });
      };

      if (!fs.existsSync(path.join(swapperFolder, "Resource Swapper/maps"))) {
        fs.mkdirSync(path.join(swapperFolder, "Resource Swapper/maps"), { recursive: true });
      };
      if (!fs.existsSync(path.join(swapperFolder, "Resource Swapper/maps/industry"))) {
        fs.mkdirSync(path.join(swapperFolder, "Resource Swapper/maps/industry"), { recursive: true });
      };
      if (!fs.existsSync(path.join(swapperFolder, "Resource Swapper/maps/industry/out"))) {
        fs.mkdirSync(path.join(swapperFolder, "Resource Swapper/maps/industry/out"), { recursive: true });
      };
      if (!fs.existsSync(path.join(swapperFolder, "Resource Swapper/maps/industry/out/compressedTextures"))) {
        fs.mkdirSync(path.join(swapperFolder, "Resource Swapper/maps/industry/out/compressedTextures"), { recursive: true });
      };

      // resource swapper

      // gun skins
      if (!fs.existsSync(path.join(swapperFolder, "Resource Swapper/weapons/ar2"))) {
        fs.mkdirSync(path.join(swapperFolder, "Resource Swapper/weapons/ar2"), { recursive: true });
      };
      if (!fs.existsSync(path.join(swapperFolder, "Resource Swapper/weapons/awp"))) {
        fs.mkdirSync(path.join(swapperFolder, "Resource Swapper/weapons/awp"), { recursive: true });
      };
      if (!fs.existsSync(path.join(swapperFolder, "Resource Swapper/weapons/vector"))) {
        fs.mkdirSync(path.join(swapperFolder, "Resource Swapper/weapons/vector"), { recursive: true });
      };

      function readDirectory(dirPath, fileExtension, eventName) {
        fs.readdir(dirPath, function(err, files) {
          if (err) {
            console.error(`There was an error reading the directory: ${err}`);
            return;
          }
      
          // Filter actual images (.png and .jpg)
          const imageFiles = files.filter(file => file.endsWith(fileExtension));
      
          var skins = [];
      
          imageFiles.forEach(function(imageFile) {
            var pathcontainer = `${dirPath}/${imageFile}`;
      
            //console.log(`Processing image file: ${imageFile} pathcontainer: ${pathcontainer}`);
      
            // push file names to skin-array
            skins.push(pathcontainer);
          });
      
          win.webContents.on('did-finish-load', () => {
            win.webContents.send(eventName, skins);
          });
        });
      }
      
      readDirectory(
        path.join(app.getPath("documents"), "Quasar-DSC/gunskins/awp"),
        ".webp",
        "filepaths-awp"
      );
      
      readDirectory(
        path.join(app.getPath("documents"), "Quasar-DSC/gunskins/ar2"),
        ".webp",
        "filepaths-ar2"
      );
      
      readDirectory(
        path.join(app.getPath("documents"), "Quasar-DSC/gunskins/vector"),
        ".webp",
        "filepaths-vector"
      );

      function handleFilepathEvent(event, message, folderName, destFileName) {
        console.log(`should be ${message}`);
      
        const srcPath = message.toString();
      
        const folderPath = path.join(app.getPath("documents"), `Quasar-DSC/Resource Swapper/weapons/${folderName}/`);
        console.log(`to ${folderPath}`);
      
        fs.readdir(folderPath, (err, files) => {
          if (err) {
            console.error(err);
            return;
          }
      
          const webpFiles = files.filter(file => file.endsWith('.webp'));
      
          // sometimes we get this error, even if the file is already copied

          /*[Error: EBUSY: resource busy or locked, unlink 'C:\Users\jesse\OneDrive\Dokumente\Quasar-DSC\Resource Swapper\weapons\vector\vectorcomp.webp'] {
            errno: -4082,
            code: 'EBUSY',
            syscall: 'unlink',
            path: 'C:\\Users\\[your_username]\\OneDrive\\Dokumente\\Quasar-DSC\\Resource Swapper\\weapons\\vector\\vectorcomp.webp'
          }*/

          webpFiles.forEach(file => {
            fs.unlink(`${folderPath}/${file}`, err => {
              if (err) {
                console.error(err);
              }
            });
          });
        });
      
        const destPath = path.join(app.getPath("documents"), `Quasar-DSC/Resource Swapper/weapons/${folderName}/${destFileName}`);
      
        fs.copyFile(srcPath, destPath, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Image copied successfully! With new name...');
            //win.reload() need to reopen!!!
          }
        });
      }
      
      ipcMain.on('filepath-awp', (event, message) => {
        handleFilepathEvent(event, message, 'awp', 'newawpcomp.webp');
      });
      ipcMain.on('filepath-ar2', (event, message) => {
        handleFilepathEvent(event, message, 'ar2', 'arcomp.webp');
      });
      ipcMain.on('filepath-vector', (event, message) => {
        handleFilepathEvent(event, message, 'vector', 'vectorcomp.webp');
      });

      const { spawn } = require('child_process');

      ipcMain.on('openSkinFolder', (event) => {
        spawn('explorer.exe', [path.join(app.getPath("documents"), "Quasar-DSC/gunskins")]);
      });

      ipcMain.on('openTexturePackFolder', (event, file) => {
        spawn('explorer.exe', [path.join(app.getPath("documents"), "Quasar-DSC/Resource Swapper")]);
      });

      // texture pack loader

      /*const JSZip = require('jszip');

      const zipData = fs.readFileSync('path/to/zipfile.zip', 'binary');

      const zip = new JSZip();
      zip.loadAsync(zipData, { base64: true }).then(function(zip) {
        zip.forEach(function(relativePath, zipEntry) {
          zip.file(relativePath).async('nodebuffer').then(function(content) {
            fs.writeFileSync('path/to/extract/folder/' + zipEntry.name, content);
          });
        });
      });*/

      // Swapper -> Credits to Captain Cool 💪

      swapper.replaceResources(win, app);

      protocol.registerFileProtocol('swap', (request, callback) => {
        callback({
            path: path.normalize(request.url.replace(/^swap:/, ''))
        });
      });

      // all options https://github.com/oscmejia/os-utils

      const stats = setInterval(() => {
        if (!win.isDestroyed()) {
          os.cpuUsage(function(v){
            win.webContents.send('cpu',v*100);
            win.webContents.send('mem',os.freememPercentage()*100);
            //win.webContents.send('freemem',os.freemem());
            win.webContents.send('platform',os.platform());
            win.webContents.send('cpu-count',os.cpuCount());
            win.webContents.send('total-mem',os.totalmem()/1024);
            win.webContents.send('uptime',os.processUptime());
            //win.webContents.send('ram',memoryUsage());
          });
        } else {
          clearInterval(stats);

          // destroy all windows | splash should already be closed
          if (!noInternetConnectionScreen.isDestroyed()) {
            noInternetConnectionScreen.close();
          }
          app.exit();
        }
      },1000);
        
      //Send user datapath to preload.js
      win.webContents.on('did-finish-load', () => {
          win.webContents.send('SendUserData', jsonpath);
      });

    }
  }, 1000);

  //if (!condition) {
  function reload() {
    const reload = setInterval(function() {
      if (!condition) {
        request("http://www.deadshot.io", function(error, response, body) {
          if (error || response.statusCode !== 200) {
            console.log("Offline");
            //win.loadFile('offline.html');
            noInternetConnectionScreen.show();
            noInternetConnectionScreen.maximize() 
            win.hide();
            condition = false;
          } else {
            console.log("Online");
            win.loadURL('https://deadshot.io');
            win.show();
            win.maximize() 
            noInternetConnectionScreen.close();
            condition = true;
          }
        });
      } else {
        clearInterval(reload);
      }
    }, 5000);
  }
})

// discord rpc

/*const DiscordRPC = require('discord-rpc');
const clientId = '1054074293975273594';

// Register your application with Discord
DiscordRPC.register(clientId);

// Initialize the Discord Rich Presence client with the IPC transport
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

// Set the activity when the client is ready
rpc.on('ready', () => {
  console.log('Discord Rich Presence is ready!');
  setActivity();
});

// Handle any errors that occur
rpc.on('error', (error) => {
  console.error(error);
});

// Log in to Discord with your client ID
rpc.login({ clientId }).catch((error) => {
  console.error(error);
});

// Function to set the activity
function setActivity() {
  rpc.setActivity({
    details: 'Playing my Electron game',
    state: 'Level 1',
    largeImageKey: 'icon',
    smallImageKey: 'play',
    instance: false,
  }).catch((error) => {
    console.error(error);
  });
}*/
