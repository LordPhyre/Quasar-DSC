const fs = require('fs');
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const ping_get = require('ping');
//const {ipcRenderer} = require('electron'); doesn't work, idk why tbh

document.addEventListener("DOMContentLoaded", function() {

//Receive user datapath and save as variable
require('electron').ipcRenderer.on('SendUserData', (event, message, client_version) => {
    const jsonpath = message;
    console.log(jsonpath);

    // Parse the contents of the file into a JavaScript object
    let jsonobj = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));
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
    
    let skincss = document.createElement('style');
    skincss.innerText = `@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
            font-family:'Poppins',sans-serif
        }
        body{
            overflow-y: hidden;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .titlebar{
            -webkit-user-select: none;
            -webkit-app-region: drag;
        }
        .skinwrapper{
            position:absolute;
            top:50%;
            left:50%;
            max-width:750px;
            width:100%;
            background:#232429;
            /* if I add menuHeaderColor it spawns at a different location lmao, but the color has to stay like that, else the menu is see trough under header*/
            transform:translate(-50%,-50%);
            border:solid 1px #000;
            color:#fff;
            height:335px;
        }
        .skinwrapper header{
            font-size:23px;
            font-weight:500;
            padding:17px 30px;
            border-bottom:1px solid #000;
            text-align:center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .skinwrapper header.skinactive{
            cursor:move;
            user-select:none;
        }
        .skinwrapper .skincontent{
            display:flex;
            flex-direction:wrap;
            flex-wrap:wrap;
            justify-content:center;
        }
        .skincontent .title{
            margin:15px 0;
            font-size:29px;
            font-weight:500
        }
        .skincontent p{
            font-size:16px;
            text-align:center;
            display:flex
        }
        .skinbutton{
            width:100%;
            height:48px;
            background-color: ${skinButtonColor};
            border:none;
            color:#fff;
            font-size:20px
        }
        .skinbutton:hover{
            background-color: ${skinButtonHoverColor};
        }
        .skinclose{
            color:grey;
            position:absolute;
            top:0;
            right:0;
            margin-right:15px;
            margin-top:-6px;
            background-color: ${skinCloseColor};
            border:none;
            font-size:35px
        }
        .skinclose:hover{
            color:#fff
        }
        p{
            font-size:20px
        }
        input[type=text]{
            float:right;
            margin:14px 25px 10px 0;
            font-weight:700;
            color:grey
        }
        input[type=range]{
            float:right;
            margin:16px 20px 10px 0
        }
        input[type=checkbox]{
            float:right;
            transform:scale(2);
            margin:14px 25px 5px 0;
            width:35px;
            font-weight:700;
            color:grey;
        }
        input[type=button]{
            float:right;
            margin:14px 25px 10px 0;
        }
        .optiondescr{
            float:left;
            margin:10px 0 10px 20px
        }
        .optionholder{
            background-color:" + optionColor + ";
             display: inline-block
        }
        hr{
            width:100%;
            border:.1px solid rgb(255, 27, 8, 0);
        }
        .skinCategory:hover{
            background-color:#0798fc
        }
    `;
    document.head.appendChild(skincss);
    
    let scrollcss = document.createElement('style');
    scrollcss.innerText = `
    ::-webkit-scrollbar { width: 8px; height: 3px;}
    ::-webkit-scrollbar-track {  background-color: #646464;}
    ::-webkit-scrollbar-track-piece { background-color: #000;}
    ::-webkit-scrollbar-thumb { height: 50px; background-color: #666; border-radius: 3px;}
    ::-webkit-scrollbar-corner { background-color: #646464;}}
    ::-webkit-resizer { background-color: #666;}`;
    document.head.appendChild(scrollcss);
    


// Constructing Menu Base

    // Logo font
    const logoFont = document.createElement('link')
    logoFont.href = "https://fonts.cdnfonts.com/css/aquire";
    logoFont.rel = "stylesheet";
    document.getElementsByTagName('head')[0].appendChild(logoFont);

    const skinWrapper = document.createElement('div');
    skinWrapper.className = 'skinwrapper';
    skinWrapper.id = "skinWrapper";
    skinWrapper.style = "::-webkit-scrollbar{border:1px solid #d5d5d5};opacity:" + opacity + ";border-radius: " + skinWrapperBorderRadius + "px; z-index: 9999;";
    skinWrapper.innerHTML = `
        <header id="skinheader" style="background: ${menuHeaderColor};" class="titlebar">Main Menu</header>
        <div id="mainDiv" style="background: ${behindOptionsColor};"></div>
        <div id="leftDiv" style="float: left; width: 40%; height: 263px; overflow: scroll; overflow-x: hidden; overflow-y: auto;"></div>
        <div id="rightDiv" style="float: right; width: 60%; height: 263px; overflow: scroll; overflow-x: hidden; overflow-y: auto;">
            <h2 id="PageTitle" style="text-align: center; margin: 10px 0 10px 0;">Home</h2>
            <h2 id="logo" style="font-family: 'Aquire', sans-serif; text-align: center; color: white; font-size: 75px; margin-top: 30px;">Quasar<br></h2>
            <h2 id="version" style="font-family: 'Aquire', sans-serif; text-align: center; color: white; font-size: 17.5px;">v${client_version} - PUBLIC</h2>
            <h3 id="openCloseText" style="sans-serif; text-align: center; color: white; font-size: 14px; display: block; margin-top: 50px">Use the F1/fn + F1 key on your keyboard to toggle this menu</h3>
        </div>
        </div>
    `;
    document.body.appendChild(skinWrapper);



// Computer Stats Display
    const statsHolderWrapper = document.createElement("div");
    statsHolderWrapper.id = "statsHolderWrapper";
    statsHolderWrapper.style = "position: absolute; right: 0;top: 25%; z-index: 1000; margin-right: 6px; font-size: 100%; height: 100%;";
    statsHolderWrapper.innerHTML = `
        <div id="statsHolder" style="z-index: 1000; /*top: 50%;*/ color: white; padding-right: 5px; font-size: 100%; background: #191919; opacity: 0.9;">
    `;
    document.body.appendChild(statsHolderWrapper);
    
    const elementIds = ['fpscounter', 'ping', 'platform', 'cpu', 'mem', 'totalMem', 'cpuCount', 'uptime'];
    const styles = "z-index: 1000; color: white; font-size: 100%; display: none; white-space: nowrap;";
    
    for (const id of elementIds) {
      const element = document.createElement("h2");
      element.innerHTML = "loading...";
      element.id = id;
      element.style = styles;
      document.getElementById('statsHolder').appendChild(element);
    }

    //Show or Hide based on JSON
    if(jsonobj.Stats.FPS) { fpscounter.style.display = "initial"; } 
    else if (!jsonobj.Stats.FPS) { fpscounter.style.display = "none"; };
    
    if(jsonobj.Stats.Ping) { ping.style.display = "initial"; } 
    else if (!jsonobj.Stats.Ping) { ping.style.display = "none"; };

    if(jsonobj.Stats.Platform) { platform.style.display = "initial"; } 
    else if (!jsonobj.Stats.Platform) { platform.style.display = "none"; };

    if(jsonobj.Stats.CPU) { cpu.style.display = "initial"; } 
    else if (!jsonobj.Stats.CPU) { cpu.style.display = "none"; };

    if(jsonobj.Stats.memory) { mem.style.display = "initial"; } 
    else if (!jsonobj.Mem) { mem.style.display = "none"; };

    if(jsonobj.Stats.Tmemory) { totalMem.style.display = "initial"; } 
    else if (!jsonobj.Stats.Tmemory) { totalMem.style.display = "none"; };

    if(jsonobj.Stats.Cores) { cpuCount.style.display = "initial"; } 
    else if (!jsonobj.Stats.Cores) { cpuCount.style.display = "none"; };

    if(jsonobj.Stats.Uptime) { uptime.style.display = "initial"; } 
    else if (!jsonobj.Stats.Uptime) { uptime.style.display = "none"; };

    ipcRenderer.on('platform',(event,data) => { document.getElementById('platform').innerHTML = "Platform: " + data + "<br>"; });
    ipcRenderer.on('cpu',(event,data) => { document.getElementById('cpu').innerHTML = "CPU: " + data.toFixed(2) + "%<br>"; });
    ipcRenderer.on('mem',(event,data) => { document.getElementById('mem').innerHTML = "Memory: " + data.toFixed(2) + "<br>"; });
    ipcRenderer.on('total-mem',(event,data) => { document.getElementById('totalMem').innerHTML = "Tot. Mem.: " + data.toFixed(2) + "%<br>"; });
    ipcRenderer.on('cpu-count',(event,data) => { document.getElementById('cpuCount').innerHTML = "CPU Cores: " + data + "<br>"; });
    ipcRenderer.on('uptime',(event,data) => { document.getElementById('uptime').innerHTML = "Uptime: " + data.toFixed(2) + "s<br>"; });
    
    

// WASD Display
    // Try-Catch block is here to eliminate any errors. An error at this stage can halt the entire program.
    try {
        var keydata = window.localStorage.getItem('keyb');
        var game_keys = JSON.parse(keydata);
    
        // {"up":"W","down":"S","left":"A","right":"D","space":"Space","chat":"Enter","pause":"Escape","leaderboard":"Tab","ads":"L","shoot":"K","crouch":"Shift","reload":"R"}
        var up = game_keys.up;
        var down = game_keys.down;
        var left = game_keys.left;
        var right = game_keys.right;
        var reload = game_keys.reload;
        var crouch = game_keys.crouch;
        var space = game_keys.space;
    } catch {
        console.error("Could not access localstorage");
        var up = "w";
        var down = "s";
        var left = "a";
        var right = "d";
        var reload = "r";
        var crouch = "shift";
        var space = "space";
    }

    const WASD = document.createElement("div");
    WASD.style = "z-index: 1000; position: absolute; top: 90px; left: 5px; display: none;";
    WASD.innerHTML = `
<div style="width: 276px; display: flex; color: white; align-items: center; justify-content: center;">
    <div style="opacity: 0; width: 54px; height: 40px;"></div>
    <div id="w" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${up}</div>
    <div style="opacity: 0; width: 86px; height: 40px;"></div>
    <div id="r" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${reload}</div>
    <div style="opacity: 0; width: 28px; height: 40px;"></div>
</div>
<div style="width: 276px; display: flex; color: white; align-items: center; justify-content: center;">
    <div id="a" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${left}</div>
    <div id="s" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${down}</div>
    <div id="d" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${right}</div>
    <div id="shift" style="background: rgba(255, 255, 255, .2); width: 100px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${crouch}</div>
</div>
<div style="width: 276px; display: flex; color: white; align-items: center; justify-content: center;">
    <div id="space" style="background: rgba(255, 255, 255, .2); width: 220px; height: 34px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;"></div>
</div>`;
    WASD.id = "WASD";
    document.body.appendChild(WASD);
    
    if(jsonobj.WASD) {
        WASD.style.display = "block";
    } else if (!jsonobj.WASD) {
        WASD.style.display = "none";
    };



// Shortcut Display
    var one = "1"
    var two = "2";
    var three = "3";
    var four = "4";
    var five = "5";

    var oneValue = jsonobj.Shortcuts.one;
    var twoValue = jsonobj.Shortcuts.two;
    var threeValue = jsonobj.Shortcuts.three;
    var fourValue = jsonobj.Shortcuts.four;
    var fiveValue = jsonobj.Shortcuts.five;

    const shortcuts = document.createElement("h2");
    shortcuts.innerHTML = "[" + one + "] " + oneValue + " [" + two + "] " + twoValue + "  [" + three + "] " + threeValue + "  [" + four + "] " + fourValue + "  [" + five + "] " + fiveValue;
    shortcuts.type = "submit";
    shortcuts.id = "shortcutsdisplay";
    shortcuts.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 2px; margin-left: 5px; outline: none; border: none; font-size: 100%; display: none;";
    document.body.appendChild(shortcuts);

    //Show or Hide Shortcuts based on JSON
    if(jsonobj.Stats.Shortcuts) { shortcuts.style.display = "block"; }
    else if (!jsonobj.Stats.Shortcuts) { shortcuts.style.display = "none"; };



// SKIN-DISPLAY
    const skinCategoryoptionHolder = document.createElement('div');
    skinCategoryoptionHolder.className = 'optionholder';
    skinCategoryoptionHolder.id = 'skinCategoryoptionHolder';

    rightDiv.appendChild(skinCategoryoptionHolder);

    const buttonWrapper = document.createElement('div');
    buttonWrapper.style = 'display: flex; justify-content: center;';
    buttonWrapper.innerHTML = `
            <button class="skinCategory" id="allButton" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px;">All</button>
            <button class="skinCategory" id="awpButton" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px;">AWP</button>
            <button class="skinCategory" id="ar2Button" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px;">AR2</button>
            <button class="skinCategory" id="vectorButton" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px;">Vector</button>
            <button class="skinCategory" id="skinFolderButton" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px;">| <span style="text-decoration: underline; cursor: pointer;">Folder</span></button>
    `;
    skinCategoryoptionHolder.appendChild(buttonWrapper);


// SKYBOX-DISPLAY
    const skyboxoptionHolder = document.createElement('div');
    skyboxoptionHolder.className = 'optionholder';
    skyboxoptionHolder.id = 'skyboxoptionHolder';

    const skyboxButtonWrapper = document.createElement('div');
    skyboxButtonWrapper.style = 'display: flex; justify-content: center;';
    skyboxButtonWrapper.innerHTML = `
        <button class="skinCategory" id="skyboxFolderButton" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px; text-decoration: underline; cursor: pointer;">Open Folder</button>
    `;

    skyboxoptionHolder.appendChild(skyboxButtonWrapper);
    rightDiv.appendChild(skyboxoptionHolder);

    document.getElementById('skyboxFolderButton').addEventListener('click', function() {
        require('electron').ipcRenderer.send('openSkyboxFolder')
    });

    // skybox content + images
    const skyboxcontent = document.createElement("div");
    skyboxcontent.id = "skyboxcontent";
    skyboxcontent.classList.add('skyboxcontent'); // if breaks try skincontent
    skyboxcontent.style.background = optionColor;

    document.getElementById('rightDiv').appendChild(skyboxcontent);

    var skyboxcontentselector = document.getElementById('skyboxcontent');

    const skyboxflexSquare = document.createElement('img');
    skyboxflexSquare.style = 'width: 100px; height: 100px; border: 1px solid black; margin: 10px;';


  /*              <div id="skincontent" class="skincontent" style="background: ${optionColor};"></div>
            <div id="skinSkyboxDivider">
                <hr style="height:5px; background-color: #1d00ff; border: none; width: 410px; margin: 15px; border-radius: 5px;">
                <h2 style="text-align: center; margin: 10px 0 10px 0;">Skyboxes</h2>
            </div>
            <div id="skyboxoptionHolder" class="optionholder">
                <div style="display: flex; justify-content: center;">
                    <button class="skinCategory" id="skyboxFolderButton" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px; text-decoration: underline; cursor: pointer;">Open Folder</button>
                </div>
            </div>
            <div id="skyboxTextureDivider">
                <hr style="height:5px; background-color: #1d00ff; border: none; width: 410px; margin: 15px; border-radius: 5px;">
                <h2 style="text-align: center; margin: 10px 0 10px 0;">Texture Packs</h2>
            </div>
            <div id="wallpaperoptionHolder" class="optionholder">
            <div style="display: flex; justify-content: center;">
                <button class="skinCategory" id="wallpaperFolderButton" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px; text-decoration: underline; cursor: pointer;">Open Folder</button>
            </div>
    */
    
// close button
    const skinCloseButton = document.createElement('button');
    skinCloseButton.className = 'skinclose';
    skinCloseButton.innerText = '_';
    skinCloseButton.id = 'skinclose';
    document.getElementById('skinWrapper').appendChild(skinCloseButton);


// some juicy js
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `dragElement(document.getElementById("skinWrapper"));function dragElement(elmnt) {var pos1 = 0,pos2 = 0,pos3 = 0,pos4 = 0;document.getElementById("skinheader").onmousedown = dragMouseDown;function dragMouseDown(e) {e = e || window.event;e.preventDefault();pos3 = e.clientX;pos4 = e.clientY;document.onmouseup = closeDragElement;document.onmousemove = elementDrag;}function elementDrag(e) {e = e || window.event;e.preventDefault();pos1 = pos3 - e.clientX;pos2 = pos4 - e.clientY;pos3 = e.clientX;pos4 = e.clientY;elmnt.style.top = (elmnt.offsetTop - pos2) + "px";elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";}function closeDragElement() {document.onmouseup = null;document.onmousemove = null;}};document.getElementById('skinclose').addEventListener('click',function(){document.getElementById('skinWrapper').style.display='none'});`;
    document.getElementsByTagName('head')[0].appendChild(script);



// Menu Buttons
    const buttonData = [
        { text: 'Home', id: 'HomePage' },
        { text: 'General', id: 'general' },
        { text: 'Stats', id: 'stats' },
        { text: 'Shortcuts', id: 'shortcuts' },
        { text: 'Skins', id: 'SkinCategory' },
        { text: 'Wallpaper', id: 'wallpaper' },
        { text: 'Aimbot', id: 'aimbot' }
    ];
    
    buttonData.forEach(button => {
        const optionButton = document.createElement('button');
        optionButton.className = 'skinbutton';
        optionButton.innerText = button.text;
        optionButton.id = button.id;
        document.getElementById('leftDiv').appendChild(optionButton);
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
    
    for (const option of optionList) {
        // holds the sub-options
        const optionHolder = document.createElement('div');
        optionHolder.className = 'optionholder';
        optionHolder.id = option.holderId;
        
        // sub-option title
        const optionDescr = document.createElement('p');
        optionDescr.className = 'optiondescr';
        optionDescr.innerText = option.descrText;
        
        // checkbox
        const optionCheck = document.createElement('input');
        optionCheck.type = 'checkbox';
        optionCheck.id = option.checkId;
        //optionCheck.addEventListener('change', option.onChange);
        
        //Putting the elements together. <hr> is for formatting.
        optionHolder.innerHTML = `
            ${optionDescr.outerHTML}
            ${optionCheck.outerHTML}
            <hr>
        `;
        rightDiv.appendChild(optionHolder);
    }




// 
    const otherOptionsList = [
    {
        holderId: "texturePackOptionHolder",
        descrText: "Open Folder",
        buttonId: "texturePackButton",
    },
    {
        holderId: "downloadTexturePackOptionHolder",
        descrText: "Download Pack",
        buttonId: "downloadPackButton",
    },
    {
        holderId: "shortcutOptionHolder",
        descrText: "Off / On",
        textboxId: "shortcutOptionTextbox1",
    },
    {
        holderId: "shortcutOptionHolder2",
        descrText: "Off / On",
        textboxId: "shortcutOptionTextbox2",
    },
    {
        holderId: "shortcutOptionHolder3",
        descrText: "Off / On",
        textboxId: "shortcutOptionTextbox3",
    },
    {
        holderId: "shortcutOptionHolder4",
        descrText: "Off / On",
        textboxId: "shortcutOptionTextbox4",
    },
    {
        holderId: "shortcutOptionHolder5",
        descrText: "Off / On",
        textboxId: "shortcutOptionTextbox5",
    },
    {
        holderId: "RPCTextshortcutOptionHolder",
        descrText: "Off / On",
        textboxId: "RPCTextbox",
    },
    ];
    
    for (const option of otherOptionsList) {
        // holds the sub-options
        const optionHolder = document.createElement('div');
        optionHolder.className = 'optionholder';
        optionHolder.id = option.holderId;
        
        // Creates buttons
        if (option.holderId.includes('shortcutOptionHolder')) {
            var optionDescr = document.createElement('p');
            optionDescr.className = 'optiondescr';
            optionDescr.innerText = option.descrText;

            // button
            var optionButton = document.createElement('input');
            optionButton.type = 'button';
            optionButton.id = option.buttonId;
            optionButton.value = option.descrText;
            optionButton.style.width = '110px';
            //optionButton.addEventListener('change', option.onChange);
            
            //Putting the elements together. <hr> is for formatting.
            optionHolder.innerHTML = `
                ${optionDescr.outerHTML}
                ${optionButton.outerHTML}
                <hr>`;
        }
        
        // Creates textboxes
        else {
            var optionDescr = document.createElement('p');
            optionDescr.className = 'optiondescr';
            optionDescr.innerText = option.descrText;

            // textbox
            var optionTextbox = document.createElement('input');
            optionTextbox.type = 'text';
            optionTextbox.id = option.textboxId;
            optionTextbox.style.width = '100px';
            //optionTextbox.addEventListener('change', option.onChange);
            
            //Putting the elements together. <hr> is for formatting.
            optionHolder.innerHTML = `
                ${optionDescr.outerHTML}
                ${optionTextbox.outerHTML}
                <hr>`;
        }
        rightDiv.appendChild(optionHolder);
    }

/*/ Making the Textboxes
    const optionholders = [];
    const optiondescrs = [];
    const optioninputs = [];
    const optionhrs = [];

    const createElement = (type, className, id, innerText) => {
        const element = document.createElement(type);
        element.className = className;
        element.id = id;
        element.innerText = innerText;
        return element;
    };

    let keyNumber = 1;
    const createOptionHolder = (id, descrText, inputId) => {
        const optionHolder = createElement('div', 'optionholder', id, '');
        const optionDescr = createElement('p', 'optiondescr', '', descrText);
        const optionInput = createElement('input', '', inputId, '');
        const optionHr = createElement('hr', '', '', '');
        if (id == "texturePackOptionHolder") {
            optionInput.type = 'button'; // normally I wouldn't do this, just so I can make it more efficient
            optionInput.value = 'Open Folder';
            optionInput.style.width = '110px';
        } else if (id == "downloadTexturePackOptionHolder") {
            optionInput.type = 'button';
            optionInput.value = 'Download Pack';
            optionInput.style.width = '110px';
        } else {
            optionInput.type = 'text';
            optionInput.style.width = '100px';
        }
        if (id.includes('shortcutOptionHolder')) {
            optionInput.style.float = "right";
            optionHolder.style.backgroundColor = optionColor;
            if (id == 'shortcutOptionHolder') {
                optionInput.placeholder = 'off / on';
                optionInput.setAttribute('value', jsonobj.Shortcuts.one);
            } else if (id == 'shortcutOptionHolder2') {
                optionInput.placeholder = 'GG';
                optionInput.setAttribute('value', jsonobj.Shortcuts.two);
            } else if (id == 'shortcutOptionHolder3') {
                optionInput.placeholder = 'hello guys';
                optionInput.setAttribute('value', jsonobj.Shortcuts.three);
            } else if (id == 'shortcutOptionHolder4') {
                optionInput.placeholder = 'noob';
                optionInput.setAttribute('value', jsonobj.Shortcuts.four);
            } else if (id == 'shortcutOptionHolder5') {
                optionInput.placeholder = 'lmao';
                optionInput.setAttribute('value', jsonobj.Shortcuts.five);
            } 
            optionInput.style.width = '140px';
            optionInput.name = inputId;
            optionInput.id = keyNumber++;
        } else if (id == 'texturePackOptionHolder' || id == "downloadTexturePackOptionHolder") {
            optionInput.placeholder = '';
        } else if (id == 'RPCTextOptionHolder') {
            optionInput.placeholder = 'Slapping noobs';
            optionInput.style.width = '200px';
            optionInput.setAttribute('value', jsonobj.RPC.text);
        }

        optionholders.push(optionHolder);
        optiondescrs.push(optionDescr);
        optioninputs.push(optionInput);
        optionhrs.push(optionHr);

        optionHolder.appendChild(optionDescr);
        optionHolder.appendChild(optionInput);
        optionHolder.appendChild(optionHr);
    };

    // defining the options with input fields (I could put them into an array and to for each later...)
    createOptionHolder('shortcutOptionHolder', 'Shortcut Option [1]', 'shortcutOptionInput');
    createOptionHolder('shortcutOptionHolder2', 'Shortcut Option [2]', 'shortcutOptionInput2');
    createOptionHolder('shortcutOptionHolder3', 'Shortcut Option [3]', 'shortcutOptionInput3');
    createOptionHolder('shortcutOptionHolder4', 'Shortcut Option [4]', 'shortcutOptionInput4');
    createOptionHolder('shortcutOptionHolder5', 'Shortcut Option [5]', 'shortcutOptionInput5');

    createOptionHolder('texturePackOptionHolder', 'Texture Pack', 'texturePackOptionInput');
    createOptionHolder('downloadTexturePackOptionHolder', 'Download QUASAR Pack', 'downloadTexturePackOptionInput');
    createOptionHolder('RPCTextOptionHolder', 'RPC Text', 'rpcOptionInput');

    optionholders.forEach(holder => {
        rightDiv.appendChild(holder);
    });
    */


// Show and Hide checkboxes when changing pages
    
    function hideLogoVersionAndOpenCloseText() {
        logo.style.display = "none";
        version.style.display = "none";
        openCloseText.style.display = "none";
    }
    function hideSkinStuff() {
        skinCategoryoptionHolder.style.display = "none";
        skyboxoptionHolder.style.display = "none";
    }

    // Home Page
    for (const option of optionList) { document.getElementById(option.holderId).style.display = 'none'; }
    for (const option of otherOptionsList) { document.getElementById(option.holderId).style.display = 'none'; }
    hideSkinStuff()
    document.getElementById("HomePage").addEventListener("click", function() {
        for (const option of optionList) { document.getElementById(option.holderId).style.display = 'none'; }
        for (const option of otherOptionsList) { document.getElementById(option.holderId).style.display = 'none'; }
        hideSkinStuff()
        
        PageTitle.innerHTML = "Home";
        logo.style.display = "block";
        version.style.display = "block";
        openCloseText.style.display = "block";
    });
        
    // General Tab
    document.getElementById("general").addEventListener("click", function() {
        PageTitle.innerHTML = "General";
        for (const option of optionList) { document.getElementById(option.holderId).style.display = 'none'; }
        for (const option of otherOptionsList) { document.getElementById(option.holderId).style.display = 'none'; }
        hideLogoVersionAndOpenCloseText()
        hideSkinStuff()

        const elements = [
            "WASDDisplayOptionHolder",
            "AutoFullscreenOptionHolder",
            "FullscreenOptionHolder",
            "RPCDisplayOptionHolder",
            "RPCTextshortcutOptionHolder",
            "SplashOptionHolder",
            "debugOptionHolder"
        ];
        elements.forEach(function(element) { document.getElementById(element).style.display = "block"; });
    });

    // Stats Tab
    document.getElementById("stats").addEventListener("click", function() {
        PageTitle.innerHTML = "Stats";
        for (const option of optionList) { document.getElementById(option.holderId).style.display = 'none'; }
        for (const option of otherOptionsList) { document.getElementById(option.holderId).style.display = 'none'; }
        hideLogoVersionAndOpenCloseText()
        hideSkinStuff()

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
        elements.forEach(function(element) { document.getElementById(element).style.display = "block"; });
    });

    // Shortcuts Tab
    document.getElementById("shortcuts").addEventListener("click", function() {
        PageTitle.innerHTML = "Shortcuts";

        for (const option of otherOptionsList) { document.getElementById(option.holderId).style.display = 'none'; }
        for (const option of optionList) { document.getElementById(option.holderId).style.display = 'none'; }
        hideLogoVersionAndOpenCloseText()
        hideSkinStuff()

        const elements = [
            "shortcutDisplayOptionHolder",
            "shortcutOptionHolder",
            "shortcutOptionHolder2",
            "shortcutOptionHolder3",
            "shortcutOptionHolder4",
            "shortcutOptionHolder5",
        ];
        elements.forEach(function(element) { document.getElementById(element).style.display = "block"; });
    });

    // Skin Tab
    document.getElementById("SkinCategory").addEventListener("click", function() {
        PageTitle.innerHTML = `Skins <p style="color: red; font-size: 17px">ATTENTION: Need to restart client to apply skins</p>`;

        for (const option of otherOptionsList) { document.getElementById(option.holderId).style.display = 'none'; }
        for (const option of optionList) { document.getElementById(option.holderId).style.display = 'none'; }
        hideLogoVersionAndOpenCloseText()

        document.getElementById("skincontent").style.display = "flex";

        const elements = [
            "skinCategoryoptionHolder",
            "skinSkyboxDivider",
            "skyboxoptionHolder",
            "skyboxTextureDivider",
            "texturePackOptionHolder",
            "downloadTexturePackOptionHolder",
        ];
        elements.forEach(function(element) { document.getElementById(element).style.display = "block"; });

        // Texturepack links
        texturePackOptionInput.addEventListener("click", function() { require('electron').ipcRenderer.send('openTexturePackFolder'); });
        downloadTexturePackOptionInput.addEventListener("click", function() {
            window.open("https://github.com/jcjms/Quasar-Template/archive/refs/heads/main.zip", "Texturepack Download", "height=500,width=500");
        });
    });
    
    // Wallpaper Tab
    document.getElementById("wallpaper").addEventListener("click", function() {
        PageTitle.innerHTML = 'Wallpaper <p style="color: red; font-size: 17px">ATTENTION: Need to restart client to apply wallpaper</p>'
        for (const option of otherOptionsList) { document.getElementById(option.holderId).style.display = 'none'; }
        for (const option of optionList) { document.getElementById(option.holderId).style.display = 'none'; }
        hideLogoVersionAndOpenCloseText()
        hideSkinStuff()

        document.getElementById("wallpaperoptionHolder").style.display = "block";
        document.getElementById("wallpapercontent").style.display = "block";
    });

    // Aimbot Tab 😱
    document.getElementById("aimbot").addEventListener("click", function() {
        PageTitle.innerHTML = `<iframe width="100%" height="260px" src="https://bean-frog.github.io/yt5s.io-Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20(Official%20Music%20Video).mp4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        for (const option of otherOptionsList) { document.getElementById(option.holderId).style.display = 'none'; }
        for (const option of optionList) { document.getElementById(option.holderId).style.display = 'none'; }
        hideLogoVersionAndOpenCloseText()
        hideSkinStuff()
    });


    
// Checkbox State and function saving to JSON | tried to optimize this part, also tried to use GPT, no luck, please come up with something better
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

    document.getElementById("fpsDisplayCheck").checked = jsonobj.Stats.FPS;
    fpsDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            fpscounter.style.display = "block";
            jsonobj.Stats.FPS = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        
        } else {
            fpscounter.style.display = "none";
            jsonobj.Stats.FPS = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("shortcutDisplayCheck").checked = jsonobj.Stats.Shortcuts;
    shortcutDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            shortcuts.style.display = "block";
            jsonobj.Stats.Shortcuts = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            shortcuts.style.display = "none";
            jsonobj.Stats.Shortcuts = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("platformDisplayCheck").checked = jsonobj.Stats.Platform;
    platformDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            platform.style.display = "block";
            jsonobj.Stats.Platform = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));

        } else {
            platform.style.display = "none";
            jsonobj.Stats.Platform = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("pingDisplayCheck").checked = jsonobj.Stats.Ping;
    pingDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            ping.style.display = "block";
            jsonobj.Stats.Ping = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            ping.style.display = "none";
            jsonobj.Stats.Ping = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("cpuUsageDisplayCheck").checked = jsonobj.Stats.CPU;
    cpuUsageDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            cpu.style.display = "block";
            jsonobj.Stats.CPU = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            cpu.style.display = "none";
            jsonobj.Stats.CPU = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("memoryUsageDisplayCheck").checked = jsonobj.Stats.memory;
    memoryUsageDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            mem.style.display = "block";
            jsonobj.Stats.memory = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            mem.style.display = "none";
            jsonobj.Stats.memory = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("totalMemoryDisplayCheck").checked = jsonobj.Stats.Tmemory;
    totalMemoryDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            totalMem.style.display = "block";
            jsonobj.Stats.Tmemory = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            totalMem.style.display = "none";
            jsonobj.Stats.Tmemory = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("cpuCoresDisplayCheck").checked = jsonobj.Stats.Cores;
    cpuCoresDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            cpuCount.style.display = "block";
            jsonobj.Stats.Cores = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            cpuCount.style.display = "none";
            jsonobj.Stats.Cores = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("uptimeDisplayCheck").checked = jsonobj.Stats.Uptime;
    uptimeDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            uptime.style.display = "block";
            jsonobj.Stats.Uptime = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            uptime.style.display = "none";
            jsonobj.Stats.Uptime = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("WASDDisplayCheck").checked = jsonobj.WASD;
    WASDDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            WASD.style.display = "block";
            jsonobj.WASD = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            WASD.style.display = "none";
            jsonobj.WASD = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("AutoFullscreenCheck").checked = jsonobj.AutoFullscreen;
    AutoFullscreenCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.AutoFullscreen = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.AutoFullscreen = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    require('electron').ipcRenderer.on('toggleFullscreen',(event,data) => {
        document.getElementById("FullscreenCheck").checked = data;
    });

    document.getElementById("FullscreenCheck").checked = jsonobj.Fullscreen;
    FullscreenCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Fullscreen = true;
            require('electron').ipcRenderer.send('makeFullscreen')
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Fullscreen = false;
            require('electron').ipcRenderer.send('disableFullscreen')
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
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



    // hide and show skins on click

    function toggleSkins(displayType) {
        const awpSkins = document.getElementById("awp");
        const ar2Skins = document.getElementById("ar2");
        const vectorSkins = document.getElementById("vector");

        awpSkins.style.display = displayType;
        ar2Skins.style.display = displayType;
        vectorSkins.style.display = displayType;
    }

    document.getElementById('allButton').addEventListener('click', function() {
        const allSkins = document.querySelectorAll('#awp, #ar2, #vector');
        allSkins.forEach((skin) => {
            skin.style.display = "initial";
        });
    });
    document.getElementById('awpButton').addEventListener('click', function() {
        const awpSkins = document.getElementById("awp");
        toggleSkins("none");
        awpSkins.style.display = "initial";
    });
    document.getElementById('ar2Button').addEventListener('click', function() {
        const ar2Skins = document.getElementById("ar2");
        toggleSkins("none");
        ar2Skins.style.display = "initial";
    });
    document.getElementById('vectorButton').addEventListener('click', function() {
        const vectorSkins = document.getElementById("vector");
        toggleSkins("none");
        vectorSkins.style.display = "initial";
    });
    document.getElementById('skinFolderButton').addEventListener('click', function() {
        require('electron').ipcRenderer.send('openSkinFolder')
    });
    

    // skin content + images

    const skincontent = document.createElement("div");
    skincontent.id = "skincontent";
    skincontent.classList.add('skincontent');
    skincontent.style.background = optionColor;

    document.getElementById('rightDiv').appendChild(skincontent);

    var skincontentselector = document.getElementById('skincontent');

    const flexSquare = document.createElement('img');
    flexSquare.style = 'width: 100px; height: 100px; border: 1px solid black; margin: 10px;';

    // create message boxes

    const msgBoxWrapper = document.createElement('div');
    msgBoxWrapper.style = "position: absolute; width: 100%; z-index: 1001; display: flex; justify-content: center; align-items: center; margin-top: 10px;"
    msgBoxWrapper.id = "msgBoxWrapper"
    msgBoxWrapper.innerHTML = `
        <div id="msgBox" style="background: ${msgBoxColor}; text-align: center; z-index: 1001; border-radius: 10px; font-size: 20px; color: white; display: none;">
            <p id="msgBoxText" style='line-height: 2.2; width: 325px; height: 45px; border: 1px solid black;'></p>
        </div>
    `;
    document.body.appendChild(msgBoxWrapper);

    // handle skins
    function skinPathHandlerAwp(src) {
        require('electron').ipcRenderer.send('filepath-awp', src)
    }

    function skinPathHandlerAr2(src) {
        require('electron').ipcRenderer.send('filepath-ar2', src)
    }

    function skinPathHandlerVector(src) {
        require('electron').ipcRenderer.send('filepath-vector', src)
    }

    // get skins -> they all override awp atm fix later

    var skipper = 1;

    function processSkins(skins, handler, id) {
        console.log(skins);
        console.log(skins.length);
        
        for (let i = 0; i < skins.length; i++) {
            let element;
            if (skipper > 0) {
                let flexSquareClone = flexSquare.cloneNode(true);
                flexSquareClone.setAttribute('src', skins[i]);
                flexSquareClone.setAttribute('id', id);
                element = flexSquareClone;
                skipper++;
            } else {
                flexSquare.src = skins[i];
                flexSquare.id = id;
                element = flexSquare;
            }
        
            element.addEventListener('click', function() {
                let src = this.getAttribute('src');
                console.log("The source of the selected skin is: " + src);

                // message
                document.getElementById('msgBoxText').innerHTML = "Skin applied successfully...";
                document.getElementById('msgBox').style.display = "initial";

                setTimeout(function() {
                    document.getElementById('msgBox').style.display = "none";
                }, 2000);

                if (handler == 1) {
                    skinPathHandlerAwp(src);
                } else if (handler == 2) {
                    skinPathHandlerAr2(src);
                } else if (handler == 3) {
                    skinPathHandlerVector(src);
                }
            });
        
            skincontentselector.appendChild(element);
        }
    }
    
    require('electron').ipcRenderer.on('filepaths-awp', (event, message) => {
        processSkins(message, 1, 'awp');
        //skinPathHandlerAwp(src);
    });
    
    require('electron').ipcRenderer.on('filepaths-ar2', (event, message) => {
        processSkins(message, 2, 'ar2');
        //skinPathHandlerAr2(src);
    });
    
    require('electron').ipcRenderer.on('filepaths-vector', (event, message) => {
        processSkins(message, 3, 'vector');
        //skinPathHandlerVector(src);
    });



//Skybox Code

    // handle skyboxes
    function skyboxPathHandler(src) {
        require('electron').ipcRenderer.send('filepath-skybox', src)
    }

    // get skins -> they all override awp atm fix later
    var SkyboxSkipper = 1;
    function processSkyboxes(skyboxes, id) {
        console.log(skyboxes);
        console.log(skyboxes.length);
        
        for (let i = 0; i < skyboxes.length; i++) {
            let element;
            if (skipper > 0) {
                let skyboxflexSquareClone = skyboxflexSquare.cloneNode(true);
                skyboxflexSquareClone.setAttribute('src', skyboxes[i]);
                skyboxflexSquareClone.setAttribute('id', id);
                element = skyboxflexSquareClone;
                SkyboxSkipper++;
            } else {
                skyboxflexSquare.src = skyboxes[i];
                skyboxflexSquare.id = id;
                element = skyboxflexSquare;
            }
        
            element.addEventListener('click', function() {
                let src = this.getAttribute('src');
                console.log("The source of the selected skybox is: " + src);

                // message
                document.getElementById('msgBoxText').innerHTML = "Skybox applied successfully...";
                document.getElementById('msgBox').style.display = "initial";

                setTimeout(function() {
                    document.getElementById('msgBox').style.display = "none";
                }, 2000);

                skyboxPathHandler(src);
            });
            skyboxcontentselector.appendChild(element);
        }
    }
    
    require('electron').ipcRenderer.on('filepaths-skybox', (event, message) => {
        processSkyboxes(message, 'skybox');
    });


    
// FPS-Counter
    let fps = 0;
    let frameCount = 0;
    let startTime = 0;

    function updateFps() {
        frameCount++;
        const elapsedTime = (performance.now() - startTime) / 1000;

        if (elapsedTime > 1) {
            fps = frameCount / elapsedTime;
            startTime = performance.now();
            frameCount = 0;
        }

        document.getElementById('fpscounter').innerHTML = 'FPS: ' + fps.toFixed(2) + "<br>";
        requestAnimationFrame(updateFps);
    }
    updateFps();


    
// PING
    /*function ping2() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/ping', true);
        xhr.send();
        var startTime = performance.now();
        
        xhr.onload = function() {
            var endTime = performance.now();
            var pingTime = endTime - startTime;
            //console.log('Ping time: ' + pingTime + 'ms');
            document.getElementById('ping').innerHTML = "Ping: " + pingTime.toFixed(0) + "ms<br>";
        };
    }
    setInterval(ping2, 1000);*/
    
    setInterval(() => {
        const host = 'deadshot.io';
        
        ping_get.promise.probe(host)
          .then(res => {
            if (res.alive) {
              document.getElementById('ping').innerHTML = "Ping: " + res.time.toFixed(0) + "ms<br>";
            } else {
              console.log('ping error: offline');
            }
          })
        
          .catch(err => console.error(err));        
    }, 1000);

// Chat Shortcuts Code

    var keyContentMap = {
        [one]: [oneValue],
        [two]: [twoValue],
        [three]: [threeValue],
        [four]: [fourValue],
        [five]: [fiveValue],
    };
    console.log(keyContentMap);

    document.addEventListener('keydown', function(event) {
        const chatInput = document.querySelector('input[placeholder="[Enter] to use chat"]');
        const event222 = new KeyboardEvent('keydown', {
          keyCode: 13,
          bubbles: true,
          cancelable: true
        });

        const focusedElement = document.activeElement;
        if (focusedElement.tagName !== 'INPUT' && event.key in keyContentMap) {
            chatInput.value = keyContentMap[event.key];
            chatInput.dispatchEvent(event222);
            chatInput.dispatchEvent(event222);
        }
    });


    
// WASD CODE
    const WASDJS = document.createElement("script");
    WASDJS.innerHTML = `
    const wElement = document.getElementById('w');
    const aElement = document.getElementById('a');
    const sElement = document.getElementById('s');
    const dElement = document.getElementById('d');
    const rElement = document.getElementById('r');
    const shiftElement = document.getElementById('shift');
    const spaceElement = document.getElementById('space');
    
    const keys = {
      ${up.toLowerCase()}: false,
      ${left.toLowerCase()}: false,
      ${down.toLowerCase()}: false,
      ${right.toLowerCase()}: false,
      ${reload.toLowerCase()}: false,
      ${crouch.toLowerCase()}: false
    };

    document.addEventListener('keydown', event => {
      const key = event.key.toLowerCase();
      if (key in keys) {
        keys[key] = true;
        updateElements();
      }
    });
    
    document.addEventListener('keyup', event => {
      const key = event.key.toLowerCase();
      if (key in keys) {
        keys[key] = false;
        updateElements();
      }
    });
    
    function updateElements() {
      wElement.style.background = keys.${up.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
      aElement.style.background = keys.${left.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
      sElement.style.background = keys.${down.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
      dElement.style.background = keys.${right.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
      rElement.style.background = keys.${reload.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
      shiftElement.style.background = keys.${crouch.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
    };
    
    document.addEventListener('keydown', (event) => {
        if (event.code === '${space}') { spaceElement.style.background = '#232429'; }
    });
    document.addEventListener('keyup', (event) => {
        if (event.code === '${space}') { spaceElement.style.background = 'rgba(255, 255, 255, .2)'; }
    });
    `;
    
    document.getElementsByTagName('head')[0].appendChild(WASDJS);



});
});
