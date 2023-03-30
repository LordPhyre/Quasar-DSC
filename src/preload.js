const fs = require('fs');
const styling = require('./modules/styling.js');
const menuconstruct = require('./modules/menuconstruct.js');
const statscreate = require('./modules/stats.js');
const wasd = require('./modules/wasd.js');
const shortcuts = require('./modules/shortcuts.js');
const optionHolderManager = require('./modules/createOptionHolder.js');
const get_ping = require('./modules/ping.js');
const get_fps = require('./modules/fps.js');
const skinSkybox = require('./modules/skinSkybox.js');
const utils = require('./modules/utils.js');

document.addEventListener("DOMContentLoaded", function() {

//Receive user datapath and save as variable
require('electron').ipcRenderer.on('SendUserData', (event, message, client_version) => {
    const jsonpath = message;
    console.log(jsonpath);

    // Parse the contents of the file into a JavaScript object
    const jsonobj = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));
    console.log(jsonobj);

    // Styling and CSS
    var menuHeaderColor = jsonobj.Colors.menuHeaderColor; //"#2a394f";
    var behindOptionsColor = jsonobj.Colors.behindOptionsColor; //"#2a394f";
    var skinButtonColor = jsonobj.Colors.skinButtonColor; //"#364760";
    var skinButtonHoverColor = jsonobj.Colors.skinButtonHoverColor; //"#0798fc";
    var skinCloseColor = jsonobj.Colors.skinCloseColor; //"#ffffff00";
    var optionColor = jsonobj.Colors.optionColor; //"#364760";
    var opacity = jsonobj.Colors.opacity; //0.95;
    var skinWrapperBorderRadius = jsonobj.Colors.skinWrapperBorderRadius; //"10";
    var msgBoxColor = jsonobj.Colors.msgBoxColor; //"#2a394f";

    styling.styling(skinButtonColor, skinButtonHoverColor, skinCloseColor);
    menuconstruct.menuconstruct(opacity, skinWrapperBorderRadius, menuHeaderColor, behindOptionsColor, client_version, optionColor, msgBoxColor)
    statscreate.statscreate(jsonobj);
    wasd.wasd(jsonobj);
    shortcuts.shortcuts(jsonobj, jsonpath, optionColor);
    get_ping.ping();
    get_fps.fps();
    skinSkybox.skinSkybox(optionColor);

    document.getElementById('skyboxFolderButton').addEventListener('click', function() {
        require('electron').ipcRenderer.send('openSkyboxFolder')
    });


    // Menu Tabs
    const tabData = [
        { text: 'Home', id: 'HomePage' },
        { text: 'General', id: 'general' },
        { text: 'Stats', id: 'stats' },
        { text: 'Shortcuts', id: 'shortcuts' },
        { text: 'Skins', id: 'SkinCategory' },
        { text: 'Wallpaper', id: 'wallpaper' },
        { text: 'Aimbot', id: 'aimbot' }
    ];
    
    tabData.forEach(tab => {
        utils.addTab(tab);
    });

    // Checkboxes and Checkbox Holders
    const optionList = [
    {
        holderId: "massCheckUncheckStatsOptionHolder",
        descrText: "Check / Un-Check all",
        checkId: "massCheckUncheckStatsCheck",
    },
    {
        holderId: "fpsDisplayOptionHolder",
        descrText: "FPS-Counter",
        checkId: "fpsDisplayCheck",
    },
    {
        holderId: "pingDisplayOptionHolder",
        descrText: "Ping",
        checkId: "pingDisplayCheck",
    },
    {
        holderId: "platformDisplayOptionHolder",
        descrText: "Platform",
        checkId: "platformDisplayCheck",
    },
    {
        holderId: "cpuUsageDisplayOptionHolder",
        descrText: "CPU Usage",
        checkId: "cpuUsageDisplayCheck",
    },
    {
        holderId: "memoryUsageDisplayOptionHolder",
        descrText: "Memory Usage",
        checkId: "memoryUsageDisplayCheck",
    },
    {
        holderId: "totalMemoryDisplayOptionHolder",
        descrText: "Total Memory",
        checkId: "totalMemoryDisplayCheck",
    },
    {
        holderId: "cpuCoresDisplayOptionHolder",
        descrText: "CPU Cores",
        checkId: "cpuCoresDisplayCheck",
    },
    {
        holderId: "uptimeDisplayOptionHolder",
        descrText: "Uptime",
        checkId: "uptimeDisplayCheck",
    },
    {
        holderId: "shortcutDisplayOptionHolder",
        descrText: "Show Shortcuts",
        checkId: "shortcutDisplayCheck",
    },
    {
        holderId: "WASDDisplayOptionHolder",
        descrText: "Show WASD",
        checkId: "WASDDisplayCheck",
    },
    {
        holderId: "AutoFullscreenOptionHolder",
        descrText: "Auto Fullscreen",
        checkId: "AutoFullscreenCheck",
    },
    {
        holderId: "FullscreenOptionHolder",
        descrText: "Fullscreen [F11]",
        checkId: "FullscreenCheck",
    },
    {
        holderId: "debugOptionHolder",
        descrText: "Debug Mode",
        checkId: "debugCheck",
    },
    {
        holderId: "RPCDisplayOptionHolder",
        descrText: "Show RPC",
        checkId: "RPCCheck",
    },
    {
        holderId: "SplashOptionHolder",
        descrText: "Old Splash",
        checkId: "OldSplashCheck",
    },
    ];
    
    optionList.forEach(option => {
        utils.addCheckbox(option.holderId, option.descrText, option.checkId);
    });

    const additionalHide = [
        "skincontent", 
        "skinSkyboxDivider", 
        "skyboxTextureDivider", 
        "skyboxcontent", 
        "skinCategoryoptionHolder", 
        "skyboxoptionHolder", 
        "wallpaperoptionHolder"
    ];

    optionHolderManager.createOptionHolder('texturePackOptionHolder', 'Texture Pack', 'texturePackOptionInput', jsonobj);
    optionHolderManager.createOptionHolder('downloadTexturePackOptionHolder', 'Download QUASAR Pack', 'downloadTexturePackOptionInput', jsonobj);
    optionHolderManager.createOptionHolder('RPCTextOptionHolder', 'RPC Text', 'rpcOptionInput', jsonobj);    

    // Home Page
    utils.hideOptions(optionList, additionalHide)
    utils.hideStuff()
    
    document.getElementById("HomePage").addEventListener("click", function() {
        utils.showTab("HomePage", "Home", ["logo", "version", "openCloseText"], optionList, additionalHide);
    });
    
    document.getElementById("general").addEventListener("click", function() {
        const elements = [
            "WASDDisplayOptionHolder",
            "AutoFullscreenOptionHolder",
            "FullscreenOptionHolder",
            "RPCDisplayOptionHolder",
            //"RPCTextshortcutOptionHolder", // where did that one go lol
            "SplashOptionHolder",
            "debugOptionHolder"
        ];
        utils.showTab("general", "General", elements, optionList, additionalHide);
    });
    
    document.getElementById("stats").addEventListener("click", function() {
        const elements = [
            "massCheckUncheckStatsOptionHolder",
            "fpsDisplayOptionHolder",
            "pingDisplayOptionHolder",
            "platformDisplayOptionHolder",
            "cpuUsageDisplayOptionHolder",
            "memoryUsageDisplayOptionHolder",
            "totalMemoryDisplayOptionHolder",
            "cpuCoresDisplayOptionHolder",
            "uptimeDisplayOptionHolder",
        ];
        utils.showTab("stats", "Stats", elements, optionList, additionalHide);
    });
    
    document.getElementById("shortcuts").addEventListener("click", function() {
        const elements = [
            "shortcutDisplayOptionHolder",
            "shortcutOptionHolder",
            "shortcutOptionHolder2",
            "shortcutOptionHolder3",
            "shortcutOptionHolder4",
            "shortcutOptionHolder5",
        ];
        utils.showTab("shortcuts", "Shortcuts", elements, optionList, additionalHide);
    });
    
    document.getElementById("SkinCategory").addEventListener("click", function() {
        const elements = [
            "skinCategoryoptionHolder",
            "skinSkyboxDivider",
            "skyboxoptionHolder",
            "skyboxTextureDivider",
            "skyboxcontent",
            "texturePackOptionHolder",
            "downloadTexturePackOptionHolder",
        ];
        utils.showTab("SkinCategory", "Resource Swapper <p style=\"color: red; font-size: 17px\">ATTENTION: Need to restart client to apply changes</p>", elements, optionList, additionalHide);
        document.getElementById("skincontent").style.display = "flex";
        texturePackOptionInput.addEventListener("click", function() { require('electron').ipcRenderer.send('openTexturePackFolder'); });
        downloadTexturePackOptionInput.addEventListener("click", function() {
            window.open("https://github.com/jcjms/Quasar-Template/archive/refs/heads/main.zip", "Texturepack Download", "height=500,width=500");
        });
    });
    
    document.getElementById("wallpaper").addEventListener("click", function() {
        utils.showTab("wallpaper", "Wallpaper <p style=\"color: red; font-size: 17px\">ATTENTION: Need to restart client to apply wallpaper</p>", ["wallpaperoptionHolder", "wallpapercontent"], optionList, additionalHide);
    });
    
    document.getElementById("aimbot").addEventListener("click", function() {
        PageTitle.innerHTML = "<iframe width=\"100%\" height=\"260px\" src=\"https://bean-frog.github.io/yt5s.io-Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20(Official%20Music%20Video).mp4\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        
        utils.hideOptions(optionList, additionalHide)
        utils.hideLogoVersionAndOpenCloseText()
        utils.hideStuff()
    });

    
    // Checkbox State and function saving to JSON
    massCheckUncheckStatsCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Stats.FPS = true;
            jsonobj.Stats.Platform = true;
            jsonobj.Stats.CPU = true;
            jsonobj.Stats.memory = true;
            jsonobj.Stats.Tmemory = true;
            jsonobj.Stats.Cores = true;
            jsonobj.Stats.Uptime = true;
            jsonobj.Stats.Ping = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));

            document.getElementById("fpsDisplayCheck").checked = true;
            document.getElementById("pingDisplayCheck").checked = true;
            document.getElementById("platformDisplayCheck").checked = true;
            document.getElementById("cpuUsageDisplayCheck").checked = true;
            document.getElementById("memoryUsageDisplayCheck").checked = true;
            document.getElementById("totalMemoryDisplayCheck").checked = true;
            document.getElementById("cpuCoresDisplayCheck").checked = true;
            document.getElementById("uptimeDisplayCheck").checked = true;

            // only doing this, bc it doesn't update on its own for some reason
            fpscounter.style.display = "block";
            platform.style.display = "block";
            ping.style.display = "block";
            cpu.style.display = "block";
            mem.style.display = "block";
            totalMem.style.display = "block";
            cpuCount.style.display = "block";
            uptime.style.display = "block";
        } else {
            jsonobj.Stats.FPS = false;
            jsonobj.Stats.Online = false;
            jsonobj.Stats.Platform = false;
            jsonobj.Stats.CPU = false;
            jsonobj.Stats.memory = false;
            jsonobj.Stats.Tmemory = false;
            jsonobj.Stats.Cores = false;
            jsonobj.Stats.Uptime = false;
            jsonobj.Stats.Ping = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));

            document.getElementById("fpsDisplayCheck").checked = false;
            document.getElementById("pingDisplayCheck").checked = false;
            document.getElementById("platformDisplayCheck").checked = false;
            document.getElementById("cpuUsageDisplayCheck").checked = false;
            document.getElementById("memoryUsageDisplayCheck").checked = false;
            document.getElementById("totalMemoryDisplayCheck").checked = false;
            document.getElementById("cpuCoresDisplayCheck").checked = false;
            document.getElementById("uptimeDisplayCheck").checked = false;

            // only doing this, bc it doesn't update on its own for some reason
            fpscounter.style.display = "none";
            platform.style.display = "none";
            ping.style.display = "none";
            cpu.style.display = "none";
            mem.style.display = "none";
            totalMem.style.display = "none";
            cpuCount.style.display = "none";
            uptime.style.display = "none";
        }
    });

    function createEventListener(id, styleProperty, jsonProperty) {
        const element = document.getElementById(id);
        element.checked = jsonobj.Stats[jsonProperty];
      
        return element.addEventListener('change', e => {
          const target = e.target;
          const style = document.getElementById(styleProperty);
          const value = target.checked;
      
          style.style.display = value ? 'block' : 'none';
          jsonobj.Stats[jsonProperty] = value;
          fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        });
    }
    
    createEventListener('fpsDisplayCheck', 'fpscounter', 'FPS');
    createEventListener('shortcutDisplayCheck', 'shortcuts', 'Shortcuts');
    createEventListener('platformDisplayCheck', 'platform', 'Platform');
    createEventListener('pingDisplayCheck', 'ping', 'Ping');
    createEventListener('cpuUsageDisplayCheck', 'cpu', 'CPU');
    createEventListener('memoryUsageDisplayCheck', 'mem', 'memory');
    createEventListener('totalMemoryDisplayCheck', 'totalMem', 'Tmemory');
    createEventListener('cpuCoresDisplayCheck', 'cpuCount', 'Cores');
    createEventListener('uptimeDisplayCheck', 'uptime', 'Uptime');
    createEventListener('WASDDisplayCheck', 'WASD', 'WASD');
    createEventListener('AutoFullscreenCheck', null, 'AutoFullscreen');
    
    require('electron').ipcRenderer.on('toggleFullscreen', (event, data) => {
    document.getElementById('FullscreenCheck').checked = data;
    });
    
    document.getElementById('FullscreenCheck').checked = jsonobj.Fullscreen;
    document.getElementById('FullscreenCheck').addEventListener('change', e => {
    if (e.target.checked) {
        jsonobj.Fullscreen = true;
        require('electron').ipcRenderer.send('makeFullscreen');
    } else {
        jsonobj.Fullscreen = false;
        require('electron').ipcRenderer.send('exitFullscreen');
    }
    fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
    });      

    document.getElementById("debugCheck").checked = jsonobj.Debug;
    debugCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Debug = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Debug = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });
});
});