const { app, BrowserWindow, ipcMain, protocol, globalShortcut} = require('electron');
const path = require('path');
const fs = require('fs');
const DiscordRpc = require("discord-rpc");
let win = null

//Swapper
const swapper = require('./swapper.js');

// doesn't work
//app.commandLine.appendSwitch('fps', '1')

app.whenReady().then(() => {
  app.commandLine.appendSwitch('fps', '1')

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
  //win.setFrameRate(1)
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

  globalShortcut.register('F6', () => win.loadURL('https://deadshot.io/'));
  globalShortcut.register('F5', () => win.reload());
  globalShortcut.register('Escape', () => win.webContents.executeJavaScript('document.exitPointerLock()', true));
  globalShortcut.register('F7', () => win.webContents.toggleDevTools());
  globalShortcut.register('F11', () => { win.fullScreen = !win.fullScreen;});

  /*// Set the target framerate (in frames per second)
  const targetFramerate = 1

  // Calculate the interval (in milliseconds) at which to update the window
  const updateInterval = 1000 / targetFramerate

  // Set up a timer to update the window at the specified interval
  let lastUpdateTime = Date.now()
  let timerId = setInterval(() => {
    // Calculate the elapsed time since the last update
    let elapsedTime = Date.now() - lastUpdateTime

    // If the elapsed time is greater than the update interval, skip this frame
    if (elapsedTime < updateInterval) {
      return
    }

    // Update the window
    win.webContents.send('update-window', elapsedTime)

    // Reset the last update time
    lastUpdateTime = Date.now()
  }, updateInterval)

  // Clean up the timer when the window is closed
  win.on('closed', () => {
    clearInterval(timerId)
  })*/

  /*// Set the target framerate (in frames per second)
  const targetFramerate = 1

  // Calculate the interval (in milliseconds) at which to update the state of the application
  const updateInterval = 1000 / targetFramerate

  // Set up a timer to update the state of the application at the specified interval
  let lastUpdateTime = Date.now()
  let timerId = setInterval(() => {
    // Calculate the elapsed time since the last update
    let elapsedTime = Date.now() - lastUpdateTime

    // Update the state of the application
    win.webContents.send('update-state', elapsedTime)

    // Reset the last update time
    lastUpdateTime = Date.now()
  }, updateInterval)

  // Clean up the timer when the window is closed
  win.on('closed', () => {
    clearInterval(timerId)
  })*/

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

  /*fs.readdir(path.join(app.getPath("documents"), "DeadshotClient/gunskins/awp"), function(err, files) {
    if (err) {
      console.error('There was an error reading the directory:', err);
      return;
    }

    // Filder actual images (.png and .jpg)
    const imageFiles = files.filter(file => file.endsWith('.png') || file.endsWith('.webp'));

    var skins = [];
    var imgpath = path.join(app.getPath("documents"), "DeadshotClient/gunskins/awp");

    imageFiles.forEach(function(imageFile) {
      var pathcontainer = imgpath + "/" + `${imageFile}`

      console.log(`Processing image file: ${imageFile} pathcontainer: ` + pathcontainer);


      // push file names to skin-array
      skins.push(pathcontainer);
      
    });

    win.webContents.on('did-finish-load', () => {
      win.webContents.send('filepaths', skins)
    })

  });*/

  function readDirectory(dirPath, fileExtension, eventName) {
    fs.readdir(dirPath, function(err, files) {
      if (err) {
        console.error(`There was an error reading the directory: ${err}`);
        return;
      }
  
      // Filder actual images (.png and .jpg)
      const imageFiles = files.filter(file => file.endsWith(fileExtension));
  
      var skins = [];
  
      imageFiles.forEach(function(imageFile) {
        var pathcontainer = `${dirPath}/${imageFile}`;
  
        console.log(`Processing image file: ${imageFile} pathcontainer: ${pathcontainer}`);
  
        // push file names to skin-array
        skins.push(pathcontainer);
      });
  
      win.webContents.on('did-finish-load', () => {
        win.webContents.send(eventName, skins);
      });
    });
  }
  
  readDirectory(
    path.join(app.getPath("documents"), "DeadshotClient/gunskins/awp"),
    ".webp",
    "filepaths-awp"
  );
  
  readDirectory(
    path.join(app.getPath("documents"), "DeadshotClient/gunskins/ar2"),
    ".webp",
    "filepaths-ar2"
  );
  
  readDirectory(
    path.join(app.getPath("documents"), "DeadshotClient/gunskins/vector"),
    ".webp",
    "filepaths-vector"
  );

  function handleFilepathEvent(event, message, folderName, destFileName) {
    console.log(`should be ${message}`);
  
    const srcPath = message.toString();
  
    const folderPath = path.join(app.getPath("documents"), `DeadshotClient/Resource Swapper/weapons/${folderName}/`);
    console.log(`to ${folderPath}`);
  
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
  
      const webpFiles = files.filter(file => file.endsWith('.webp'));
  
      // sometimes we get this error, even if the file is already copied

      /*[Error: EBUSY: resource busy or locked, unlink 'C:\Users\jesse\OneDrive\Dokumente\DeadshotClient\Resource Swapper\weapons\vector\vectorcomp.webp'] {
        errno: -4082,
        code: 'EBUSY',
        syscall: 'unlink',
        path: 'C:\\Users\\[your_username]\\OneDrive\\Dokumente\\DeadshotClient\\Resource Swapper\\weapons\\vector\\vectorcomp.webp'
      }*/

      webpFiles.forEach(file => {
        fs.unlink(`${folderPath}/${file}`, err => {
          if (err) {
            console.error(err);
          }
        });
      });
    });
  
    const destPath = path.join(app.getPath("documents"), `DeadshotClient/Resource Swapper/weapons/${folderName}/${destFileName}`);
  
    fs.copyFile(srcPath, destPath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Image copied successfully! With new name...');
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
    

  /*ipcMain.on('filepath-awp', (event, message) => {
    // do something with the skin path here

    console.log("should be " + message);

    const srcPath = message.toString();

    // clear folder

    const folderPath = path.join(app.getPath("documents"), "DeadshotClient/Resource Swapper/weapons/awp/");
    console.log("to " + folderPath);

    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      const webpFiles = files.filter(file => file.endsWith('.webp'));

      webpFiles.forEach(file => {
        fs.unlink(`${folderPath}/${file}`, err => {
          if (err) {
            console.error(err);
          }
        });
      });
    });

    // copy, paste and rename file

    const destPath = path.join(app.getPath("documents"), "DeadshotClient/Resource Swapper/weapons/awp/newawpcomp.webp");

    fs.copyFile(srcPath, destPath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Image copied successfully! With new name...');
      }
    });
  });

  ipcMain.on('filepath-ar2', (event, message) => {
    // do something with the skin path here

    console.log("should be " + message);

    const srcPath = message.toString();

    // clear folder

    const folderPath = path.join(app.getPath("documents"), "DeadshotClient/Resource Swapper/weapons/ar2/");
    console.log("to " + folderPath);

    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      const webpFiles = files.filter(file => file.endsWith('.webp'));

      webpFiles.forEach(file => {
        fs.unlink(`${folderPath}/${file}`, err => {
          if (err) {
            console.error(err);
          }
        });
      });
    });

    // copy, paste and rename file

    const destPath = path.join(app.getPath("documents"), "DeadshotClient/Resource Swapper/weapons/ar2/arcomp.webp");

    fs.copyFile(srcPath, destPath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Image copied successfully! With new name...');
      }
    });
  });

  ipcMain.on('filepath-vector', (event, message) => {
    // do something with the skin path here

    console.log("should be " + message);

    const srcPath = message.toString();

    // clear folder

    const folderPath = path.join(app.getPath("documents"), "DeadshotClient/Resource Swapper/weapons/vector/");
    console.log("to " + folderPath);

    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      const webpFiles = files.filter(file => file.endsWith('.webp'));

      webpFiles.forEach(file => {
        fs.unlink(`${folderPath}/${file}`, err => {
          if (err) {
            console.error(err);
          }
        });
      });
    });

    // copy, paste and rename file

    const destPath = path.join(app.getPath("documents"), "DeadshotClient/Resource Swapper/weapons/vector/vectorcomp.webp");

    fs.copyFile(srcPath, destPath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Image copied successfully! With new name...');
      }
    });
  });*/

  ////////////////////////////////////////////////////////

    // Swapper -> Credits to Captain Cool 💪

    swapper.replaceResources(win, app);

    protocol.registerFileProtocol('swap', (request, callback) => {
      callback({
          path: path.normalize(request.url.replace(/^swap:/, ''))
      });
    });
})

//app.commandLine.appendSwitch('fps', '1')
//app.commandLine.appendSwitch('disable-frame-rate-limit');
//console.log("uncapped fps");
  

/*app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})*/