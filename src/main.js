const { app, BrowserWindow, ipcMain, protocol, globalShortcut, dialog} = require('electron');
const { autoUpdater, AppUpdater } = require("electron-updater");
const path = require('path');
const fs = require('fs');
const os = require('os-utils');
const swapper = require('./swapper.js');
const request = require("request");
const { spawn } = require('child_process');

app.setPath ('userData', (path.join(app.getPath('appData'), app.getName() + "-" + app.getVersion())));

let win = null
const userDataPath = path.join(app.getPath('appData'), app.getName() + "-" + app.getVersion());
const jsonpath = path.join(userDataPath, '/Settings.json');
console.log(jsonpath);

if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath);
    console.log("Quasar folder created");
} else {
    console.log("Quasar folder exists");
};

//Updater Flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;

// check if settings file exists and if not -> create it
if (!fs.existsSync(jsonpath)) {
    const jsonsettings = {
    "Stats": {
        "FPS": true,
        "Online": false,
        "Shortcuts": true,
        "Platform": false,
        "CPU": true,
        "memory": true,
        "Tmemory": false,
        "Cores": false,
        "Uptime": false,
        "Ping": true
    },
    "WASD": false,
    //"Flags": false,
    "Debug": false,
    "AutoFullscreen": false,
    "Fullscreen": false,
    "Colors": {
        "menuHeaderColor": "#232429",
        "behindOptionsColor": "#232429",
        "skinButtonColor": "#222327",
        "skinButtonHoverColor": "#0798fc",
        "skinCloseColor": "#ffffff00",
        "optionColor": "#25272e",
        "opacity": "1",
        "skinWrapperBorderRadius": "10",
        "msgBoxColor": "#232429",   
    },
    "Flags": {
        "Print": false,
        "Harmony": false,
        "Limit": false,
        "Contexts": false,
        "GPUblocklist": false,
        "CanvasClip": false,
        "Logging": false,
        "ProcessGPU": false,
        "AcceleratedCanvas": false,
    },
    "Shortcuts": {
        "one": "GG",
        "two": "hello guys",
        "three": "noob",
        "four": "lmao",
        "five": "wsg",
    },
    "RPC": {
      "show": true,
      "text": "Slapping noobs",
    },
    "Splash": {
      "new": true,
    }
    };

    fs.writeFileSync(jsonpath, JSON.stringify(jsonsettings));
    console.log("Settings file created");
} else {
    console.log("Settings file exists");
};

// Parse the contents of the file into a JavaScript object
let jsonobj = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));
console.log(jsonobj);

if (jsonobj.RPC.show) {
  const client = require('discord-rich-presence')('1054074293975273594');

  client.updatePresence({
    state: 'Quasar Client v.' + app.getVersion(),
    details: 'Using the Best Client',
    largeImageText: jsonobj.RPC.text,
    largeImageKey: "logo",
    startTimestamp: Date.now(),
    buttons: [
      { label: 'Download', url: 'https://github.com/LordPhyre/Quasar-DSC/releases/latest' }
  ]
  });
  console.log("RPC activated");
} else {
  console.log("RPC disabled");
}

// debugging mode - ignore errors, prevent os-utils error from showing (and others)
if(jsonobj.Debug) { 
  console.log("Enabled errors for debugging.")
} else {
  process.on('uncaughtException', (error) => {
    console.log(error);
  });
  console.log("Disabled errors.")
}

// Chromium Flags based on JSON
if(jsonobj.Flags.Print) { app.commandLine.appendSwitch("disable-print-preview"); };
if(jsonobj.Flags.Harmony) { app.commandLine.appendSwitch("javascript-harmony"); };
if(jsonobj.Flags.Limit) { app.commandLine.appendSwitch("renderer-process-limit", 100); };
if(jsonobj.Flags.Contexts) { app.commandLine.appendSwitch("max-active-webgl-contexts", 100); };
if(jsonobj.Flags.GPUblocklist) { app.commandLine.appendSwitch("ignore-gpu-blocklist"); };
if(jsonobj.Flags.CanvasClip) { app.commandLine.appendSwitch("disable-2d-canvas-clip-aa"); };
if(jsonobj.Flags.Logging) { app.commandLine.appendSwitch("disable-logging"); };
if(jsonobj.Flags.ProcessGPU) { app.commandLine.appendSwitch("in-process-gpu"); };
if(jsonobj.Flags.AcceleratedCanvas) { app.commandLine.appendSwitch("disable-accelerated-2d-canvas", "true"); };


