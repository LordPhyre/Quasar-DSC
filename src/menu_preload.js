const fs = require('fs');
const {ipcRenderer} = require('electron');

function updateJsonObj(key, value) {
    jsonobj[key] = value;
    fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
}

document.addEventListener("DOMContentLoaded", function() { 

//Receive user datapath and save as variable
require('electron').ipcRenderer.on('SendUserData', (event, message, client_version) => {
    const jsonpath = message;
    console.log(jsonpath);

    // Parse the contents of the file into a JavaScript object
    let jsonobj = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));
    console.log(jsonobj);

    // Menu Colors
    var menuHeaderColor = jsonobj.Colors.menuHeaderColor; //"#2a394f";
    var behindOptionsColor = jsonobj.Colors.behindOptionsColor; //"#2a394f";
    var skinButtonColor = jsonobj.Colors.skinButtonColor; //"#364760";
    var skinButtonHoverColor = jsonobj.Colors.skinButtonHoverColor; //"#0798fc";
    var skinCloseColor = jsonobj.Colors.skinCloseColor; //"#ffffff00";
    var optionColor = jsonobj.Colors.optionColor; //"#364760";
    var opacity = jsonobj.Colors.opacity; //0.95;
    var skinWrapperBorderRadius = jsonobj.Colors.skinWrapperBorderRadius; //"10";
    var msgBoxColor = jsonobj.Colors.msgBoxColor; //"#2a394f";
    
    //// Styling and CSS
    let skincss = document.createElement('style');
    skincss.innerText = "@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif}body{overflow-y: hidden;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}.titlebar{-webkit-user-select: none;-webkit-app-region: drag;}.skinwrapper{position:absolute;top:50%;left:50%;max-width:750px;width:100%;background:#232429;/* if I add menuHeaderColor it spawns at a different location lmao, but the color has to stay like that, else the menu is see trough under header*/transform:translate(-50%,-50%);border:solid 1px #000;color:#fff;height:335px;}.skinwrapper header{font-size:23px;font-weight:500;padding:17px 30px;border-bottom:1px solid #000;text-align:center;border-top-left-radius: 10px;border-top-right-radius: 10px;}.skinwrapper header.skinactive{cursor:move;user-select:none;}.skinwrapper .skincontent{display:flex;flex-direction:wrap;flex-wrap:wrap;justify-content:center;}.skincontent .title{margin:15px 0;font-size:29px;font-weight:500}.skincontent p{font-size:16px;text-align:center;display:flex}.skinbutton{width:100%;height:48px;background-color:" + skinButtonColor + ";border:none;color:#fff;font-size:20px}.skinbutton:hover{background-color:" + skinButtonHoverColor + "}.skinclose{color:grey;position:absolute;top:0;right:0;margin-right:15px;margin-top:-6px;background-color:" + skinCloseColor + ";border:none;font-size:35px}.skinclose:hover{color:#fff}p{font-size:20px}input[type=text]{float:right;margin:14px 25px 10px 0;font-weight:700;color:grey}input[type=range]{float:right;margin:16px 20px 10px 0}input[type=checkbox]{float:right;transform:scale(2);margin:14px 25px 5px 0;width:35px;font-weight:700;color:grey;}input[type=button]{float:right;margin:14px 25px 10px 0;}.optiondescr{float:left;margin:10px 0 10px 20px}.optionholder{background-color:" + optionColor + "; display: inline-block}hr{width:100%;border:.1px solid rgb(255, 27, 8, 0);}/*select{float:right;margin:14px 25px 10px 0;width:50px}*/.skinCategory:hover{background-color:#0798fc}/* doesn't work lol*/";
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
    
    //// Constructing Menu Base
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
            <div id="skinCategoryoptionHolder" class="optionholder">
                <div style="display: flex; justify-content: center;"> <!-- use classes later -->
                    <button class="skinCategory" id="allButton" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px;">All</button>
                    <button class="skinCategory" id="awpButton" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px;">AWP</button>
                    <button class="skinCategory" id="ar2Button" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px;">AR2</button>
                    <button class="skinCategory" id="vectorButton" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px;">Vector</button>
                    <button class="skinCategory" id="skinFolderButton" style="padding: 10px 12.5px 10px 12.5px;background-color: #25272e;border: none;color: white;font-size: 20px;">| <span style="text-decoration: underline; cursor: pointer;">Folder</span></button>
                </div>
            </div> 
            <div id="skincontent" class="skincontent" style="background: ${optionColor};"></div>
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
        </div>
        </div>
    `;
    document.body.appendChild(skinWrapper);
    
    
    // Make Menu Draggable
    dragElement(document.getElementById("skinWrapper"));
    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        document.getElementById("skinheader").onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = elmnt.offsetTop - pos2 + "px";
            elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    
    // Logo
    const logoFont = document.createElement('link')
    logoFont.href = "https://fonts.cdnfonts.com/css/aquire";
    logoFont.rel = "stylesheet";
    document.getElementsByTagName('head')[0].appendChild(logoFont);
    
    
    // 1234567
    const mainDiv = document.getElementById('mainDiv');
    const leftDiv = document.getElementById('leftDiv');
    const rightDiv = document.getElementById('rightDiv');
    const PageTitle = document.getElementById('PageTitle');
    const logo = document.getElementById('logo');
    const version = document.getElementById('version');
    const openCloseText = document.getElementById('openCloseText');

    
    // Menu Catagories
    const CatagoryList = [
        { text: 'Home', id: 'HomePage' },
        { text: 'General', id: 'general' },
        { text: 'Stats', id: 'stats' },
        { text: 'Shortcuts', id: 'shortcuts' },
        { text: 'Skins', id: 'SkinCategory' },
        //{ text: 'Texture Packs', id: 'texturepacks' },
        //{ text: 'Skyboxes', id: 'skyboxes' },
        { text: 'Wallpaper', id: 'wallpaper' },
        { text: 'Aimbot', id: 'aimbot' },
        //{ text: 'Color Settings', id: 'colorsettings' },
    ];

    CatagoryList.forEach(Catagory => {
        const catagoryButton = document.createElement('button');
        catagoryButton.className = 'skinbutton';
        catagoryButton.innerText = Catagory.text;
        catagoryButton.id = Catagory.id;
        leftDiv.appendChild(catagoryButton);
    });
    
    
    //// Create all the option holders and checkboxes
    
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
        optionHolder.classList.add('optionholder');
        optionHolder.id = option.holderId;
        
        // sub-option title
        const optionDescr = document.createElement('p');
        optionDescr.className = 'optiondescr';
        optionDescr.innerText = option.descrText;
        
        // checkbox
        const optionCheck = document.createElement('input');
        optionCheck.type = 'checkbox';
        optionCheck.id = option.checkId;
        optionCheck.style.float = "right";
        
        // putting the elements together
        // I am using an <hr> bc it completely breaks without
        optionHolder.innerHTML = `
            ${optionDescr.outerHTML}
            ${optionCheck.outerHTML}
            <hr>
        `;

        rightDiv.appendChild(optionHolder);
    }
    
    const options = [
        "massCheckUncheckStatsOptionHolder",
        "fpsDisplayOptionHolder", 
        "pingDisplayOptionHolder", 
        "shortcutDisplayOptionHolder", 
        "skincontent", 
        "skinSkyboxDivider",
        "skyboxTextureDivider",
        "skyboxcontent", 
        "optionColorOptionHolder", 
        "behindOptionsColorOptionHolder", 
        "menuHeaderColorOptionHolder",
        "skinButtonColorOptionHolder", 
        "opacityOptionHolder", 
        "windowBorderOptionHolder", 
        "skinCategoryoptionHolder", 
        "skyboxoptionHolder", 
        "wallpaperoptionHolder",
        "wallpapercontent",
        "shortcutOptionHolder", 
        "shortcutOptionHolder2", 
        "shortcutOptionHolder3", 
        "shortcutOptionHolder4", 
        "shortcutOptionHolder5", 
        "platformDisplayOptionHolder", 
        "cpuUsageDisplayOptionHolder", 
        "memoryUsageDisplayOptionHolder", 
        "totalMemoryDisplayOptionHolder", 
        "cpuCoresDisplayOptionHolder", 
        "uptimeDisplayOptionHolder", 
        "texturePackOptionHolder", 
        "downloadTexturePackOptionHolder", 
        "RPCTextOptionHolder",
        "WASDDisplayOptionHolder",
        "AutoFullscreenOptionHolder", 
        "FullscreenOptionHolder",
        "resetColorOptionHolder",
        "debugOptionHolder",
        "RPCDisplayOptionHolder",
        "SplashOptionHolder",
    ];
    
    function hideLogoVersionAndOpenCloseText() {
        logo.style.display = "none";
        version.style.display = "none";
        openCloseText.style.display = "none";
    }

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
        } else if (id == "resetColorOptionHolder") {
            optionInput.type = 'button';
            optionInput.value = 'Reset Color';
            optionInput.style.width = '110px';
        } else {
            optionInput.type = 'text';
            optionInput.style.width = '100px';
        }
        if (id == 'opacityOptionHolder') {
            optionInput.placeholder = 'e.g. 0.95';
        } else if (id == 'windowBorderOptionHolder') {
            optionInput.placeholder = 'e.g. 10';
        } else if (id.includes('shortcutOptionHolder')) {
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
        } else {
            optionInput.placeholder = 'e.g. #2a394f';
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
    createOptionHolder('resetColorOptionHolder', 'Reset Color', 'resetColorOptionInput');

    createOptionHolder('menuHeaderColorOptionHolder', 'Header Color', 'menuHeaderColorOptionInput');
    createOptionHolder('optionColorOptionHolder', 'Option Color', 'optionColorOptionInput');
    createOptionHolder('behindOptionsColorOptionHolder', 'Behind-Options Color', 'behindOptionsColorOptionInput');
    createOptionHolder('skinButtonColorOptionHolder', 'Skin Button Color', 'skinButtonColorOptionInput');
    createOptionHolder('opacityOptionHolder', 'Opacity', 'opacityOptionInput');
    createOptionHolder('windowBorderOptionHolder', 'Window Border', 'windowBorderOptionInput');
    
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
    
    //// Now use the optionholders created
    
    // Home page, show no options
    document.getElementById("HomePage").addEventListener("click", function() {
        PageTitle.innerHTML = "Home";
        options.forEach(option => { document.getElementById(option).style.display = "none"; });
        
        logo.style.display = "block";
        version.style.display = "block";
        openCloseText.style.display = "block";
    });

    // General Tab
    document.getElementById("general").addEventListener("click", function() {
        PageTitle.innerHTML = "General";

        options.forEach(option => { document.getElementById(option).style.display = "none"; });
        hideLogoVersionAndOpenCloseText()

        const elements = [
            "WASDDisplayOptionHolder",
            "AutoFullscreenOptionHolder",
            "FullscreenOptionHolder",
            "RPCDisplayOptionHolder",
            "RPCTextOptionHolder",
            "SplashOptionHolder",
            "debugOptionHolder"
        ];

        elements.forEach(function(element) { document.getElementById(element).style.display = "block"; });
    });

    // Stats Tab
    document.getElementById("stats").addEventListener("click", function() {
        PageTitle.innerHTML = "Stats";

        options.forEach(option => { document.getElementById(option).style.display = "none"; });
        hideLogoVersionAndOpenCloseText()

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

        options.forEach(option => { document.getElementById(option).style.display = "none"; });
        hideLogoVersionAndOpenCloseText()

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
        //PageTitle.innerHTML = 'Skyboxes <p style="color: red; font-size: 17px">ATTENTION: Need to restart client to apply skyboxes</p>'
        //PageTitle.innerHTML = 'Texture Packs'

        options.forEach(option => { document.getElementById(option).style.display = "none"; });
        hideLogoVersionAndOpenCloseText()

        document.getElementById("skinCategoryoptionHolder").style.display = "block";
        document.getElementById("skincontent").style.display = "flex";
        document.getElementById("skinSkyboxDivider").style.display = "block";
        document.getElementById("skyboxoptionHolder").style.display = "block";
        document.getElementById("skyboxcontent").style.display = "flex";
        document.getElementById("skyboxTextureDivider").style.display = "block";
        document.getElementById("texturePackOptionHolder").style.display = "block";
        document.getElementById("downloadTexturePackOptionHolder").style.display = "block";
    });
    
    // Texturepacks Tab
    /*document.getElementById("texturepacks").addEventListener("click", function() {
        PageTitle.innerHTML = 'Texture Packs'
        
        options.forEach(option => { document.getElementById(option).style.display = "none"; });
        hideLogoVersionAndOpenCloseText()

        document.getElementById("texturePackOptionHolder").style.display = "block";
        document.getElementById("downloadTexturePackOptionHolder").style.display = "block";
    });*/
    
    // Texturepack links
    texturePackOptionInput.addEventListener("click", function() {
        require('electron').ipcRenderer.send('openTexturePackFolder');
    });
    downloadTexturePackOptionInput.addEventListener("click", function() {
        window.open("https://github.com/jcjms/Quasar-Template/archive/refs/heads/main.zip", "Texturepack Download", "height=500,width=500");
    });
    
    // Skybox Tab
    /*document.getElementById("skyboxes").addEventListener("click", function() {
        PageTitle.innerHTML = 'Skyboxes <p style="color: red; font-size: 17px">ATTENTION: Need to restart client to apply skyboxes</p>'
        
        options.forEach(option => { document.getElementById(option).style.display = "none"; });
        hideLogoVersionAndOpenCloseText()

        document.getElementById("skyboxoptionHolder").style.display = "block";
        document.getElementById("skyboxcontent").style.display = "flex";
    });*/

    // Wallpaper Tab
    document.getElementById("wallpaper").addEventListener("click", function() {
        PageTitle.innerHTML = 'Wallpaper <p style="color: red; font-size: 17px">ATTENTION: Need to restart client to apply wallpaper</p>'
        
        options.forEach(option => { document.getElementById(option).style.display = "none"; });
        hideLogoVersionAndOpenCloseText()

        document.getElementById("wallpaperoptionHolder").style.display = "block";
        document.getElementById("wallpapercontent").style.display = "block";
    });

    // Aimbot Tab 😱
    document.getElementById("aimbot").addEventListener("click", function() {
        PageTitle.innerHTML = `<iframe width="100%" height="90%" src="https://bean-frog.github.io/yt5s.io-Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20(Official%20Music%20Video).mp4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        
        options.forEach(option => { document.getElementById(option).style.display = "none"; });
        hideLogoVersionAndOpenCloseText()
    });

    // Colors Tab
    /*document.getElementById("colorsettings").addEventListener("click", function() {
        PageTitle.innerHTML = "Color Settings";
        
        options.forEach(option => { document.getElementById(option).style.display = "none"; });
        hideLogoVersionAndOpenCloseText()

        const elements = [
            "optionColorOptionHolder",
            "menuHeaderColorOptionHolder",
            "behindOptionsColorOptionHolder",
            "skinButtonColorOptionHolder",
            "opacityOptionHolder",
            "windowBorderOptionHolder",
            "resetColorOptionHolder",
        ];
        elements.forEach(function(element) { document.getElementById(element).style.display = "block"; });
    });*/

    // If checkboxes interacted with, do stuff
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

    // Now fr, When stats checkboxes change, do stuff
    const statsCheckboxes = [
      { element: document.getElementById("fpsDisplayCheck"), key: "Stats.FPS" },
      { element: document.getElementById("shortcutDisplayCheck"), key: "Stats.Shortcuts" },
      { element: document.getElementById("platformDisplayCheck"), key: "Stats.Platform" },
      { element: document.getElementById("pingDisplayCheck"), key: "Stats.Ping" },
      { element: document.getElementById("cpuUsageDisplayCheck"), key: "Stats.CPU" },
      { element: document.getElementById("memoryUsageDisplayCheck"), key: "Stats.memory" },
      { element: document.getElementById("totalMemoryDisplayCheck"), key: "Stats.Tmemory" },
      { element: document.getElementById("cpuCoresDisplayCheck"), key: "Stats.Cores" },
      { element: document.getElementById("uptimeDisplayCheck"), key: "Stats.Uptime" },
      { element: document.getElementById("WASDDisplayCheck"), key: "WASD" }
    ];
    
    function addCheckboxEventListener({ element, key }) {
      element.checked = jsonobj[key];
      element.addEventListener("change", (e) => {
        updateJsonObj(key, e.target.checked);
      });
    }
    statsCheckboxes.forEach(addCheckboxEventListener);
    

    // More Checkboxes with extra bits
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

    document.getElementById("FullscreenCheck").checked = jsonobj.Fullscreen;
    FullscreenCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Fullscreen = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Fullscreen = false;
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

    document.getElementById("RPCCheck").checked = jsonobj.RPC.show;
    RPCCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.RPC.show = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.RPC.show = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("OldSplashCheck").checked = !jsonobj.Splash.new;
    OldSplashCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Splash.new = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Splash.new = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });
    
    // create message box for later use
    const msgBoxWrapper = document.createElement('div');
    msgBoxWrapper.style = "position: absolute; width: 100%; z-index: 1001; display: flex; justify-content: center; align-items: center; margin-top: 10px;"
    msgBoxWrapper.id = "msgBoxWrapper"
    msgBoxWrapper.innerHTML = `
        <div id="msgBox" style="background: ${msgBoxColor}; text-align: center; z-index: 1001; border-radius: 10px; font-size: 20px; color: white; display: none;">
            <p id="msgBoxText" style='line-height: 2.2; width: 325px; height: 45px; border: 1px solid black;'></p>
        </div>
    `;
    
    document.body.appendChild(msgBoxWrapper);
    

    // Skin-Preview loading
    
    // hide and show skins on click (menu selection)
    function toggleSkins(displayType) {
        // don't even consider taking them outside of here
        const awpSkins = document.querySelectorAll("#awp");
        const ar2Skins = document.querySelectorAll("#ar2");
        const vectorSkins = document.querySelectorAll("#vector");

        // optimise this later by passing in the skin type that needs to be shown etc, no time rn
        awpSkins.forEach(function(skin) {
            skin.style.display = displayType;
        });
        ar2Skins.forEach(function(skin) {
            skin.style.display = displayType;
        });
        vectorSkins.forEach(function(skin) {
            skin.style.display = displayType;
        });
    }

    // set which button shows which skins
    document.getElementById('allButton').addEventListener('click', function() {
        const allSkins = document.querySelectorAll('#awp, #ar2, #vector');
        allSkins.forEach((skin) => {
            skin.style.display = "initial";
        });
    });
    document.getElementById('awpButton').addEventListener('click', function() {
        const awpSkins = document.querySelectorAll("#awp");
        toggleSkins("none");
        awpSkins.forEach(function(skin) {
            skin.style.display = "initial";
        });
    });
    document.getElementById('ar2Button').addEventListener('click', function() {
        const ar2Skins = document.querySelectorAll("#ar2");
        toggleSkins("none");
        ar2Skins.forEach(function(skin) {
            skin.style.display = "initial";
        });
    });
    document.getElementById('vectorButton').addEventListener('click', function() {
        const vectorSkins = document.querySelectorAll("#vector");
        toggleSkins("none");
        vectorSkins.forEach(function(skin) {
            skin.style.display = "initial";
        });
    });
    // this one is pretty self explaining
    document.getElementById('skinFolderButton').addEventListener('click', function() {
        require('electron').ipcRenderer.send('openSkinFolder')
    });

    // skin preview images are getting created here
    const skincontent = document.getElementById("skincontent");

    // handle skins | if you click on a skin this is called
    // it tells the main.js which skin needs to be placed into the swapper
    function skinPathHandlerAwp(src) {
        require('electron').ipcRenderer.send('filepath-awp', src)
    }
    function skinPathHandlerAr2(src) {
        require('electron').ipcRenderer.send('filepath-ar2', src)
    }
    function skinPathHandlerVector(src) {
        require('electron').ipcRenderer.send('filepath-vector', src)
    }

    // create skin elements

    // this is the base of each skin element (don't ask about the name)
    const flexSquare = document.createElement('img');
    flexSquare.style = 'width: 100px; height: 100px; border: 1px solid black; margin: 10px;';

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

                // display message box
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
            skincontent.appendChild(element);
        }
    }
    
    // each skin path is received here, then the function above is called
    // to create the different skin elements. Message (skins) is an array that contains
    // each skin path with that specific type. The number (handler) defines the type of 
    // the skins and the id also (don't ask why, I probably had my reasons).
    require('electron').ipcRenderer.on('filepaths-awp', (event, message) => {
        processSkins(message, 1, 'awp');
    });
    require('electron').ipcRenderer.on('filepaths-ar2', (event, message) => {
        processSkins(message, 2, 'ar2');
    });
    require('electron').ipcRenderer.on('filepaths-vector', (event, message) => {
        processSkins(message, 3, 'vector');
    });

    
    // Skybox-Preview loading | it works the same as the skins above
    // maybe I could merge them one day... or I just let it be... idk

    const skyboxoptionHolder = document.getElementById("skyboxoptionHolder");

    document.getElementById('skyboxFolderButton').addEventListener('click', function() {
        require('electron').ipcRenderer.send('openSkyboxFolder')
    });

    // skybox content + images

    const skyboxcontent = document.createElement("div");
    skyboxcontent.id = "skyboxcontent";
    skyboxcontent.classList.add('skyboxcontent');
    skyboxcontent.style.background = optionColor;

    //document.getElementById('rightDiv').appendChild(skyboxcontent);
    document.getElementById('skyboxoptionHolder').append(skyboxcontent);

    var skyboxcontentselector = document.getElementById('skyboxcontent');

    const skyboxflexSquare = document.createElement('img');
    skyboxflexSquare.style = 'width: 100px; height: 100px; border: 1px solid black; margin: 10px;';

    // handle skyboxes
    function skyboxPathHandler(src) {
        require('electron').ipcRenderer.send('filepath-skybox', src)
    }

    // get skyboxes

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


    // wallpaper-DISPLAY

    const wallpaperoptionHolder = document.getElementById("wallpaperoptionHolder");

    document.getElementById('wallpaperFolderButton').addEventListener('click', function() {
        require('electron').ipcRenderer.send('openWallpaperFolder')
    });

    // wallpaper content + images

    const wallpapercontent = document.createElement("div");
    wallpapercontent.id = "wallpapercontent";
    wallpapercontent.classList.add('wallpapercontent'); // if breaks try skincontent
    wallpapercontent.style.background = optionColor;

    document.getElementById('rightDiv').appendChild(wallpapercontent);

    var wallpapercontentselector = document.getElementById('wallpapercontent');

    const wallpaperflexSquare = document.createElement('img');
    wallpaperflexSquare.style = 'width: 100px; height: 100px; border: 1px solid black; margin: 10px;';

    // handle wallpaper
    function wallpaperPathHandler(src) {
        require('electron').ipcRenderer.send('filepath-wallpaper', src)
    }

    // get wallpaper

    var wallpaperSkipper = 1;

    function processWallpapers(wallpapers, id) {
        console.log(wallpapers);
        console.log(wallpapers.length);
        
        for (let i = 0; i < wallpapers.length; i++) {
            let element;
            if (skipper > 0) {
                let wallpaperflexSquareClone = wallpaperflexSquare.cloneNode(true);
                wallpaperflexSquareClone.setAttribute('src', wallpapers[i]);
                wallpaperflexSquareClone.setAttribute('id', id);
                element = wallpaperflexSquareClone;
                wallpaperSkipper++;
            } else {
                wallpaperflexSquare.src = wallpapers[i];
                wallpaperflexSquare.id = id;
                element = wallpaperflexSquare;
            }
        
            element.addEventListener('click', function() {
                let src = this.getAttribute('src');
                console.log("The source of the selected wallpaper is: " + src);

                // message
                document.getElementById('msgBoxText').innerHTML = "Wallpaper applied successfully...";
                document.getElementById('msgBox').style.display = "initial";

                setTimeout(function() {
                    document.getElementById('msgBox').style.display = "none";
                }, 2000);

                wallpaperPathHandler(src);
            });
            wallpapercontentselector.appendChild(element);
        }
    }
    
    require('electron').ipcRenderer.on('filepaths-wallpaper', (event, message) => {
        processWallpapers(message, 'wallpaper');
    });

    // customisation setting values
    menuHeaderColorOptionInput.value = jsonobj.Colors.menuHeaderColor;
    behindOptionsColorOptionInput.value = jsonobj.Colors.behindOptionsColor;
    skinButtonColorOptionInput.value = jsonobj.Colors.skinButtonColor;
    optionColorOptionInput.value = jsonobj.Colors.optionColor;
    opacityOptionInput.value = jsonobj.Colors.opacity;
    windowBorderOptionInput.value = jsonobj.Colors.skinWrapperBorderRadius;

    // get the shortcut values
    const one = document.getElementsByName('shortcutOptionInput')[0].id;
    const two = document.getElementsByName('shortcutOptionInput2')[0].id;
    const three = document.getElementsByName('shortcutOptionInput3')[0].id;
    const four = document.getElementsByName('shortcutOptionInput4')[0].id;
    const five = document.getElementsByName('shortcutOptionInput5')[0].id;

    var oneValue = document.getElementsByName('shortcutOptionInput')[0].value;
    var twoValue = document.getElementsByName('shortcutOptionInput2')[0].value;
    var threeValue = document.getElementsByName('shortcutOptionInput3')[0].value;
    var fourValue = document.getElementsByName('shortcutOptionInput4')[0].value;
    var fiveValue = document.getElementsByName('shortcutOptionInput5')[0].value;

    // shortcut initialisation

    var keyContentMap = {
        [one]: [oneValue],
        [two]: [twoValue],
        [three]: [threeValue],
        [four]: [fourValue],
        [five]: [fiveValue],
    };

    console.log(keyContentMap);

    const inputs = ['shortcutOptionInput', 'shortcutOptionInput2', 'shortcutOptionInput3', 'shortcutOptionInput4', 'shortcutOptionInput5'];

    // shortcut creation
    inputs.forEach((input, index) => {
    const element = document.getElementsByName(input)[0];
        element.addEventListener('change', function() {
            const variableName = `${input.substring(0, 1).toLowerCase()}${input.substring(1)}`; //shortcutOptionInput
            window[variableName] = element.id;
            window[`${variableName}Value`] = element.value;
            console.log(element.value);

            if (element.id == 1) {
                //oneValue = element.value;
            } else if (element.id == 2) {
                twoValue = element.value;
                jsonobj.Shortcuts.two = element.value;
            } else if (element.id == 3) {
                threeValue = element.value;
                jsonobj.Shortcuts.three = element.value;
            } else if (element.id == 4) {
                fourValue = element.value;
                jsonobj.Shortcuts.four = element.value;
            } else if (element.id == 5) {
                fiveValue = element.value;
                jsonobj.Shortcuts.five = element.value;
            }

            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));

            keyContentMap = {
                [one]: [oneValue],
                [two]: [twoValue],
                [three]: [threeValue],
                [four]: [fourValue],
                [five]: [fiveValue],
            };

            console.log(keyContentMap);
        });
    });

    // Color Settings and updating/saving color value
    function updateColorValue(element, value, jsonKey, cssProperty) {
      const jsonValue = element.value;
      jsonobj.Colors[jsonKey] = jsonValue;
      fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
      console.log(jsonValue);
      document.querySelector(cssProperty).style.background = jsonValue;
    }

    menuHeaderColorOptionInput.addEventListener('change', function() {
      updateColorValue(menuHeaderColorOptionInput, menuHeaderColor, 'menuHeaderColor', '#skinHeader');
    });

    optionColorOptionInput.addEventListener('change', function() {
      updateColorValue(optionColorOptionInput, optionColor, 'optionColor', '.optionholder');
    });

    behindOptionsColorOptionInput.addEventListener('change', function() {
      updateColorValue(behindOptionsColorOptionInput, behindOptionsColor, 'behindOptionsColor', '#mainDiv');
    });

    skinButtonColorOptionInput.addEventListener('change', function() {
      updateColorValue(skinButtonColorOptionInput, skinButtonColor, 'skinButtonColor', '.skinbutton');
    });

    opacityOptionInput.addEventListener('change', function() {
      const opacityValue = opacityOptionInput.value;
      jsonobj.Colors.opacity = opacityValue;
      fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
      console.log(opacityValue);
      skinWrapper.style.opacity = opacityValue;
    });

    windowBorderOptionInput.addEventListener('change', function() {
      const borderRadiusValue = windowBorderOptionInput.value;
      jsonobj.Colors.skinWrapperBorderRadius = borderRadiusValue;
      fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
      console.log(borderRadiusValue);
      skinWrapper.style.borderRadius = borderRadiusValue + 'px';
    });

    resetColorOptionInput.addEventListener("click", function() {
    
        var menuHeaderColor = "#232429";
        skinHeader.style.background = menuHeaderColor;
        jsonobj.Colors.menuHeaderColor = menuHeaderColor;
        var optionColor = "#25272e";
        document.querySelectorAll('.optionholder').forEach(element => { element.style.background = optionColor; });
        jsonobj.Colors.optionColor = optionColor;
        var behindOptionsColor = "#232429";
        mainDiv.style.background = behindOptionsColor;
        jsonobj.Colors.behindOptionsColor = behindOptionsColor;
        var skinButtonColor = "#222327";
        var skinbuttons = document.getElementsByClassName("skinbutton");
        for (var i = 0; i < skinbuttons.length; i++) { skinbuttons[i].style.backgroundColor = skinButtonColor; }
        jsonobj.Colors.skinButtonColor = skinButtonColor;
        var opacity = 1;
        skinWrapper.style.opacity = opacity;
        jsonobj.Colors.opacity = opacity;
        var skinWrapperBorderRadius = "10";
        skinWrapper.style.borderRadius = skinWrapperBorderRadius + "px";
        jsonobj.Colors.skinWrapperBorderRadius = skinWrapperBorderRadius;
    
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
    });

    rpcOptionInput.addEventListener('change', function() {
        jsonobj.RPC.text = rpcOptionInput.value;
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        console.log(skinWrapperBorderRadius);
    });

    // On start show no options | only works down here idk why tbh
    options.forEach(option => {
        document.getElementById(option).style.display = "none";
    });
});
});