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
    skinWrapper.style = "::-webkit-scrollbar{border:1px solid #d5d5d5};";
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
    leftDiv.style.borderBottomLeftRadius = '10px';
    leftDiv.id = "leftDiv";
    document.getElementById('mainDiv').appendChild(leftDiv);

    // close button
    const skinCloseButton = document.createElement('button');
    skinCloseButton.className = 'skinclose';
    skinCloseButton.innerText = '_';
    skinCloseButton.id = 'skinclose';
    document.getElementById('skinWrapper').appendChild(skinCloseButton);

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "const skinwrapper1=document.querySelector('.skinwrapper'),skinheader1=document.getElementById('skinheader');function onDrag({movementX:e,movementY:n}){let s=window.getComputedStyle(skinwrapper1),t=parseInt(s.left),r=parseInt(s.top);skinwrapper1.style.left=`${t+e}px`,skinwrapper1.style.top=`${r+n}px`}skinheader1.addEventListener('mousedown',()=>{skinheader1.classList.add('skinactive'),skinheader1.addEventListener('mousemove',onDrag)}),document.addEventListener('mouseup',()=>{skinheader1.classList.remove('skinactive'),skinheader1.removeEventListener('mousemove',onDrag)});document.getElementById('skinclose').addEventListener('click',function(){document.getElementById('skinWrapper').style.display='none'});";
    document.getElementsByTagName('head')[0].appendChild(script);


    // menu buttons

    const allOptions = document.createElement('button');
    allOptions.className = 'skinbutton';
    allOptions.innerText = 'All Options';
    allOptions.id = "allOptions";
    document.getElementById('leftDiv').appendChild(allOptions);

    const optionButton1 = document.createElement('button');
    optionButton1.className = 'skinbutton';
    optionButton1.innerText = 'General';
    optionButton1.id = "general";
    document.getElementById('leftDiv').appendChild(optionButton1);

    const optionButton2 = document.createElement('button');
    optionButton2.className = 'skinbutton';
    optionButton2.innerText = 'Shortcuts';
    optionButton2.id = "shortcuts";
    document.getElementById('leftDiv').appendChild(optionButton2);

    const optionButton12 = document.createElement('button');
    optionButton12.className = 'skinbutton';
    optionButton12.innerText = 'Skins';
    optionButton12.id = "skinmenu";
    document.getElementById('leftDiv').appendChild(optionButton12);

    const optionButton123 = document.createElement('button');
    optionButton123.className = 'skinbutton';
    optionButton123.innerText = 'Aimbot';
    optionButton123.id = "aimbot";
    document.getElementById('leftDiv').appendChild(optionButton123);

    const optionButton34 = document.createElement('button');
    optionButton34.className = 'skinbutton';
    optionButton34.innerText = 'Color Settings';
    optionButton34.id = "colorsettings";
    document.getElementById('leftDiv').appendChild(optionButton34);

    const optionButton3 = document.createElement('button');
    optionButton3.className = 'skinbutton';
    optionButton3.innerText = 'Default Settings';
    optionButton3.id = "defaultsettings";
    document.getElementById('leftDiv').appendChild(optionButton3);

    // menu construction
    // right part of the menu (sub-options)
    const rightDiv = document.createElement('div');
    rightDiv.style.float = 'right';
    rightDiv.style.width = '60%';
    rightDiv.style.height = '263px';
    rightDiv.style.overflow = 'scroll';
    rightDiv.style.overflowX = 'hidden';
    rightDiv.style.overflowY = 'auto';
    rightDiv.style.borderBottomRightRadius = '10px';
    rightDiv.id = "rightDiv";
    document.getElementById('mainDiv').appendChild(rightDiv);

    // title of sub options (demo)
    const h2 = document.createElement('h2');
    h2.style.textAlign = 'center';
    h2.style.margin = '10px 0 10px 0';
    h2.innerText = 'Option Name';
    document.getElementById('rightDiv').appendChild(h2);

    document.body.append(skinWrapper);

    // one time define

    const optionSpaceThing = document.createElement('div');
    optionSpaceThing.style.height = '50px';

    const optionHr = document.createElement('hr');

    // FPS-DISPLAY

    // holds the sub-options
    const fpsDisplayOptionHolder = document.createElement('div');
    fpsDisplayOptionHolder.className = 'optionholder';
    fpsDisplayOptionHolder.id = "fpsDisplayOptionHolder";
    document.getElementById('rightDiv').appendChild(fpsDisplayOptionHolder);

    // sub-option title
    const fpsDisplayoptionDescr = document.createElement('p');
    fpsDisplayoptionDescr.className = 'optiondescr';
    fpsDisplayoptionDescr.innerText = 'FPS-Counter';
    document.getElementById('fpsDisplayOptionHolder').appendChild(fpsDisplayoptionDescr);

    // checkbox
    const fpsDisplayCheck = document.createElement('input');
    fpsDisplayCheck.type = 'checkbox';
    fpsDisplayCheck.id = "fpsDisplayCheck";
    document.getElementById('fpsDisplayOptionHolder').appendChild(fpsDisplayCheck);

    document.getElementById('fpsDisplayOptionHolder').appendChild(optionSpaceThing);
    document.getElementById('fpsDisplayOptionHolder').appendChild(optionHr);

    fpsDisplayOptionHolder.style.display = "none";

    // nice way | not so nice as I thought but gonna leave it in as proof that I tried lol

    //document.write("<div class='optionholder' id='fpsDisplayOptionHolder'></div>");
    // or
    //document.getElementById('rightDiv').appendChild("<div class='optionholder' id='fpsDisplayOptionHolder'></div>"); // doesn't work like that lol

    fpsDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            fpscounter.style.display = "initial"; // initial works better for skill, use that in the future instead of ""
        } else {
            fpscounter.style.display = "none";
        }
    });

    // ONLINE-DISPLAY

    // holds the sub-options
    const onlineDisplayOptionHolder = document.createElement('div');
    onlineDisplayOptionHolder.className = 'optionholder';
    onlineDisplayOptionHolder.id = "onlineDisplayOptionHolder";
    document.getElementById('rightDiv').appendChild(onlineDisplayOptionHolder);

    // sub-option title
    const onlineDisplayoptionDescr = document.createElement('p');
    onlineDisplayoptionDescr.className = 'optiondescr';
    onlineDisplayoptionDescr.innerText = 'Network Status';
    document.getElementById('onlineDisplayOptionHolder').appendChild(onlineDisplayoptionDescr);

    // checkbox
    const onlineDisplayCheck = document.createElement('input');
    onlineDisplayCheck.type = 'checkbox';
    onlineDisplayCheck.id = "onlineDisplayCheck";
    document.getElementById('onlineDisplayOptionHolder').appendChild(onlineDisplayCheck);

    document.getElementById('onlineDisplayOptionHolder').appendChild(optionSpaceThing);
    document.getElementById('onlineDisplayOptionHolder').appendChild(optionHr);

    onlineDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            status.style.display = "";
        } else {
            status.style.display = "none";
        }
    });

    // SHORTCUT-DISPLAY

    // holds the sub-options
    const shortcutDisplayOptionHolder = document.createElement('div');
    shortcutDisplayOptionHolder.className = 'optionholder';
    shortcutDisplayOptionHolder.id = "shortcutDisplayOptionHolder";
    document.getElementById('rightDiv').appendChild(shortcutDisplayOptionHolder);

    // sub-option title
    const shortcutDisplayoptionDescr = document.createElement('p');
    shortcutDisplayoptionDescr.className = 'optiondescr';
    shortcutDisplayoptionDescr.innerText = 'Show Shortcuts';
    document.getElementById('shortcutDisplayOptionHolder').appendChild(shortcutDisplayoptionDescr);

    // checkbox
    const shortcutDisplayCheck = document.createElement('input');
    shortcutDisplayCheck.type = 'checkbox';
    shortcutDisplayCheck.id = "shortcutDisplayCheck";
    document.getElementById('shortcutDisplayOptionHolder').appendChild(shortcutDisplayCheck);

    document.getElementById('shortcutDisplayOptionHolder').appendChild(optionSpaceThing);
    document.getElementById('shortcutDisplayOptionHolder').appendChild(optionHr);


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

    // get skins
    require('electron').ipcRenderer.on('filepaths', (event, message) => {
        var skins = message;
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
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // COLOR-DISPLAY Settings

    // menuHeaderColor

    // holds the sub-options
    const menuHeaderColorOptionHolder = document.createElement('div');
    menuHeaderColorOptionHolder.className = 'optionholder';
    menuHeaderColorOptionHolder.id = "menuHeaderColorOptionHolder";
    document.getElementById('rightDiv').appendChild(menuHeaderColorOptionHolder);

    // sub-option title
    const menuHeaderColorOptionDescr = document.createElement('p');
    menuHeaderColorOptionDescr.className = 'optiondescr';
    menuHeaderColorOptionDescr.innerText = 'Header Color';
    document.getElementById('menuHeaderColorOptionHolder').appendChild(menuHeaderColorOptionDescr);

    // input
    const menuHeaderColorOptionInput = document.createElement('input');
    menuHeaderColorOptionInput.type = 'text';
    menuHeaderColorOptionInput.id = "menuHeaderColorOptionInput";
    menuHeaderColorOptionInput.style.width = "100px";
    menuHeaderColorOptionInput.placeholder = "e.g. #2a394f";
    document.getElementById('menuHeaderColorOptionHolder').appendChild(menuHeaderColorOptionInput);

    document.getElementById('menuHeaderColorOptionHolder').appendChild(optionSpaceThing);
    document.getElementById('menuHeaderColorOptionHolder').appendChild(optionHr);


    menuHeaderColorOptionInput.addEventListener('change', function() {
        menuHeaderColor = menuHeaderColorOptionInput.value;
        console.log(menuHeaderColor);
        skinHeader.style.background = menuHeaderColor;
    });

    // behindOptionsColor

    // holds the sub-options
    const behindOptionsColorOptionHolder = document.createElement('div');
    behindOptionsColorOptionHolder.className = 'optionholder';
    behindOptionsColorOptionHolder.id = "behindOptionsColorOptionHolder";
    document.getElementById('rightDiv').appendChild(behindOptionsColorOptionHolder);

    // sub-option title
    const behindOptionsColorOptionDescr = document.createElement('p');
    behindOptionsColorOptionDescr.className = 'optiondescr';
    behindOptionsColorOptionDescr.innerText = 'Behind-Options Color';
    document.getElementById('behindOptionsColorOptionHolder').appendChild(behindOptionsColorOptionDescr);

    // input
    const behindOptionsColorOptionInput = document.createElement('input');
    behindOptionsColorOptionInput.type = 'text';
    behindOptionsColorOptionInput.id = "menuHeaderColorOptionInput";
    behindOptionsColorOptionInput.style.width = "100px";
    behindOptionsColorOptionInput.placeholder = "e.g. #2a394f";
    document.getElementById('behindOptionsColorOptionHolder').appendChild(behindOptionsColorOptionInput);

    document.getElementById('behindOptionsColorOptionHolder').appendChild(optionSpaceThing);
    document.getElementById('behindOptionsColorOptionHolder').appendChild(optionHr);


    behindOptionsColorOptionInput.addEventListener('change', function() {
        behindOptionsColor = behindOptionsColorOptionInput.value;
        console.log(behindOptionsColor);
        mainDiv.style.background = behindOptionsColor;
    });

    // skinButtonColor

    // holds the sub-options
    const skinButtonColorOptionHolder = document.createElement('div');
    skinButtonColorOptionHolder.className = 'optionholder';
    skinButtonColorOptionHolder.id = "skinButtonColorOptionHolder";
    document.getElementById('rightDiv').appendChild(skinButtonColorOptionHolder);

    // sub-option title
    const skinButtonColorOptionDescr = document.createElement('p');
    skinButtonColorOptionDescr.className = 'optiondescr';
    skinButtonColorOptionDescr.innerText = 'Behind-Options Color';
    document.getElementById('skinButtonColorOptionHolder').appendChild(skinButtonColorOptionDescr);

    // input
    const skinButtonColorOptionInput = document.createElement('input');
    skinButtonColorOptionInput.type = 'text';
    skinButtonColorOptionInput.id = "menuHeaderColorOptionInput";
    skinButtonColorOptionInput.style.width = "100px";
    skinButtonColorOptionInput.placeholder = "e.g. #2a394f";
    document.getElementById('skinButtonColorOptionHolder').appendChild(skinButtonColorOptionInput);

    document.getElementById('skinButtonColorOptionHolder').appendChild(optionSpaceThing);
    document.getElementById('skinButtonColorOptionHolder').appendChild(optionHr);


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

    // menu title
    h2.innerHTML = "All Options";

    // show all options

    fpsDisplayOptionHolder.style.display = "";
    onlineDisplayOptionHolder.style.display = "";
    shortcutDisplayOptionHolder.style.display = "";
    //skincontent.style.display = "flex";

    // hide
    skincontent.style.display = "none";

    document.getElementById("allOptions").addEventListener("click", function() {

        // menu title
        h2.innerHTML = "All Options";

        // show all options
        fpsDisplayOptionHolder.style.display = "";
        onlineDisplayOptionHolder.style.display = "";
        shortcutDisplayOptionHolder.style.display = "";
        skincontent.style.display = "flex";
    });

    document.getElementById("general").addEventListener("click", function() {

        // menu title
        h2.innerHTML = "General";

        // hide all options
        fpsDisplayOptionHolder.style.display = "none";
        onlineDisplayOptionHolder.style.display = "none";
        shortcutDisplayOptionHolder.style.display = "none";
        skincontent.style.display = "none";

        // reactivate needed options
        fpsDisplayOptionHolder.style.display = "";
        onlineDisplayOptionHolder.style.display = "";
    
    });

    document.getElementById("shortcuts").addEventListener("click", function() {
        // menu title
        h2.innerHTML = "Shortcuts";

        // hide all options
        fpsDisplayOptionHolder.style.display = "none";
        onlineDisplayOptionHolder.style.display = "none";
        shortcutDisplayOptionHolder.style.display = "none";
        skincontent.style.display = "none";

        // reactivate needed options
        shortcutDisplayOptionHolder.style.display = "";

    });

    document.getElementById("skinmenu").addEventListener("click", function() {

        // menu title
        h2.innerHTML = "Skins";

        // hide all options
        fpsDisplayOptionHolder.style.display = "none";
        onlineDisplayOptionHolder.style.display = "none";
        shortcutDisplayOptionHolder.style.display = "none";
        skincontent.style.display = "none";

        // reactivate needed options
        skincontent.style.display = "flex";
    
    });

    document.getElementById("aimbot").addEventListener("click", function() {

        // menu title
        h2.innerHTML = "WTF?! <br> Didn't expect that from you tbh.";

        // hide all options
        fpsDisplayOptionHolder.style.display = "none";
        onlineDisplayOptionHolder.style.display = "none";
        shortcutDisplayOptionHolder.style.display = "none";
        skincontent.style.display = "none";
    
    });

    document.getElementById("defaultsettings").addEventListener("click", function() {
        alert("you have to create them first lol");
    });

    document.getElementById("colorsettings").addEventListener("click", function() {

        // menu title
        h2.innerHTML = "Color Settings";

        // hide all options
        fpsDisplayOptionHolder.style.display = "none";
        onlineDisplayOptionHolder.style.display = "none";
        shortcutDisplayOptionHolder.style.display = "none";
        skincontent.style.display = "none";
    
    });

    // css
    let skincss = document.createElement('style');
    skincss.innerText = "@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';*{z-index:1000;margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif}.skinwrapper{position:absolute;top:50%;left:50%;max-width:750px;width:100%;background:#2a394f;/*has to stay like that, else the menu is see trough under header*/transform:translate(-50%,-50%);border:solid 1px #000;color:#fff;height:335px;border-radius:10px;}.skinwrapper header{font-size:23px;font-weight:500;padding:17px 30px;border-bottom:1px solid #000;text-align:center;border-top-left-radius: 10px;border-top-right-radius: 10px;}.skinwrapper header.skinactive{cursor:move;user-select:none;}.skinwrapper .skincontent{display:flex;flex-direction:wrap;flex-wrap:wrap;justify-content:center;background:#2a394f}.skincontent .title{margin:15px 0;font-size:29px;font-weight:500}.skincontent p{font-size:16px;text-align:center;display:flex}.skinbutton{width:100%;height:50px;background-color:" + skinButtonColor + ";border:none;color:#fff;font-size:20px}.skinbutton:hover{background-color:" + skinButtonHoverColor + "}.skinclose{color:grey;position:absolute;top:0;right:0;margin-right:15px;margin-top:-6px;background-color:" + skinCloseColor + ";border:none;font-size:35px}.skinclose:hover{color:#fff}p{font-size:20px}input[type=text]{float:right;margin:14px 25px 10px 0;width:35px;font-weight:700;color:grey}input[type=range]{float:right;margin:16px 20px 10px 0}input[type=checkbox]{float:right;transform:scale(2);margin:14px 25px 5px 0;width:35px;font-weight:700;color:grey;}.optiondescr{float:left;margin:10px 0 10px 20px}.optionholder{background-color:" + optionColor + "}hr{width:100%;border:.1px solid #000}";
    document.head.appendChild(skincss);


    // shortcuts

    document.body.addEventListener('keypress', (e) => {
        if(e.key == '1') {
            const input = document.querySelector('input[placeholder="[Enter] to use chat"]');
            input.value = 'GG';

            const event = new KeyboardEvent('keydown', {
                keyCode: 13,
                bubbles: true,
                cancelable: true
            });
    
            input.dispatchEvent(event);
            input.dispatchEvent(event);
        }

        if(e.key == '2') {
            const input = document.querySelector('input[placeholder="[Enter] to use chat"]');
            input.value = 'hello guys';

            const event = new KeyboardEvent('keydown', {
                keyCode: 13,
                bubbles: true,
                cancelable: true
            });
    
            input.dispatchEvent(event);
            input.dispatchEvent(event);
        }

        if(e.key == '3') {
            const wrapperElement = document.getElementById("skinWrapper");

            if (wrapperElement.style.display == "none") {
                wrapperElement.style.display = "";
            } else {
                wrapperElement.style.display = "none";
            }
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

    // ping | doesn't work | jquery is the problem

    /*const pingfunction = "function ping() {var start = new Date().getTime();$('junkOne').attr('src', 'http://deadshot.io/').error(function () {var end = new Date().getTime();$('timer').html('' + (end-start) + 'ms');});}ping();"

    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    script.innerHTML = pingfunction;
    document.getElementsByTagName('head')[0].appendChild(script); // just put the code inside it you fucking idiot

    const pingimg = document.createElement("img");
    pingimg.id = "junkOne";
    document.body.appendChild(pingimg);

    const faFEA = document.createElement("p");
    faFEA.innerHTML = "ping here";
    faFEA.id = "timer";
    faFEA.style = "position: absolute; width: 100%; text-align: center; z-index: 1000; color: red";
    document.body.appendChild(faFEA);*/

    // First, load jQuery by adding it to the page as a script element
    /*var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "window.$ = window.jQuery = require('./path/to/jquery');";
    //document.getElementsByTagName('head')[0].appendChild(script);
    document.body.appendChild(script);*/

    //<script>window.$ = window.jQuery = require('./path/to/jquery');</script>

    // Next, define the ping function using jQuery
    /*function ping() {
    var start = new Date().getTime();
    $('#junkOne').attr('src', 'http://deadshot.io/').error(function () {
        var end = new Date().getTime();
        $('#timer').html('' + (end-start) + 'ms');
    });
    }

    // Create the junkOne and timer elements and append them to the page
    const pingimg = document.createElement("img");
    pingimg.id = "junkOne";
    pingimg.src = "http://deadshot.io/"; // set the src attribute to avoid an error
    document.body.appendChild(pingimg);

    const faFEA = document.createElement("p");
    faFEA.innerHTML = "ping here";
    faFEA.id = "timer";
    faFEA.style = "position: absolute; width: 100%; text-align: center; z-index: 1000; color: red";
    document.body.appendChild(faFEA);

    // Finally, call the ping function
    ping();*/

    
    /*function ping() {
        var start = new Date().getTime();
        $('#junkOne').attr('src', 'http://deadshot.io/').error(function () {
            var end = new Date().getTime();
            $('#timer').html("" + (end-start) + "ms");
        });
    }

    ping();*/

    /*function ping() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/ping', true);
        xhr.send();
        
        var startTime = performance.now();
        
        xhr.onload = function() {
            var endTime = performance.now();
            var pingTime = endTime - startTime;
            console.log('Ping time: ' + pingTime + 'ms');
        };
    }
    
    ping();*/

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
