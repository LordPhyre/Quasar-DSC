const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const DiscordRpc = require("discord-rpc");
const { app, ipcMain, BrowserWindow, protocol, dialog } = electron;
require('@electron/remote/main').initialize();
const { autoUpdater } = require('electron-updater');
const { webContents } = require('electron');
require('v8-compile-cache');


var emotePicker;

// Main Process

// Credits:
// Gato/creepycats - Gatoclient (Yes I reused assets)
// Feeshdev - Official Deadshot Client

// Before starting:
// Create Swapper folders if not existing
var swapperFolder = path.join(app.getPath("documents"), "BetterDeadshotClient");

if (!fs.existsSync(swapperFolder)) {
    fs.mkdirSync(swapperFolder, { recursive: true });
};
if (!fs.existsSync(path.join(swapperFolder, "/Mod/textures"))) {
    fs.mkdirSync(path.join(swapperFolder, "/Mod/textures"), { recursive: true });
};
if (!fs.existsSync(path.join(swapperFolder, "/Mod/weapons"))) {
    fs.mkdirSync(path.join(swapperFolder, "/Mod/weapons"), { recursive: true });
};
if (!fs.existsSync(path.join(swapperFolder, "/Mod/promo"))) {
    fs.mkdirSync(path.join(swapperFolder, "/Mod/promo"), { recursive: true });
};
if (!fs.existsSync(path.join(swapperFolder, "/Mod/character"))) {
    fs.mkdirSync(path.join(swapperFolder, "/Mod/character"), { recursive: true });
};
if (!fs.existsSync(path.join(swapperFolder, "/Mod/maps"))) {
    fs.mkdirSync(path.join(swapperFolder, "/Mod/maps"), { recursive: true });
};

// Before we can read the settings, we need to make sure they exist, if they don't, then we create a template
if (!fs.existsSync(path.join(app.getPath("documents"), "BetterDeadshotClient/settings.json"))) {
    fs.writeFileSync(path.join(app.getPath("documents"), "BetterDeadshotClient/settings.json"), '{ "fpsUncap": true, "fpsCounter": true, "fullscreen": false, "resourceSwapper": false, "chromiumFlags": false, "inProcessGPU": false, "disableAccelerated2D": false }', { flag: 'wx' }, function (err) {
        if (err) throw err;
    });
}

// Read settings to apply them to the command line arguments
let filePath = path.join(app.getPath("documents"), "BetterDeadshotClient/settings.json");
let userPrefs = JSON.parse(fs.readFileSync(filePath));

// Fullscreen Handler
var mainWindowIsFullscreen = false;

// Give App Version to window
ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});

// Rich Presence
const clientId = "1016830391694413835";
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
                    { label: 'Download', url: 'https://github.com/creepycats/BetterDeadshotClient' }
                ]
            })
        } catch {
        }
    }

// Save settings when sent to main process
let inputs;
ipcMain.on('savedSettings', (event, preferences) => {
    inputs = preferences;
    console.log(inputs);
    console.log('Saved settings to json');
    var settingsPath = path.join(app.getPath("documents"), "BetterDeadshotClient/settings.json");
    fs.writeFileSync(settingsPath, JSON.stringify(inputs));
});
ipcMain.on('preloadNeedSettings', (event) => {
    mainWindow.webContents.send('preloadSettings', path.join(app.getPath("documents"), "BetterDeadshotClient/settings.json"), app.getVersion(), __dirname);
});
ipcMain.on('settingsNeedSettings', (event) => {
    mainWindow.webContents.send('settingsSettings', path.join(app.getPath("documents"), "BetterDeadshotClient/settings.json"));
});
ipcMain.on('splashNeedInfo', (event) => {
    splashWindow.webContents.send('splashInfo', app.getVersion());
});

