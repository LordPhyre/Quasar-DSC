require('electron').ipcRenderer.on('colorblinddata', (event, theColor) => {
// ZZZZ's colorblind mode - Credit to Gato
const TheColor = `'` + theColor + `'`;
console.log(theColor);

class GameLoader {
    sourceLink = ''
    observe() {return new Promise(resolve => {
            var observer = new MutationObserver((mutations, observer) => {
                for (let mutation of mutations) {for (let node of mutation.addedNodes) {
                        if (node.tagName === 'SCRIPT' && node.src.includes('final.js')) {
                            this.sourceLink = node.src
                            node.removeAttribute('src')
                            resolve()
                            observer.disconnect()
                        }
                    }}
            })
            observer.observe(document, {childList: true, subtree: true,})
        })}
    async source() {
        await this.observe()
        return await fetch(this.sourceLink).then(res => res.text())
    }
}
function makeRegex(lookingFor){
    var normArray = lookingFor.split('');
    var xEscArray = lookingFor.split('').map(function(e) {return '\\\\x' + e.charCodeAt(0).toString(16);});
    var uEscArray = lookingFor.split('').map(function(e) {return `\\\\u\\{${e.charCodeAt(0).toString(16).toUpperCase()}\\}`;;});
    var specialChars = ['(',',',')','.',':','{','}'];

    var outp = "(";
    var i = 0;
    normArray.forEach((e)=>{
        let norm = normArray[i];
        if(norm == " "){norm = "\\s*"};
        if(specialChars.includes(norm)){norm = "\\" + norm};
        outp += `(?:${norm}|${xEscArray[i]}|${uEscArray[i]})`;
        i++;
    })
    outp += ")";

    return new RegExp(outp);
}

let loader = new GameLoader()
loader.source().then(async source => {

var Eliminated = makeRegex("'#F33'");
var EliminatedBorder = makeRegex("'#C33'");
var MatchEndName = makeRegex("'#F55'");
var VignetteAndGradientAndRugged = makeRegex("'#F00'");
var EnemyBarsAndNames = makeRegex("'#FF4545'");
var EnemyOnDeathAndARDot = makeRegex("'#F44'");
var HitCircle = makeRegex("'#FF2828'");
var Unknown2 = makeRegex("'#F77'");
var Unknown3 = makeRegex("'#F66'");
var NametagsOLDBROKEN = makeRegex("'#F84f4f'");
var KillFeedNames = makeRegex("'#E33'");
var HPbar = makeRegex("'#E22'");
var GameOver = makeRegex("'#E44'"); // duble chex this
var Unknown4 = makeRegex("'#E66'");
var new8 = makeRegex("'#D33'");
var new9 = makeRegex("'#d90218'");
var PlayerGlow = makeRegex("vec4( 0.97, 0.1, 0.1");
var PlayerOutlines = makeRegex("vec4( 1.0, 0.14, 0.14");
const regexArray = [Eliminated, EliminatedBorder, MatchEndName, VignetteAndGradientAndRugged, EnemyBarsAndNames, EnemyOnDeathAndARDot, HitCircle, Unknown2, Unknown3, KillFeedNames, HPbar, GameOver, Unknown4, new8, new9];

regexArray.forEach((regex) => {
  var tmatch = source.match(regex);
  if (tmatch) {
      source = source.replace(tmatch[1], TheColor);
      console.log("regexArray[" + regexArray.indexOf(regex) + "] updated.");
  }
    else { console.log("regexArray[" + regexArray.indexOf(regex) + "] was not found."); }
});

if (source.match(PlayerGlow)) {
    let hex = TheColor.replace(/'/g, '');
    let r = parseInt(hex[1] + hex[1], 16)/255;
    let g = parseInt(hex[2] + hex[2], 16)/255;
    let b = parseInt(hex[3] + hex[3], 16)/255;
    source = source.replace(source.match(PlayerGlow)[1], `vec4( ${r}, ${g}, ${b}`);
    console.log(`vec4( ${r}, ${g}, ${b}`);
    console.log("PlayerGlow updated.");
}
else { console.log("PlayerGlow was not found."); }

if (source.match(PlayerOutlines)) {
    let hex = TheColor.replace(/'/g, '');
    let r = parseInt(hex[1] + hex[1], 16)/255;
    let g = parseInt(hex[2] + hex[2], 16)/255;
    let b = parseInt(hex[3] + hex[3], 16)/255;
    source = source.replace(source.match(PlayerOutlines)[1], `vec4( ${r}, ${g}, ${b}`);
    console.log(`vec4( ${r}, ${g}, ${b}`);
    console.log("PlayerOutlines updated.");
}
else { console.log("PlayerOutlines were not found."); }


console.log(source);
    new Function(source)()
})

});

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
const themes = require('./modules/themes.js');
const invmenu = require('./modules/invitemenu.js');

document.addEventListener("DOMContentLoaded", function() {

//Receive user datapath and save as variable
require('electron').ipcRenderer.on('SendUserData', (event, message, client_version) => {
    const jsonpath = message;

    // Parse the contents of the file into a JavaScript object
    const jsonobj = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));

    // Styling and CSS
    var menuHeaderColor = jsonobj.Colors.menuHeaderColor; //"#2a394f";
    var menuColor = jsonobj.Colors.menuColor; //"#2a394f";
    var behindOptionsColor = jsonobj.Colors.behindOptionsColor; //"#2a394f";
    var skinButtonColor = jsonobj.Colors.skinButtonColor; //"#364760";
    var skinButtonHoverColor = jsonobj.Colors.skinButtonHoverColor; //"#0798fc";
    var skinCloseColor = jsonobj.Colors.skinCloseColor; //"#ffffff00";
    var skinCloseTextColor = jsonobj.Colors.skinCloseTextColor; //"#ffffff00";
    var skinCloseTextHoverColor  = jsonobj.Colors.skinCloseTextHoverColor;
    var optionColor = jsonobj.Colors.optionColor; //"#364760";
    var opacity = jsonobj.Colors.opacity; //0.95;
    var skinWrapperBorderRadius = jsonobj.Colors.skinWrapperBorderRadius; //"10";
    var msgBoxColor = jsonobj.Colors.msgBoxColor; //"#2a394f";

    var css = document.createElement('style');
    css.innerHTML = `
    #themeOptionHolder {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding-left: 10px;
        padding-top: 10px;
    }
    
    .theme-button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid #ccc;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        position: relative;
        overflow: hidden;
    }
    
    .theme-button:before {
        content: "";
        position: absolute;
        top: -25px;
        left: -25px;
        width: 50px;
        height: 50px;
        background-color: #fff;
        transform: rotate(45deg);
        z-index: 1;
    }
    
    .theme-button:after {
        content: "";
        position: absolute;
        top: -28px;
        left: -28px;
        width: 50px;
        height: 50px;
        transform: rotate(45deg);
        z-index: 2;
    }
    
    .theme-button:hover {
        transform: scale(1.1);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(css);

    const themeData = [
        {
            id: "bluetheme",
            color: "blue",
            afterColor: "purple",
            backgroundColor: "#4d4dff",
            skinWrapperBorderRadius: "10",
            menuHeaderColor: "purple",
            behindOptionsColor: "blue",
            optionColor: "blue",
            msgBoxColor: "blue",
            skinButtonColor: "blue",
            skinCloseColor: "#ffffff00",
            skinCloseTextColor: "grey",
            skinCloseTextHoverColor: "white",
            skinButtonHoverColor: "purple",
            menuColor: "purple"
        },
    ];

    styling.styling(skinButtonColor, skinButtonHoverColor, skinCloseColor, skinCloseTextColor, skinCloseTextHoverColor, menuColor);
    menuconstruct.menuconstruct(opacity, skinWrapperBorderRadius, menuHeaderColor, behindOptionsColor, client_version, optionColor, msgBoxColor)
    statscreate.statscreate(jsonobj);
    wasd.wasd(jsonobj);
    get_ping.ping();
    get_fps.fps();
    skinSkybox.skinSkybox(optionColor);
    themes.themes(jsonobj, themeData);
    invmenu.create();

    document.getElementById('skyboxFolderButton').addEventListener('click', function() {
        require('electron').ipcRenderer.send('openSkyboxFolder')
    });


    // Menu Tabs
    const tabData = [
        { text: 'Home', id: 'HomePage' },
        { text: 'Themes', id: 'themes' },
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
        holderId: "EnableShortcutsOptionHolder",
        descrText: "Enable Shortcuts",
        checkId: "EnableShortcutsCheck",
    },
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
        "wallpaperoptionHolder",
        "themeOptionHolder",
        "colorblindOptionHolder"
    ];

    optionHolderManager.createOptionHolder('texturePackOptionHolder', 'Texture Pack', 'texturePackOptionInput', jsonobj);
    optionHolderManager.createOptionHolder('downloadTexturePackOptionHolder', 'Download QUASAR Pack', 'downloadTexturePackOptionInput', jsonobj);
    optionHolderManager.createOptionHolder('RPCTextOptionHolder', 'RPC Text', 'rpcOptionInput', jsonobj);
    optionHolderManager.createOptionHolder('colorblindOptionHolder', `ZZZZ's Colorblind Mode`, 'colorblindOptionInput', jsonobj);  

    function createEventListener(id, styleProperty, jsonProperty) {
        const element = document.getElementById(id);
        if (id == "colorblindCheck") {
            element.checked = jsonobj[jsonProperty];
        } else {
            element.checked = jsonobj.Stats[jsonProperty];
        }
      
        return element.addEventListener('change', e => {
          const target = e.target;
          const value = target.checked;

          if (styleProperty) {
            const style = document.getElementById(styleProperty);
            style.style.display = value ? 'block' : 'none';
          }
          if (id = "colorblindCheck") {
            jsonobj[jsonProperty] = value;
          } else {
            jsonobj.Stats[jsonProperty] = value;
          }
          fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        });
    }
    
    createEventListener('fpsDisplayCheck', 'fpscounter', 'FPS');
    createEventListener('shortcutDisplayCheck', 'shortcutsdisplay', 'Shortcuts');
    createEventListener('EnableShortcutsCheck', null, 'EnableShortcuts');
    createEventListener('platformDisplayCheck', 'platform', 'Platform');
    createEventListener('pingDisplayCheck', 'ping', 'Ping');
    createEventListener('cpuUsageDisplayCheck', 'cpu', 'CPU');
    createEventListener('memoryUsageDisplayCheck', 'mem', 'memory');
    createEventListener('totalMemoryDisplayCheck', 'totalMem', 'Tmemory');
    createEventListener('cpuCoresDisplayCheck', 'cpuCount', 'Cores');
    createEventListener('uptimeDisplayCheck', 'uptime', 'Uptime');
    createEventListener('WASDDisplayCheck', 'WASD', 'WASD');
    createEventListener('AutoFullscreenCheck', null, 'AutoFullscreen');
    createEventListener('colorblindCheck', null, 'Colorblindmode');

    colorblindOptionInput.addEventListener('change', function() {
        jsonobj.ColorblindmodeColor = colorblindOptionInput.value;
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
    });

    shortcuts.shortcuts(jsonobj, jsonpath, optionColor);

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
            "RPCTextOptionHolder",
            "SplashOptionHolder",
            "colorblindOptionHolder",
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
            "EnableShortcutsOptionHolder",
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

    document.getElementById("themes").addEventListener("click", function() {
        const elements = [
            "themeOptionHolder"
        ];
        utils.showTab("themes", "Themes", elements, optionList, additionalHide);
    });

    // stat checkboxes
    const statCheckboxes = [
        { id: "fpsDisplayCheck", prop: "FPS" },
        { id: "pingDisplayCheck", prop: "Ping" },
        { id: "platformDisplayCheck", prop: "Platform" },
        { id: "cpuUsageDisplayCheck", prop: "CPU" },
        { id: "memoryUsageDisplayCheck", prop: "memory" },
        { id: "totalMemoryDisplayCheck", prop: "Tmemory" },
        { id: "cpuCoresDisplayCheck", prop: "Cores" },
        { id: "uptimeDisplayCheck", prop: "Uptime" }
    ];
      
    const statElements = [
        { id: "fpscounter", prop: "FPS" },
        { id: "ping", prop: "Ping" },
        { id: "platform", prop: "Platform" },
        { id: "cpu", prop: "CPU" },
        { id: "mem", prop: "memory" },
        { id: "totalMem", prop: "Tmemory" },
        { id: "cpuCount", prop: "Cores" },
        { id: "uptime", prop: "Uptime" }
    ];
      
    massCheckUncheckStatsCheck.addEventListener('change', e => {
        const isChecked = e.target.checked;
        for (const checkbox of statCheckboxes) {
          jsonobj.Stats[checkbox.prop] = isChecked;
          document.getElementById(checkbox.id).checked = isChecked;
        }
        for (const element of statElements) {
          document.getElementById(element.id).style.display = isChecked ? "block" : "none";
        }
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
    });      
    
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