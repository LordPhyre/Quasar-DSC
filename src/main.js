const { app, BrowserWindow, ipcMain, protocol, globalShortcut, dialog} = require('electron');
const { autoUpdater, AppUpdater } = require("electron-updater");
const path = require('path');
const fs = require('fs');
const os = require('os-utils');
const swapper = require('./swapper.js');
const request = require("request");
const { spawn } = require('child_process');
const fs_extra = require('fs-extra');

app.setPath ('userData', (path.join(app.getPath('appData'), app.getName() + "-" + app.getVersion())));

let win = null
const userDataPath = path.join(app.getPath('appData'), app.getName() + "-" + app.getVersion());
const jsonpath = path.join(userDataPath, '/Settings.json');
console.log(jsonpath);

var precommand = `\x1b[36m[Quasar]\x1b[0m ${new Date().toLocaleTimeString()} - `;

`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠤⠤⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣤⣤⡤⠤⠤⣤⣤⣄⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣦⠀⠘⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⡶⠾⠛⠋⠉⠁⠀⢀⣀⣀⣀⣀⡀⠈⠻⣦⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣧⠀⠈⢷⡀⠀⠀⠀⠀⣀⣤⡶⠞⠋⠉⠀⣀⣠⣤⠶⠶⠛⠛⠉⠉⠉⠉⠉⢻⡆⠀⢹⡆
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣷⡀⠈⢿⡄⣤⡶⠟⠉⠁⣀⣠⡴⠶⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠇⠀⣼⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⡀⠈⢻⡽⣆⣠⡴⠞⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡾⠋⠀⣼⠏⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⣀⣀⣻⡍⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣟⣁⣀⡾⠃⠀⠀
⠀⠀⠀⣠⡶⠶⠶⢶⣄⢠⡶⠶⡆⠀⢰⠶⢶⡄⠀⢨⡿⣯⠉⠁⢀⣴⠶⠶⠶⠶⣦⡀⠀⢀⣶⣶⡀⠀⠀⣶⠶⠾⠿⠿⠿⢶⡀⠀⠀
⠀⢀⣾⠃⣠⡶⢶⣄⠙⣿⡇⠀⡇⠀⢸⠀⢸⡇⣠⣿⡄⠘⣧⠀⣾⠁⢰⣶⣶⣦⣬⣿⢀⣾⣇⠈⢷⡀⠀⣿⣶⣶⣶⠖⢀⣿⠁⠀⠀
⠀⢸⣇⠀⣯⡀⢀⣿⠀⣽⡇⠀⣧⠀⣸⠆⢸⣷⡟⠘⣿⡄⠘⣷⢹⣧⣄⣀⣀⡈⠹⣧⡿⠉⣿⣆⠈⢷⡄⣿⠀⣤⣤⠀⢻⡅⠀⠀⠀
⠀⠀⢻⣆⡈⠛⠛⠁⢰⣟⢷⣄⠙⠛⠉⣠⣾⠟⢀⣼⠃⢻⣄⠘⣿⣍⠙⠛⠛⠃⣠⡿⠁⣴⠏⠹⣦⠈⢿⣿⠀⣿⠘⣷⡀⢻⣆⠀⠀
⠀⠀⠀⣩⣿⣿⣿⡟⠛⠛⠀⠉⠛⠛⠛⠉⠛⠛⠛⠃⠀⠀⠛⠛⠛⠛⠛⣛⣿⣿⣿⣿⣿⠋⠀⠀⠙⠛⠛⠛⠛⠛⠀⠈⠛⠛⠛⠀⠀
⠀⢀⣾⠋⠀⣠⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⡶⠟⠉⠀⣀⣤⠾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⡾⠁⢀⣼⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⡶⠞⠋⠁⢀⣠⣴⣾⡿⢶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣼⠃⠀⣾⠃⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⡴⠾⠛⠉⠁⢀⣠⣴⠾⠛⠉⠘⣧⡀⠈⢿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢻⡄⠀⠻⢦⣤⣤⣤⣤⠴⠶⠶⠛⠛⠉⠀⢀⣀⣤⡶⠞⠛⠉⠀⠀⠀⠀⠀⠘⢷⡀⠈⢻⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠈⠻⣤⣀⠀⠀⠀⠀⠀⣀⣀⣠⣤⣤⠶⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⠈⢷⡀⠀⢻⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠉⠛⠛⠛⠛⠛⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⠈⠛⠛⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

- looks cool`;