app.whenReady().then(() => {
  let online = 0;

  // check for internet connection
  request("http://www.deadshot.io", function(error, response, body) {
    if (error || response.statusCode !== 200) {
      console.log("Connection status: Offline");
      online = false;
    } else {
      console.log("Connection status: Online");
      online = true;

      // AUTO UPDATE CHECKER //
      setTimeout(function () {
        console.log("Checking for Update. Current version: " + app.getVersion());
        autoUpdater.checkForUpdates();
        splash.destroy();
      
      
        //If Update exists, show message box
        autoUpdater.on("update-available", (info) => {
            
            console.log("Update available.");
            
            const updateresponse = dialog.showMessageBoxSync({
                type: 'info',
                buttons: ['Yes', 'Cancel'],
                title: 'Update Available',
                cancelId: 99,
                message: 'A Quasar Update is currently available.\nDo you want to install it?',
            });
            
            //If the user clicks the Update button
            if (updateresponse === 0) {
                console.log("Update Chosen.");
                
                autoUpdater.downloadUpdate();
                autoUpdater.on("update-downloaded", (info) => { autoUpdater.quitAndInstall(); });
            } else { console.log("Update cancelled") };
    
            autoUpdater.on("error", (info) => { console.log(info); });
        });
      }, 4500);
        
      setTimeout(function () {
        win.show();
        win.maximize()
        setTimeout(function () {
            mainmenu.show();
        }, 500);
      }, 6000);
    }
  });

  // create splash screen
  const splash = new BrowserWindow({
    width: 500, 
    height: 300, 
    transparent: true, 
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    icon: "icon/logoicon.ico",	
  });

  if (jsonobj.Splash.new) {
    splash.loadFile('splash-screen/splash.html');
  } else {
    splash.loadFile('splash-screen/old_splash.html');
  }
  
  splash.center();

  // create offline screen
  const noInternetConnectionScreen = new BrowserWindow({
    show: false,
    icon: "icon/logoicon.ico",	
  });

  noInternetConnectionScreen.setMenuBarVisibility(false);
  noInternetConnectionScreen.loadFile('offline-screen/offline.html');

  const intervalId = setInterval(() => {
    if (online !== 0) {
      clearInterval(intervalId);
      reload();

      // create main screen (game window)
      win = new BrowserWindow({ 
        show: false,
        icon: "icon/logoicon.ico",	
        title: "Quasar DSC",
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true,
          sandbox: false,
          webSecurity: false, // needed to load local images
          preload: path.join(__dirname, 'game_preload.js'),
        }
      });

      win.setMenuBarVisibility(false);
      win.$ = win.jQuery = require('jquery/dist/jquery.min.js');

      // show offline screen depending on connection status
      if (online)
      {
        win.hide();
        win.loadURL('https://deadshot.io');
      } else {
        splash.hide();
        noInternetConnectionScreen.show();
        noInternetConnectionScreen.maximize();
      }

      //////////////////////////////////////////////////////////////////////
      mainmenu = new BrowserWindow ({ 
        height: 337,
        width: 750,
        show: false,
        resizable: false,
        transparent: true,
        frame: false,
        skipTaskbar: true,
        parent: win,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true,
          sandbox: false,
          webSecurity: false, // needed to load local images
          preload: path.join(__dirname, 'menu_preload.js'),
        }
      });

      mainmenu.loadFile('empty.html');
      //////////////////////////////////////////////////////////////////////

      // some shortcuts
      globalShortcut.register('F6', () => win.loadURL('https://deadshot.io/'));
      globalShortcut.register('F5', () => win.reload());
      globalShortcut.register('Escape', () => win.webContents.executeJavaScript('document.exitPointerLock()', true));
      globalShortcut.register('F7', () => {
        win.webContents.toggleDevTools()
        mainmenu.webContents.toggleDevTools()
      });
      globalShortcut.register('F11', () => {
        if (win.isFullScreen()) {
          win.setFullScreen(false);
          jsonobj.Fullscreen = false;
          win.webContents.send('toggleFullscreen',false);
        } else {
          win.setFullScreen(true);
          jsonobj.Fullscreen = true;
          win.webContents.send('toggleFullscreen',true);
        }
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
      });
      var visible = true;
      win.on('minimize', () => {
        visible = false;
      });
      globalShortcut.register('F1', () => {
        if (visible) {
          mainmenu.hide();
          visible = false;
        } else {
          mainmenu.show()
          visible = true;
        }
      });

      // auto fullscreen handling
      if(jsonobj.AutoFullscreen) {
        console.log("Enabled AutoFullscreen")
        win.setFullScreen(true)
      } else {
        console.log("Disabled AutoFullscreen")
      }

      // check if window is already in fullscreen to set json
      if(win.isFullScreen()) {
        console.log("Window is in fullscreen")
        jsonobj.Fullscreen = true;
        win.webContents.send('toggleFullscreen',true);
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
      } else {
        console.log("Window is not in fullscreen")
      }

      // set path of resource folder
      var swapperFolder = path.join(app.getPath("documents"), "Quasar-DSC");

      // create resource folder if it doesn't exist
      if (!fs.existsSync(swapperFolder)) {
          fs.mkdirSync(swapperFolder, { recursive: true });
          console.log("Resource folder created");
      } else {
          console.log("Resource folder exists");
      };

      // create needed resource folders
      const foldersToCreate = [
        "/gunskins",
        "/gunskins/ar2",
        "/gunskins/awp",
        "/gunskins/vector",
        "/textures",
        "/wallpapers",
        "/skyboxes",
        "/maps",
        "/maps/industry",
        "/maps/industry/out",
        "/maps/industry/out/compressedTextures",
        "Resource Swapper/wallpapers", /* I know that it doesn't really make sense to put it here but yeah... please come up with a better structure lol */
        "Resource Swapper/textures",
        "Resource Swapper/maps",
        "Resource Swapper/maps/industry",
        "Resource Swapper/maps/industry/out",
        "Resource Swapper/maps/industry/out/compressedTextures",
        "Resource Swapper/weapons/ar2",
        "Resource Swapper/weapons/awp",
        "Resource Swapper/weapons/vector"
      ];

      foldersToCreate.forEach(folder => {
        if (!fs.existsSync(path.join(swapperFolder, folder))) {
          fs.mkdirSync(path.join(swapperFolder, folder), { recursive: true });
          console.log("Missing resource folders created");
        }
      });

      function handleFilepathEvent(event, message, folderName, destFileName) {
      
        const srcPath = message.toString();
      
        if (destFileName == "skybox.webp") {
          var folderPath = path.join(app.getPath("documents"), `Quasar-DSC/Resource Swapper/${folderName}/`);
          var destPath = path.join(app.getPath("documents"), `Quasar-DSC/Resource Swapper/${folderName}/${destFileName}`);
        } else if (destFileName == "wallpaper.png") {
          var folderPath = path.join(app.getPath("documents"), `Quasar-DSC/Resource Swapper/${folderName}/`);
          var destPath = path.join(app.getPath("documents"), `Quasar-DSC/Resource Swapper/${folderName}/${destFileName}`);
        } else {
          var folderPath = path.join(app.getPath("documents"), `Quasar-DSC/Resource Swapper/weapons/${folderName}/`);
          var destPath = path.join(app.getPath("documents"), `Quasar-DSC/Resource Swapper/weapons/${folderName}/${destFileName}`);
        }

        console.log(`from: ${message} to ${folderPath}`);
      
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
      
        fs.copyFile(srcPath, destPath, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Image copied successfully!');
            //win.reload() ?
          }
        });
      }

      // handle skin paths
      const filepathHandlers = {
        'filepath-awp': ['awp', 'newawpcomp.webp'],
        'filepath-ar2': ['ar2', 'arcomp.webp'],
        'filepath-vector': ['vector', 'vectorcomp.webp'],
        'filepath-skybox': ['textures', 'skybox.webp'],
        'filepath-wallpaper': ['wallpapers', 'wallpaper.png']
      };
      
      Object.keys(filepathHandlers).forEach(eventName => {
        ipcMain.on(eventName, (event, message) => {
          handleFilepathEvent(event, message, ...filepathHandlers[eventName]);
        });
      });

      ipcMain.on('openSkinFolder', (event) => {
        spawn('explorer.exe', [path.join(app.getPath("documents"), "Quasar-DSC/gunskins")]);
      });
      ipcMain.on('openSkyboxFolder', (event, file) => {
        spawn('explorer.exe', [path.join(app.getPath("documents"), "Quasar-DSC/skyboxes")]);
      });
      ipcMain.on('openWallpaperFolder', (event, file) => {
        spawn('explorer.exe', [path.join(app.getPath("documents"), "Quasar-DSC/wallpapers")]);
      });
      ipcMain.on('openTexturePackFolder', (event, file) => {
        spawn('explorer.exe', [path.join(app.getPath("documents"), "Quasar-DSC/Resource Swapper")]);
      });
      ipcMain.on('makeFullscreen', (event, file) => {
        win.setFullScreen(true)
      });
      ipcMain.on('disableFullscreen', (event, file) => {
        win.setFullScreen(false)
      });

      const openFolder = (folderName) => {
        ipcMain.on(folderName, (event) => {
          spawn('explorer.exe', [path.join(app.getPath("documents"), `Quasar-DSC/${folderName}`)]);
        });
      }
      openFolder('gunskins');
      openFolder('skyboxes');
      openFolder('Resource Swapper');

      // Swapper -> Credits to Captain Cool 💪

      swapper.replaceResources(win, app);

      protocol.registerFileProtocol('swap', (request, callback) => {
        callback({
            path: path.normalize(request.url.replace(/^swap:/, ''))
        });
      });

      // read stats from pc
      // all options https://github.com/oscmejia/os-utils

      let stats;

      win.on('close', () => {
        clearInterval(stats);
        app.exit();
      });

      noInternetConnectionScreen.on('close', () => {
        clearInterval(stats);
        app.exit();
      });

      // please excuse this ugly code, I just don't want it to give an error
      // I am using this many if statements, so it checks before *every* execute
      // if you are complaining and have a better idea... fix it. Kind regards, jcjms : )

      stats = setInterval(() => {
        os.cpuUsage(function(v){
          if (win) {
            win.webContents.send('cpu',v*100);
          }
          if (win) {
            win.webContents.send('mem',os.freememPercentage()*100);
          }
          if (win) {
            win.webContents.send('platform',os.platform());
          }
          if (win) {
            win.webContents.send('cpu-count',os.cpuCount());
          }
          if (win) {
            win.webContents.send('total-mem',os.totalmem()/1024);
          }
          if (win) {
            win.webContents.send('uptime',os.processUptime());
          }
        });
      },1000);

      stats.unref();

      win.webContents.on('did-finish-load', () => {
        if (win) {
          win.webContents.send('SendUserData', jsonpath);
          mainmenu.webContents.send('SendUserData', jsonpath, app.getVersion());

          // send skin path function
          function readDirectory(dirPath, fileExtension, eventName) {
            fs.readdir(dirPath, function(err, files) {
              if (err) {
                console.error(`There was an error reading the directory: ${err}`);
                return;
              }
          
              // Filter actual images (.png & .jpg)
              const imageFiles = files.filter(file => file.endsWith(fileExtension));
          
              var skins = [];
          
              imageFiles.forEach(function(imageFile) {
                var pathcontainer = `${dirPath}/${imageFile}`;
          
                console.log(`Processing ${imageFile}, path: ${pathcontainer}`);
          
                // push file names to skin-array
                skins.push(pathcontainer);
              });
          
              //mainmenu.webContents.on('did-finish-load', () => {
                mainmenu.webContents.send(eventName, skins);
              //});
            });
          }

          // do the skin path sending here
          const types = ["awp", "ar2", "vector"];

          types.forEach(type => {
            readDirectory(path.join(app.getPath("documents"), `Quasar-DSC/gunskins/${type}`), ".webp", `filepaths-${type}`);
          });

          readDirectory(
            path.join(app.getPath("documents"), "Quasar-DSC/skyboxes"),
            ".webp",
            "filepaths-skybox"
          )

          readDirectory(
            path.join(app.getPath("documents"), "Quasar-DSC/wallpapers"),
            ".png",
            "filepaths-wallpaper"
          )
        }
      });
    }
  }, 1000);

  // checking if we are still offline
  function reload() {
    const reload = setInterval(function() {
      if (!online) {
        request("http://www.deadshot.io", function(error, response, body) {
          if (error || response.statusCode !== 200) {
            console.log("Connection status: Offline");
            noInternetConnectionScreen.show();
            noInternetConnectionScreen.maximize() 
            win.hide();
            online = false;
          } else {
            console.log("Connection status: Online");
            win.loadURL('https://deadshot.io');
            win.show();
            win.maximize() 
            noInternetConnectionScreen.hide();
            mainmenu.show();
            online = true;
          }
        });
      } else {
        clearInterval(reload);
      }
    }, 5000);
  }
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  if (mainWindow === null) createWindow();
});