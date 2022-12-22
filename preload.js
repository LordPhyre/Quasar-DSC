const { readFileSync } = require('fs'); // just in case
const { ipcMain } = require('electron');
//window.$ = window.jQuery = require('./node_modules/jquery/dist/jquery.min.js');
document.addEventListener("DOMContentLoaded", function() {

    // colors

    var menuHeaderColor = "#2a394f";
    var behindOptionsColor = "#2a394f";
    var skinButtonColor = "#364760";
    var skinButtonHoverColor = "#0798fc";
    var skinCloseColor = "#ffffff00";
    var optionColor = "#364760";
    var opacity = 0.95;
    var skinWrapperBorderRadius = "10px";

    // shortcutdisplay

    const shortcuts = document.createElement("h2");
    shortcuts.innerHTML = "[1] GG  [2] hello guys  [3] show  [4] hide";
    shortcuts.type = "submit";
    shortcuts.id = "shortcutsdisplay";
    shortcuts.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 4px; margin-left: 7.5px; outline: none; border: none; font-size: 100%; display: none;";
    document.body.appendChild(shortcuts);

    // draggable window | make all of this easier with modules -> https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file

    // wrapper
    const skinWrapper = document.createElement('div');
    skinWrapper.className = 'skinwrapper';
    skinWrapper.id = "skinWrapper";
    skinWrapper.style = "::-webkit-scrollbar{border:1px solid #d5d5d5};opacity:" + opacity + ";border-radius: " + skinWrapperBorderRadius + "px;";
    document.body.appendChild(skinWrapper);

    // title
    const skinHeader = document.createElement('header');
    skinHeader.id = 'skinheader';
    skinHeader.innerText = 'Main Menu';
    skinHeader.style.background = menuHeaderColor;
    document.getElementById('skinWrapper').appendChild(skinHeader);

    // background & container
    const mainDiv = document.createElement('div');
    mainDiv.style.backgroundColor = behindOptionsColor; // that thing behid the options '#2a394f'
    mainDiv.id = "mainDiv";
    document.getElementById('skinWrapper').appendChild(mainDiv);

    // left part of the menu (the buttons)
    const leftDiv = document.createElement('div');
    leftDiv.style.float = 'left';
    leftDiv.style.width = '40%';
    leftDiv.style.height = '263px';
    leftDiv.style.overflow = 'scroll';
    leftDiv.style.overflowX = 'hidden';
    leftDiv.style.overflowY = 'auto';
    leftDiv.id = "leftDiv";
    document.getElementById('mainDiv').appendChild(leftDiv);

    // close button
    const skinCloseButton = document.createElement('button');
    skinCloseButton.className = 'skinclose';
    skinCloseButton.innerText = '_';
    skinCloseButton.id = 'skinclose';
    document.getElementById('skinWrapper').appendChild(skinCloseButton);

    // some juicy js and css
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "const skinwrapper1=document.querySelector('.skinwrapper'),skinheader1=document.getElementById('skinheader');function onDrag({movementX:e,movementY:n}){let s=window.getComputedStyle(skinwrapper1),t=parseInt(s.left),r=parseInt(s.top);skinwrapper1.style.left=`${t+e}px`,skinwrapper1.style.top=`${r+n}px`}skinheader1.addEventListener('mousedown',()=>{skinheader1.classList.add('skinactive'),skinheader1.addEventListener('mousemove',onDrag)}),document.addEventListener('mouseup',()=>{skinheader1.classList.remove('skinactive'),skinheader1.removeEventListener('mousemove',onDrag)});document.getElementById('skinclose').addEventListener('click',function(){document.getElementById('skinWrapper').style.display='none'});";
    document.getElementsByTagName('head')[0].appendChild(script);

    // css
    let skincss = document.createElement('style');
    skincss.innerText = "@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';*{z-index:1000;margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif}.skinwrapper{position:absolute;top:50%;left:50%;max-width:750px;width:100%;background:#2a394f;/*has to stay like that, else the menu is see trough under header*/transform:translate(-50%,-50%);border:solid 1px #000;color:#fff;height:335px;}.skinwrapper header{font-size:23px;font-weight:500;padding:17px 30px;border-bottom:1px solid #000;text-align:center;border-top-left-radius: 10px;border-top-right-radius: 10px;}.skinwrapper header.skinactive{cursor:move;user-select:none;}.skinwrapper .skincontent{display:flex;flex-direction:wrap;flex-wrap:wrap;justify-content:center;background:#2a394f}.skincontent .title{margin:15px 0;font-size:29px;font-weight:500}.skincontent p{font-size:16px;text-align:center;display:flex}.skinbutton{width:100%;height:50px;background-color:" + skinButtonColor + ";border:none;color:#fff;font-size:20px}.skinbutton:hover{background-color:" + skinButtonHoverColor + "}.skinclose{color:grey;position:absolute;top:0;right:0;margin-right:15px;margin-top:-6px;background-color:" + skinCloseColor + ";border:none;font-size:35px}.skinclose:hover{color:#fff}p{font-size:20px}input[type=text]{float:right;margin:14px 25px 10px 0;font-weight:700;color:grey}input[type=range]{float:right;margin:16px 20px 10px 0}input[type=checkbox]{float:right;transform:scale(2);margin:14px 25px 5px 0;width:35px;font-weight:700;color:grey;}.optiondescr{float:left;margin:10px 0 10px 20px}.optionholder{background-color:" + optionColor + "}hr{width:100%;border:.1px solid #000}select{float:right;margin:14px 25px 10px 0;width:50px}";
    document.head.appendChild(skincss);


    // menu buttons

    const buttonData = [
        { text: 'All Options', id: 'allOptions' },
        { text: 'General', id: 'general' },
        { text: 'Shortcuts', id: 'shortcuts' },
        { text: 'Skins', id: 'skinmenu' },
        { text: 'Aimbot', id: 'aimbot' },
        { text: 'Color Settings', id: 'colorsettings' },
        { text: 'Default Settings', id: 'defaultsettings' }
    ];
    
    const leftDivReference = document.getElementById('leftDiv');
    
    buttonData.forEach(button => {
        const optionButton = document.createElement('button');
        optionButton.className = 'skinbutton';
        optionButton.innerText = button.text;
        optionButton.id = button.id;
        leftDivReference.appendChild(optionButton);
    });

    // menu construction
    // right part of the menu (sub-options)
    const rightDiv = document.createElement('div');
    rightDiv.style.float = 'right';
    rightDiv.style.width = '60%';
    rightDiv.style.height = '263px';
    rightDiv.style.overflow = 'scroll';
    rightDiv.style.overflowX = 'hidden';
    rightDiv.style.overflowY = 'auto';
    rightDiv.id = "rightDiv";
    document.getElementById('mainDiv').appendChild(rightDiv);

    // title of sub options (demo)
    const h2 = document.createElement('h2');
    h2.style.textAlign = 'center';
    h2.style.margin = '10px 0 10px 0';
    h2.innerText = 'Option Name';
    document.getElementById('rightDiv').appendChild(h2);

    document.body.append(skinWrapper);

    // Display options

    const optionList = [
    {
        holderId: "fpsDisplayOptionHolder",
        descrText: "FPS-Counter",
        checkId: "fpsDisplayCheck",
        /*onChange: e => {
        if (e.target.checked) {
            fpscounter.hidden = false;
        } else {
            fpscounter.hidden = true;
        }
        }*/
    },
    {
        holderId: "onlineDisplayOptionHolder",
        descrText: "Network Status",
        checkId: "onlineDisplayCheck",
        /*onChange: e => {
        if (e.target.checked) {
            status.hidden = false;
        } else {
            status.hidden = true;
        }
        }*/
    },
    {
        holderId: "shortcutDisplayOptionHolder",
        descrText: "Show Shortcuts",
        checkId: "shortcutDisplayCheck",
        /*onChange: e => {
        if (e.target.checked) {
            shortcuts.hidden = false;
        } else {
            shortcuts.hidden = true;
        }
        }*/
    },
    ];
      
    const rightDivReference2 = document.getElementById('rightDiv');
    const optionHr = document.createElement('hr');
    const optionSpaceThing = document.createTextNode(' ');
    
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
        
        optionHolder.innerHTML = `
            ${optionDescr.outerHTML}
            ${optionCheck.outerHTML}
        `;
        
        rightDivReference2.appendChild(optionHolder);
    }

    // only including this bc the others don't work lol
    fpsDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            fpscounter.style.display = "initial"; // initial works better for skill, use that in the future instead of ""
        } else {
            fpscounter.style.display = "none";
        }
    });

    onlineDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            status.style.display = "";
        } else {
            status.style.display = "none";
        }
    });

    shortcutDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            shortcuts.style.display = "";
        } else {
            shortcuts.style.display = "none";
        }
    });


    // SKIN-DISPLAY

    const skincontent = document.createElement("div");
    skincontent.id = "skincontent";
    skincontent.classList.add('skincontent');

    document.getElementById('rightDiv').appendChild(skincontent);

    var skincontentselector = document.getElementById('skincontent');

    const flexSquare = document.createElement('img');
    flexSquare.style.width = '100px';
    flexSquare.style.height = '100px';
    flexSquare.style.border = '1px solid black';
    flexSquare.style.margin = '10px';
    flexSquare.style.backgroundColor = '#ffffff';

    ////////////////////////////////////////////////////////
    ///// data exchange between main.js and preload.js /////
    ////////////////////////////////////////////////////////

    // handle skins
    function skinPathHandler(src) {
        console.log("skinpathhandler received the following path: " + src)

        /*require('electron').ipcRenderer.send('text', {
            //data: "some data"
            //data: src // does dumb shit
            
        })*/

        require('electron').ipcRenderer.send('text', src)

        console.log("sent")
    }

    // get skins
    require('electron').ipcRenderer.on('filepaths', (event, message) => {
        /*var skins = message;
        console.log(skins);
        console.log(skins.length);

        for (let i = 0; i < skins.length; i++) {
            if ([i] > 0) {
                let flexSquareClone = flexSquare.cloneNode(true);
              
                flexSquareClone.setAttribute('src', skins[i]);
                skincontentselector.appendChild(flexSquareClone);
            } else {
                flexSquare.src = skins[i];
                skincontentselector.appendChild(flexSquare);
            }
        }*/

        var skins = message;
        console.log(skins);
        console.log(skins.length);

        for (let i = 0; i < skins.length; i++) {
            let element;
            if ([i] > 0) {
              let flexSquareClone = flexSquare.cloneNode(true);
              flexSquareClone.setAttribute('src', skins[i]);
              element = flexSquareClone;
            } else {
              flexSquare.src = skins[i];
              element = flexSquare;
            }
          
            element.addEventListener('click', function() {
              let src = this.getAttribute('src');
              console.log("The source of the selected skin is: " + src);
              skinPathHandler(src);
            });
          
            skincontentselector.appendChild(element);
        }
    });

    /* Sooo... just writing my thoughts down. 
    To make the skinswapper work we need to allow the user 
    to click on a certain skin (get linked path),
    then we need to send that path to the settings (via ipc)
    and take this file, rename it to the default skin name,
    put it into the swapper folder and yeah, thats it... 
    
    1. On click event
    2. send linked src via ipc
    3. copy image
    4. change name
    5. paste into the swapper folder
    6. reload the client
    (no need to save to settings then)*/

    ////////////////////////////////////////////////////////

    // COLOR-DISPLAY Settings

    const rightDivReference = document.getElementById('rightDiv');

    const optionholders = [];
    const optiondescrs = [];
    const optioninputs = [];

    const createElement = (type, className, id, innerText) => {
        const element = document.createElement(type);
        element.className = className;
        element.id = id;
        element.innerText = innerText;
        return element;
    };

    const createOptionHolder = (id, descrText, inputId) => {
        const optionHolder = createElement('div', 'optionholder', id, '');
        const optionDescr = createElement('p', 'optiondescr', '', descrText);
        const optionInput = createElement('input', '', inputId, '');
        optionInput.type = 'text';
        optionInput.style.width = '100px';
        if (id == "opacityOptionHolder")
        {
            optionInput.placeholder = 'e.g. 0.95';
        } else if (id == "windowBorderOptionHolder") {
            optionInput.placeholder = 'e.g. 10';
        } else if (id == "shortcutOptionHolder") {
            optionInput.placeholder = 'very nice kill';
            optionInput.style.width = '140px';
        
            const select = document.createElement('select');
            select.style.width = "35px";
        
            for (let i = 1; i <= 10; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.innerText = i;
                select.appendChild(option);
            }
        
            optionHolder.appendChild(select);
        }
         else {
            optionInput.placeholder = 'e.g. #2a394f';
        }

        optionholders.push(optionHolder);
        optiondescrs.push(optionDescr);
        optioninputs.push(optionInput);

        optionHolder.appendChild(optionDescr);
        optionHolder.appendChild(optionInput);
        optionHolder.appendChild(optionSpaceThing);
        optionHolder.appendChild(optionHr);
    };

    createOptionHolder('menuHeaderColorOptionHolder', 'Header Color', 'menuHeaderColorOptionInput');
    createOptionHolder('behindOptionsColorOptionHolder', 'Behind-Options Color', 'behindOptionsColorOptionInput');
    createOptionHolder('skinButtonColorOptionHolder', 'Skin Button Color', 'skinButtonColorOptionInput');
    createOptionHolder('opacityOptionHolder', 'Opacity', 'opacityOptionInput');
    createOptionHolder('windowBorderOptionHolder', 'Window Border', 'windowBorderOptionInput');
    createOptionHolder('shortcutOptionHolder', 'Shortcut Option', 'shortcutOptionInput');

    optionholders.forEach(holder => rightDivReference.appendChild(holder));

    /*document.addEventListener('change', event => {
    const target = event.target;
    if (target.className === 'optioninput') {
        switch (target.id) {
        case 'menuHeaderColorOptionInput':
            menuHeaderColor = target.value;
            skinHeader.style.background = menuHeaderColor;
            break;
        case 'behindOptionsColorOptionInput':
            behindOptionsColor = target.value;
            mainDiv.style.background = behindOptionsColor;
            break;
        case 'skinButtonColorOptionInput':
            skinButtonColor = target.value;
    
            var skinbuttons = document.getElementsByClassName("skinbutton");
    
            for (var i = 0; i < skinbuttons.length; i++) {
                skinbuttons[i].style.backgroundColor = skinButtonColor;
            }
            break;
            default:
                break;
            }
        }
    });*/

    menuHeaderColorOptionInput.addEventListener('change', function() {
        menuHeaderColor = menuHeaderColorOptionInput.value;
        console.log(menuHeaderColor);
        skinHeader.style.background = menuHeaderColor;
    });

    behindOptionsColorOptionInput.addEventListener('change', function() {
        behindOptionsColor = behindOptionsColorOptionInput.value;
        console.log(behindOptionsColor);
        mainDiv.style.background = behindOptionsColor;
    });

    skinButtonColorOptionInput.addEventListener('change', function() {
        skinButtonColor = skinButtonColorOptionInput.value;
        console.log(skinButtonColor);
        //skinbutton.style.background = skinButtonColor; - its a class, won't work

        var skinbuttons = document.getElementsByClassName("skinbutton");

        for (var i = 0; i < skinbuttons.length; i++) {
            skinbuttons[i].style.backgroundColor = skinButtonColor; // kind of breaks hover effect
            //skinbuttons[i].style = "button:hover {background-color: #ff0000;}"; // nope
        }
    });

    opacityOptionInput.addEventListener('change', function() {
        opacity = opacityOptionInput.value;
        console.log(opacity);
        skinWrapper.style.opacity = opacity;
    });

    windowBorderOptionInput.addEventListener('change', function() {
        skinWrapperBorderRadius = windowBorderOptionInput.value;
        console.log(skinWrapperBorderRadius);
        skinWrapper.style.borderRadius = skinWrapperBorderRadius + "px";
    });

    // menu title
    h2.innerHTML = "All Options";

    // show all options

    fpsDisplayOptionHolder.style.display = "";
    onlineDisplayOptionHolder.style.display = "";
    shortcutDisplayOptionHolder.style.display = "";
    //skincontent.style.display = "flex";

    // hide
    skincontent.style.display = "none";

    const options = ["fpsDisplayOptionHolder", "onlineDisplayOptionHolder", "shortcutDisplayOptionHolder", "skincontent", "behindOptionsColorOptionHolder", "menuHeaderColorOptionHolder", "skinButtonColorOptionHolder", "opacityOptionHolder", "windowBorderOptionHolder"];

    
    document.getElementById("allOptions").addEventListener("click", function() {
        h2.innerHTML = "All Options";
        options.forEach(option => {
            document.getElementById(option).style.display = "";
        });
    });

    document.getElementById("general").addEventListener("click", function() {
        h2.innerHTML = "General";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("fpsDisplayOptionHolder").style.display = "";
        document.getElementById("onlineDisplayOptionHolder").style.display = "";
    });

    document.getElementById("shortcuts").addEventListener("click", function() {
        h2.innerHTML = "Shortcuts";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("shortcutDisplayOptionHolder").style.display = "";
    });

    document.getElementById("skinmenu").addEventListener("click", function() {
        h2.innerHTML = "Skins";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("skincontent").style.display = "flex";
    });

    document.getElementById("aimbot").addEventListener("click", function() {
        h2.innerHTML = "WTF?! <br> Didn't expect that from you tbh.";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
    });

    document.getElementById("colorsettings").addEventListener("click", function() {
        h2.innerHTML = "Color Settings";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("menuHeaderColorOptionHolder").style.display = "";
        document.getElementById("behindOptionsColorOptionHolder").style.display = "";
        document.getElementById("skinButtonColorOptionHolder").style.display = "";
        document.getElementById("opacityOptionHolder").style.display = "";
        document.getElementById("windowBorderOptionHolder").style.display = "";
    });

    document.getElementById("defaultsettings").addEventListener("click", function() {
        alert("you have to create them first lol");
    });


    // shortcuts

    document.body.addEventListener('keypress', (e) => {
        const chatInput = document.querySelector('input[placeholder="[Enter] to use chat"]');
        const event = new KeyboardEvent('keydown', {
          keyCode: 13,
          bubbles: true,
          cancelable: true
        });
      
        if (e.key == '1') {
            chatInput.value = 'GG';
            chatInput.dispatchEvent(event);
            chatInput.dispatchEvent(event);
        } else if (e.key == '2') {
            chatInput.value = 'hello guys';
            chatInput.dispatchEvent(event);
            chatInput.dispatchEvent(event);
        } else if (e.key == '3') {
            const wrapperElement = document.getElementById("skinWrapper");
            wrapperElement.style.display = wrapperElement.style.display === "none" ? "" : "none";
        }
    });
      

    // offline / online status

    const status = document.createElement("h2");
    status.innerHTML = "Network Status";
    status.id = "status";
    status.style = "position: absolute; width: 100%; text-align: center; z-index: 1000; color: lightgreen; font-size: 100%; display: none;";
    document.body.appendChild(status);

    const updateOnlineStatus = () => {
        document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'

        if (navigator.onLine == 1)
        {
            status.style.color = "lightgreen";
        } else {
            status.style.color = "red";
            mainWindow.loadFile('index.html')
        }

    }
      
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    
    updateOnlineStatus()

    // ping | doesn't work | jquery is the problem | look at ping.txt in saveforlater

    // FPS-Counter

    const fpscounter = document.createElement("h2");
    fpscounter.innerHTML = "FPS Counter";
    fpscounter.id = "fpscounter";
    fpscounter.style = "position: absolute; left: 100;top: 100; z-index: 1000; color: grey; margin-left: 7.5px; font-size: 100%; display: none;";
    document.body.appendChild(fpscounter);

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

        document.getElementById('fpscounter').innerText = 'FPS: ' + fps.toFixed(2);

        requestAnimationFrame(updateFps);
    }

    updateFps();
    
    // Settings Page (Redundant but maybe will re-use)
    //document.getElementById("settingsDiv").innerHTML += readFileSync('settingsPage.html').toString();

});