// Long thing of command lines to disable anything unrequired
if (userPrefs['chromiumFlags'] == true) {
    app.commandLine.appendSwitch("disable-breakpad"); //crash reporting
    app.commandLine.appendSwitch("disable-print-preview");
    app.commandLine.appendSwitch("enable-javascript-harmony");
    app.commandLine.appendSwitch("enable-future-v8-vm-features");
    app.commandLine.appendSwitch("enable-webgl2-compute-context");
    app.commandLine.appendSwitch("renderer-process-limit", 100);
    app.commandLine.appendSwitch("max-active-webgl-contexts", 100);
    app.commandLine.appendSwitch("ignore-gpu-blacklist");
    app.commandLine.appendSwitch("disable-2d-canvas-clip-aa");
    app.commandLine.appendSwitch("disable-bundled-ppapi-flash");
    app.commandLine.appendSwitch("disable-logging");
    app.commandLine.appendSwitch("disable-web-security");
    app.commandLine.appendSwitch("webrtc-max-cpu-consumption-percentage=100");
    console.log('Enabled Experiments');
}
if (userPrefs['fpsUncap'] == true) {
    app.commandLine.appendSwitch('disable-frame-rate-limit');
    app.commandLine.appendSwitch("disable-gpu-vsync");
    console.log('Removed FPS Cap');
}
//if (userPrefs['angle-backend'] != 'default') {
//    if (userPrefs['angle-backend'] == 'vulkan') {
//        app.commandLine.appendSwitch("use-angle", "vulkan");
//        app.commandLine.appendSwitch("use-vulkan");
//        app.commandLine.appendSwitch("--enable-features=Vulkan");
//    } else {
//        app.commandLine.appendSwitch("use-angle", userPrefs['angle-backend']);
//        console.log('Using Angle: ' + userPrefs['angle-backend']);
//    }
//}
if (userPrefs['inProcessGPU'] == true) {
    app.commandLine.appendSwitch("in-process-gpu");
    console.log('In Process GPU is active');
}
if (userPrefs['disableAccelerated2D'] == true) {
    app.commandLine.appendSwitch("disable-accelerated-2d-canvas", "true");
    console.log('Disabled Accelerated 2D canvas');
}

// Workaround for Electron 8.x
if (userPrefs['resourceSwapper'] == true) {
    protocol.registerSchemesAsPrivileged([{
        scheme: "gato-swap",
        privileges: {
            secure: true,
            corsEnabled: true
        }
    }]);
}