if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath);
    console.log(precommand + `Quasar directory successfully instantiated.`);
} else {
    console.log(precommand + `Quasar directory already existing.`);
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
    },
    "Startup" : 0,
    };

    fs.writeFileSync(jsonpath, JSON.stringify(jsonsettings));
    console.log(precommand + `Settings file successfully instantiated.`);
} else {
    console.log(precommand + `Settings file already existing.`);
};

// Parse the contents of the file into a JavaScript object
let jsonobj = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));
console.log(precommand + `User settings:`);
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
  console.log("Discord-RPC successfully activated.");
  console.log(precommand + `User settings:`);
} else {
  console.log(precommand + `Discord-RPC successfully disabled.`);
}

// debugging mode - ignore errors, prevent os-utils error from showing (and others)
if(jsonobj.Debug) { 
  console.log(precommand + `Errors enabled for debugging.`);
} else {
  process.on('uncaughtException', (error) => {
    console.log(error);
  });
  console.log(precommand + `Errors disabled.`);
}


app.whenReady().then(() => {
    // AUTO UPDATE CHECKER //
    setTimeout(function () {
        console.log(precommand + `Checking for Update. Current version: ${app.getVersion()}`);
        autoUpdater.checkForUpdates();
        splash.destroy();
      
        //If Update exists, show message box
        autoUpdater.on("update-available", (info) => {
            console.log(precommand + `Update available.`);
            const updateresponse = dialog.showMessageBoxSync({
                type: 'info',
                buttons: ['Yes', 'Cancel'],
                title: 'Update Available',
                cancelId: 99,
                message: 'A Quasar Update is currently available.\nDo you want to install it?',
            });
            
            //If the user clicks the Update button
            if (updateresponse === 0) {
                console.log(precommand + `Installing update...`);
                autoUpdater.downloadUpdate();
                autoUpdater.on("update-downloaded", (info) => { autoUpdater.quitAndInstall(); });
            } else { console.log(precommand + `Update cancelled.`); };
    
            autoUpdater.on("error", (info) => { console.log(info); });
        });
    }, 4500);
        
    setTimeout(function () {
        win.show();
        win.maximize()
    }, 6000);

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

    if (jsonobj.Splash.new) {splash.loadFile('splash-screen/splash.html');}
    else {splash.loadFile('splash-screen/old_splash.html');}
    splash.center();


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
          preload: path.join(__dirname, 'old_preload.js'),
        }
      });

      win.setMenuBarVisibility(false);
      win.$ = win.jQuery = require('jquery/dist/jquery.min.js');
      win.loadURL('https://deadshot.io');

        
      // some shortcuts
      globalShortcut.register('F6', () => win.loadURL('http://deadshot.io/'));
      globalShortcut.register('F5', () => win.reload());
      globalShortcut.register('Escape', () => win.webContents.executeJavaScript('document.exitPointerLock()', true));
      globalShortcut.register('F7', () => {
        win.webContents.toggleDevTools()
      });
        
      globalShortcut.register('F11', () => {
        win.webContents.send('toggleFullscreen',null);
        if (win.isFullScreen()) {
            win.setFullScreen(false);
            jsonobj.Fullscreen = false;
        } else {
            win.setFullScreen(true);
            jsonobj.Fullscreen = true;
        }
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
      });
        
      // auto fullscreen handling
      if(jsonobj.AutoFullscreen) {
        console.log(precommand + `Enabled AutoFullscreen.`);
        win.setFullScreen(true)
      } else {
        console.log(precommand + `Disabled AutoFullscreen.`);
      }

      // check if window is already in fullscreen to set json
      if(win.isFullScreen()) {
        console.log(precommand + `Window is fullscreened.`);
        jsonobj.Fullscreen = true;
        win.webContents.send('toggleFullscreen',true);
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
      } else {
        console.log(precommand + `Window is not fullscreen.`);
      }



      // Resource Swapper Path
      var swapperFolder = path.join(app.getPath("documents"), "Quasar-DSC");

      // create resource folder if it doesn't exist
      if (!fs.existsSync(swapperFolder)) {
          fs.mkdirSync(swapperFolder, { recursive: true });
          console.log(precommand + `Resource folder successfully instantiated.`);
      } else {
          console.log(precommand + `Resource folder already existing.`);
      };

      // create needed resource folders
      const foldersToCreate = [
        "storage/gunskins",
        "storage/gunskins/ar2",
        "storage/gunskins/awp",
        "storage/gunskins/vector",
        "storage/textures",
        "storage/wallpapers",
        "storage/skyboxes",
        "wallpapers",
      ];

      foldersToCreate.forEach(folder => {
        if (!fs.existsSync(path.join(swapperFolder, folder))) {
          fs.mkdirSync(path.join(swapperFolder, folder), { recursive: true });
          console.log(precommand + `Missing resource folders created.`);
        }
      });

      // default texture pack | added startup counts for this bc it couldn't paste the files on folder creation

      jsonobj.Startup++;
      fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));

      if (jsonobj.Startup == 2) {
        const source = path.join(__dirname, '/default_texture_pack');
        const destination = path.join(app.getPath('documents'), 'Quasar-DSC/Resource Swapper');
        
        fs_extra.copy(source, destination, (err) => {
          if (err) {
            console.log(precommand + `Error copying file ${source} to ${destination}:`, err);
            return;
          }
          console.log(precommand + `QUASAR texture pack installation was successful.`);
        });
      }

      // paste default skins

      function copyFile(sourceFilePath, destinationFilePath) {
        fs.access(destinationFilePath, fs.constants.F_OK, (err) => {      
          fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
            if (err) throw err;
          });
        });
      }
      
      // could optimise this later by using a literal or sum
      const sourceFilePath1 = path.join(__dirname, 'default_skins', 'ar_bake.webp');
      const destinationFilePath1 = path.join(app.getPath("documents"), `Quasar-DSC/storage/gunskins/ar2/ar_bake.webp`);
      copyFile(sourceFilePath1, destinationFilePath1);
      
      const sourceFilePath2 = path.join(__dirname, 'default_skins', 'smg_bake.webp');
      const destinationFilePath2 = path.join(app.getPath("documents"), `Quasar-DSC/storage/gunskins/vector/smg_bake.webp`);
      copyFile(sourceFilePath2, destinationFilePath2);

      const sourceFilePath3 = path.join(__dirname, 'default_skins', 'awp_baseColor.webp');
      const destinationFilePath3 = path.join(app.getPath("documents"), `Quasar-DSC/storage/gunskins/awp/awp_baseColor.webp`);
      copyFile(sourceFilePath3, destinationFilePath3);
      
      function handleFilepathEvent(event, message, folderName, destFileName) {
      
        const srcPath = message.toString();
      
        if (destFileName == "skybox.webp") {
          var folderPath = path.join(app.getPath("documents"), `Quasar-DSC/Resource Swapper/${folderName}/`);
          var destPath = path.join(app.getPath("documents"), `Quasar-DSC/Resource Swapper/${folderName}/${destFileName}`);
        } else if (destFileName == "wallpaper.png") {
          var folderPath = path.join(app.getPath("documents"), `Quasar-DSC/${folderName}/`);
          var destPath = path.join(app.getPath("documents"), `Quasar-DSC/${folderName}/${destFileName}`);
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
            console.log(precommand + `Image copied.`);
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
        spawn('explorer.exe', [path.join(app.getPath("documents"), "Quasar-DSC/storage/gunskins")]);
      });
      ipcMain.on('openSkyboxFolder', (event, file) => {
        spawn('explorer.exe', [path.join(app.getPath("documents"), "Quasar-DSC/storage/skyboxes")]);
      });
      ipcMain.on('openWallpaperFolder', (event, file) => {
        spawn('explorer.exe', [path.join(app.getPath("documents"), "Quasar-DSC/storage/wallpapers")]);
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
      ipcMain.on('reload', (event, file) => {
        app.relaunch();
        app.exit(0);
      });

      /*const openFolder = (folderName) => {
        ipcMain.on(folderName, (event) => {
          spawn('explorer.exe', [path.join(app.getPath("documents"), `Quasar-DSC/${folderName}`)]);
        });
      }
      openFolder('gunskins');
      openFolder('skyboxes');
      openFolder('Resource Swapper');*/

      // Swapper -> Credits to Captain Cool 💪

      swapper.replaceResources(win, app);
      protocol.registerFileProtocol('swap', (request, callback) => {
        callback({ path: path.normalize(request.url.replace(/^swap:/, '')) });
      });



      // PC Stats
      // all options https://github.com/oscmejia/os-utils
      let stats;
      win.on('close', () => {
        clearInterval(stats);
        app.exit();
      });

      stats = setInterval(() => {
        os.cpuUsage(function(v){
          if (win) {
            win.webContents.send('cpu',v*100);
            win.webContents.send('mem',os.freememPercentage()*100);
            win.webContents.send('platform',os.platform());
            win.webContents.send('cpu-count',os.cpuCount());
            win.webContents.send('total-mem',os.totalmem()/1024);
            win.webContents.send('uptime',os.processUptime());
          }
        });
      },1000);

      stats.unref();



    win.webContents.on('did-finish-load', () => {
        if (win) {
          win.webContents.send('SendUserData', jsonpath, app.getVersion());

          // send skin path function
          function readDirectory(dirPath, fileExtension, eventName) {
            fs.readdir(dirPath, function(err, files) {
              if (err) {
                console.log(precommand + `An error occurred while attempting to read the directory: ${err}`);
                return;
              }
          
              // Filter actual images (.png & .jpg)
              const imageFiles = files.filter(file => file.endsWith(fileExtension));

              var skins = [];
              imageFiles.forEach(function(imageFile) {
                var pathcontainer = `${dirPath}/${imageFile}`;
                console.log(precommand + `Processing ${imageFile}, path: ${pathcontainer}`);
                // push file names to skin-array
                skins.push(pathcontainer);
              });
          
            });
          }

          // do the skin path sending here
          const types = ["awp", "ar2", "vector"];

          types.forEach(type => {
            readDirectory(path.join(app.getPath("documents"), `Quasar-DSC/storage/gunskins/${type}`), ".webp", `filepaths-${type}`);
          });
          readDirectory(
            path.join(app.getPath("documents"), "Quasar-DSC/storage/skyboxes"),
            ".webp",
            "filepaths-skybox"
          )
          readDirectory(
            path.join(app.getPath("documents"), "Quasar-DSC/storage/wallpapers"),
            ".png",
            "filepaths-wallpaper"
          )
          var wallpaperpath = path.join(app.getPath("documents"), "Quasar-DSC/wallpapers/wallpaper.png");
          fs.access(wallpaperpath, fs.constants.F_OK, (err) => {
                if (!err){ win.webContents.send('wallpaper-path', wallpaperpath); }
          });
        }
    });
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  if (mainWindow === null) createWindow();
});