app.allowRendererProcessReuse = true;
//Listen for app to get ready
app.on('ready', function () {
    let filePath = path.join(app.getPath("documents"), "BetterDeadshotClient/settings.json");
    let userPrefs = JSON.parse(fs.readFileSync(filePath));

    if (userPrefs['resourceSwapper'] == true) {
        protocol.registerFileProtocol("gato-swap", (request, callback) => callback(decodeURI(request.url.replace(/^gato-swap:/, ""))));
    }

    app.setAppUserModelId(process.execPath);
    // Make Splash Screen
    splashWindow = new BrowserWindow({
        autoHideMenuBar: true,
        frame: false,
        skipTaskbar: true,
        webPreferences: {
            preload: path.join(__dirname, 'splash/splashPreload.js'),
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false
        }
    });
    splashWindow.setAlwaysOnTop(true, 'pop-up-menu');
    splashWindow.setAlwaysOnTop(false);
    splashWindow.setBackgroundColor('#000000');
    splashWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'splash/splash.html'),
        icon: __dirname + 'src/cat.ico' // Doesn't work anymore just ignore it
    }));
    splashWindow.setSize(512, 256);
    splashWindow.center();
    splashWindow.removeMenu();

    // Check for updates
    splashWindow.once('ready-to-show', () => {
        autoUpdate();
    });
    async function autoUpdate() {
        return new Promise((resolve, reject) => {
            autoUpdater.checkForUpdatesAndNotify();
            console.log('Launching Game');
            launchGame();
            splashWindow.webContents.send('havefun');
            resolve();
            // Splash screen no update
            autoUpdater.on('update-not-available', () => {
                setTimeout(launchGame, 3000);
                splashWindow.webContents.send('latest');
                resolve();
            });
            // Splash screen update shits
            autoUpdater.on('update-available', () => {
                splashWindow.webContents.send('newVersion');
                let options = {};
                options.type = "question";
                options.buttons = ["&Yes", "&No", "&Cancel"];
                options.defaultId = 2;
                options.defaultid = 2;
                options.message = "Update found! Would you like to install it?";
                var promptAnswer = dialog.showMessageBoxSync(options);

                if (promptAnswer === 0) {
                    console.log('Redirecting to update page');
                    electron.shell.openExternal('https://github.com/creepycats/BetterDeadshotClient/releases');
                    app.exit(0);
                }
                if (promptAnswer === 1) {
                    console.log('Launching Game');
                    launchGame();
                    splashWindow.webContents.send('havefun');
                    resolve();
                }
                if (promptAnswer === 2) {
                    console.log('Closing');
                    app.exit(0);
                }
            });
        });
    }
    // Splash Screen Shit
    function launchGame() {
        mainWindow.setBackgroundColor('#000000');
        mainWindow.center();
        mainWindow.removeMenu();
        if (userPrefs['fullscreen'] == true) {
            mainWindow.setFullScreen(true);
            mainWindowIsFullscreen = true;
        }

        mainWindow.loadURL('https://deadshot.io');

        mainWindow.once('ready-to-show', () => {
            splashWindow.destroy();
            mainWindow.show();
        });

        hasJoined = true;
    }
    var mainScreen = electron.screen.getPrimaryDisplay();
    var dimensions = mainScreen.size;
    //Make the window
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        show: false,
        width: dimensions.width * 0.85,
        height: dimensions.height * 0.85,
        center: true,
        nativeWindowOpen: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
            sandbox: false
        }
    });

    // Rich Presence
    ipcMain.handle("rpc-activity",
        async (_, activity) => { await setActivity(activity); });

    // CSS
    // Do NOT mess with for now. Working on making the css work for all custom features
    var cssToLoad = '';
    var mainCSS = '/* Client Settings */ #clientSettingsTab:hover{background-color:rgba(0,0,0,0.5);border-color: white!important;} #gameSettingsTab:hover{background-color:rgba(0,0,0,0.5);border-color: white!important;} #settingsDivOff{display:none!important} .activeSettings{display:block;} .inactiveSettings{display:none;} .requiresRestart::after{color:red;content:"*"} #settingsDivCli .bar { width: 100%; height: 2px; background-color: rgba(236, 236, 236, 0.295); margin: 9px 0px; }';
    var logoCSS = '/* Client Logo */}'

    // Main CSS
    cssToLoad += mainCSS;
    console.log('Added Loading Screen + Branding CSS');

    // Logo CSS
    if (userPrefs['disableLogoCSS'] != true) {
        cssToLoad += logoCSS;
        console.log('Added Logo CSS');
    }

    // CSS swap
    mainWindow.webContents.on('dom-ready', function () {
        console.log('Attempting to load CSS...');
        mainWindow.webContents.send('injectCSS', cssToLoad);

        if (userPrefs['disableUserBadges'] != true) {
            //mainWindow.webContents.send('badges');
        }
        if (userPrefs['disableEmotes'] != true) {
            //mainWindow.webContents.send('emotes');
        }
    });

    var signinWindow;

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith("https://accounts.google.com/")) {
            signinWindow = new BrowserWindow({
                autoHideMenuBar: true,
                show: true,
                center: true,
                nativeWindowOpen: true
            });
            signinWindow.loadURL(url);
            signinWindow.setAlwaysOnTop(true, 'pop-up-menu');

            signinWindow.on('close', function (evt) {
                
            });
          return { action: 'allow',overrideBrowserWindowOptions: {
            frame: false,
            show: false
          } }
        } else {
          return { action: 'allow' }
        }
    });

    // Add Shortcuts
    mainWindow.webContents.on('before-input-event', (event, input) => {
        // Developer Console
        if (input.control && input.key.toLowerCase() === 'i') {
            mainWindow.webContents.openDevTools();
            event.preventDefault();
        }

        // F5 to Reload Lobby
        if (input.key === "F5") {
            mainWindow.reload();
            event.preventDefault();
        }

        // F11 to Fullscreen
        if (input.key === "F11") {
            mainWindow.setFullScreen(!mainWindowIsFullscreen);
            mainWindowIsFullscreen = !mainWindowIsFullscreen;
            event.preventDefault();
        }

        // F9 to open emote picker
        if (input.key === "F9") {
            event.preventDefault();
            emotePicker = new BrowserWindow({
                autoHideMenuBar: true,
                width: 435,
                height: 435,
                center: true
            });
            emotePicker.setResizable(false);
            emotePicker.setBackgroundColor('#000000');
            emotePicker.loadURL(path.join(__dirname, '/emotepicker/emotepicker.html'));
        }

        //f12 to hard reset
        if (input.key === "F12") {
            app.relaunch();
            app.exit();
        }
    })

    // Resource Swapper
    if (userPrefs['resourceSwapper'] == true) {
         let Swapper = require("./scripts/swapper");
    
        let swapper = new Swapper(
            mainWindow,
            /** @type {string} */("normal"),
            /** @type {string} */(path.join(app.getPath("documents"), "BetterDeadshotClient/Mod"))
        );
        swapper.init();
    }

    // Fix Fullscreen Issues
    mainWindow.on('maximize', () => {
        mainWindow.unmaximize()
    });

    mainWindow.on('close', function () {
        app.exit();
    });
});

app.on('window-all-closed', () => {
    app.exit();
})

// RPC stuff
rpc.login({ clientId }).catch(console.error);