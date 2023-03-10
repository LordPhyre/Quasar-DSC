const fs = require('fs');
//const {ipcRenderer} = require('electron'); doesn't work, idk why tbh

document.addEventListener("DOMContentLoaded", function() {

//Receive user datapath and save as variable
require('electron').ipcRenderer.on('SendUserData', (event, message) => {

    const jsonpath = message;
    console.log(jsonpath);

    // Parse the contents of the file into a JavaScript object
    let jsonobj = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));
    console.log(jsonobj);

    // Colors (Now with JSON)
    var menuHeaderColor = jsonobj.Colors.menuHeaderColor; //"#2a394f";
    var optionsColor = jsonobj.Colors.optionsColor; //"#364760";
    var behindOptionsColor = jsonobj.Colors.behindOptionsColor; //"#2a394f";
    var skinButtonColor = jsonobj.Colors.skinButtonColor; //"#364760";
    var skinButtonHoverColor = jsonobj.Colors.skinButtonHoverColor; //"#0798fc";
    var skinCloseColor = jsonobj.Colors.skinCloseColor; //"#ffffff00";
    var optionColor = jsonobj.Colors.optionColor; //"#364760";
    var opacity = jsonobj.Colors.opacity; //0.95;
    var skinWrapperBorderRadius = jsonobj.Colors.skinWrapperBorderRadius; //"10";
    var msgBoxColor = jsonobj.Colors.msgBoxColor; //"#2a394f";

    let scrollcss = document.createElement('style');
    scrollcss.innerText = `
    ::-webkit-scrollbar { width: 8px; height: 3px;}
    ::-webkit-scrollbar-track {  background-color: #646464;}
    ::-webkit-scrollbar-track-piece { background-color: #000;}
    ::-webkit-scrollbar-thumb { height: 50px; background-color: #666; border-radius: 3px;}
    ::-webkit-scrollbar-corner { background-color: #646464;}}
    ::-webkit-resizer { background-color: #666;}`;
    document.head.appendChild(scrollcss);

    // draggable window | make all of this easier with modules -> https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file

    // wrapper
    const skinWrapper = document.createElement('div');
    skinWrapper.className = 'skinwrapper';
    skinWrapper.id = "skinWrapper";
    skinWrapper.style = "::-webkit-scrollbar{border:1px solid #d5d5d5};opacity:" + opacity + ";border-radius: " + skinWrapperBorderRadius + "px; z-index: 9999;";
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

    const rightDiv = document.createElement('div');
    rightDiv.style.float = 'right';
    rightDiv.style.width = '60%';
    rightDiv.style.height = '263px';
    rightDiv.style.overflow = 'scroll';
    rightDiv.style.overflowX = 'hidden';
    rightDiv.style.overflowY = 'auto';
    rightDiv.id = "rightDiv";
    document.getElementById('mainDiv').appendChild(rightDiv);

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

    // menu buttons

    const buttonData = [
        { text: 'Home', id: 'allOptions' },
        { text: 'General', id: 'general' },
        { text: 'Stats', id: 'stats' },
        { text: 'Shortcuts', id: 'shortcuts' },
        { text: 'Skins', id: 'skinmenu' },
        { text: 'Skyboxes', id: 'skyboxes' },
        { text: 'Texture Packs', id: 'texturepacks' },
        { text: 'Chromium Flags', id: 'chromiumflags' },
        { text: 'Aimbot', id: 'aimbot' },
        { text: 'Color Settings', id: 'colorsettings' },
        { text: 'Dev Settings', id: 'devsettings' },
        /*{ text: 'Custom CSS', id: 'customcss' },
        { text: 'Default Settings', id: 'defaultsettings' }*/
    ];
    
    const leftDivReference = document.getElementById('leftDiv');
    
    buttonData.forEach(button => {
        const optionButton = document.createElement('button');
        optionButton.className = 'skinbutton';
        optionButton.innerText = button.text;
        optionButton.id = button.id;
        leftDivReference.appendChild(optionButton);
    });

    // title of sub options
    const h2 = document.createElement('h2');
    h2.style.textAlign = 'center';
    h2.style.margin = '10px 0 10px 0';
    h2.innerText = 'Option Name';
    document.getElementById('rightDiv').appendChild(h2);

    const logoFont = document.createElement('link')
    logoFont.href = "https://fonts.cdnfonts.com/css/aquire";
    logoFont.rel = "stylesheet";
    document.getElementsByTagName('head')[0].appendChild(logoFont);

    const logo = document.createElement('h2');
    logo.style = 'font-family: "Aquire", sans-serif; text-align: center; color: white; font-size: 75px; margin-top: 30px;';
    logo.id = "logo";
    logo.innerHTML = "Quasar<br>";
    document.getElementById('rightDiv').appendChild(logo);

    const version = document.createElement('h2');
    version.style = 'font-family: "Aquire", sans-serif; text-align: center; color: white; font-size: 17.5px;';
    version.id = "version";
    version.innerText = "v1.0 - PUBLIC";
    document.getElementById('rightDiv').appendChild(version);

    document.body.append(skinWrapper);

    // Display options

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
    /*{
        holderId: "onlineDisplayOptionHolder",
        descrText: "Network Status",
        checkId: "onlineDisplayCheck",
    },*/
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
    /*{
        holderId: "chromiumFlagsOptionHolder",
        descrText: "Chromium Flags",
        checkId: "chromiumFlagsCheck",
    },*/
    {
        holderId: "massCheckUncheckFlagsOptionHolder",
        descrText: "Check / Un-Check all",
        checkId: "massCheckUncheckFlagsCheck",
    },
    {
        holderId: "disable_print_previewOptionHolder",
        descrText: "disable-print-preview",
        checkId: "disable_print_previewCheck",
    },
    {
        holderId: "javascript_harmonyOptionHolder",
        descrText: "javascript-harmony",
        checkId: "javascript_harmonyCheck",
    },
    {
        holderId: "renderer_process_limitOptionHolder",
        descrText: "renderer-process-limit",
        checkId: "renderer_process_limitCheck",
    },
    {
        holderId: "max_active_webgl_contextsOptionHolder",
        descrText: "max-active-webgl-contexts",
        checkId: "max_active_webgl_contextsCheck",
    },
    {
        holderId: "ignore_gpu_blocklistOptionHolder",
        descrText: "ignore-gpu-blocklist",
        checkId: "ignore_gpu_blocklistCheck",
    },
    {
        holderId: "disable_2d_canvas_clip_aaOptionHolder",
        descrText: "disable-2d-canvas-clip-aa",
        checkId: "disable_2d_canvas_clip_aaCheck",
    },
    {
        holderId: "disable_loggingOptionHolder",
        descrText: "disable-logging",
        checkId: "disable_loggingCheck",
    },
    {
        holderId: "in_process_gpuOptionHolder",
        descrText: "in-process-gpu",
        checkId: "in_process_gpuCheck",
    },
    {
        holderId: "disable_accelerated_2d_canvasOptionHolder",
        descrText: "disable-accelerated-2d-canvas",
        checkId: "disable_accelerated_2d_canvasCheck",
    },
    {
        holderId: "debugOptionHolder",
        descrText: "Debug Mode",
        checkId: "debugCheck",
    },
    ];
      
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
        
        rightDiv.appendChild(optionHolder);
    }


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
    
    /*document.getElementById("onlineDisplayCheck").checked = jsonobj.Stats.Online;
    onlineDisplayCheck.addEventListener('change', e => {
        if(e.target.checked){
            status.style.display = "block";
            jsonobj.Stats.Online = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));

        } else {
            status.style.display = "none";
            jsonobj.Stats.Online = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });*/

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

    /*document.getElementById("chromiumFlagsCheck").checked = jsonobj.Flags;
    chromiumFlagsCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Flags.Print = true;
            jsonobj.Flags.Harmony = true;
            jsonobj.Flags.Limit = true;
            jsonobj.Flags.Contexts = true;
            jsonobj.Flags.GPUblocklist = true;
            jsonobj.Flags.CanvasClip = true;
            jsonobj.Flags.Logging = true;
            jsonobj.Flags.ProcessGPU = true;
            jsonobj.Flags.AcceleratedCanvas = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Flags.Print = false;
            jsonobj.Flags.Harmony = false;
            jsonobj.Flags.Limit = false;
            jsonobj.Flags.Contexts = false;
            jsonobj.Flags.GPUblocklist = false;
            jsonobj.Flags.CanvasClip = false;
            jsonobj.Flags.Logging = false;
            jsonobj.Flags.ProcessGPU = false;
            jsonobj.Flags.AcceleratedCanvas = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });*/

    massCheckUncheckFlagsCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Flags.Print = true;
            jsonobj.Flags.Harmony = true;
            jsonobj.Flags.Limit = true;
            jsonobj.Flags.Contexts = true;
            jsonobj.Flags.GPUblocklist = true;
            jsonobj.Flags.CanvasClip = true;
            jsonobj.Flags.Logging = true;
            jsonobj.Flags.ProcessGPU = true;
            jsonobj.Flags.AcceleratedCanvas = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));

            document.getElementById("disable_print_previewCheck").checked = true;
            document.getElementById("javascript_harmonyCheck").checked = true;
            document.getElementById("renderer_process_limitCheck").checked = true;
            document.getElementById("max_active_webgl_contextsCheck").checked = true;
            document.getElementById("ignore_gpu_blocklistCheck").checked = true;
            document.getElementById("disable_2d_canvas_clip_aaCheck").checked = true;
            document.getElementById("disable_loggingCheck").checked = true;
            document.getElementById("in_process_gpuCheck").checked = true;
            document.getElementById("disable_accelerated_2d_canvasCheck").checked = true;
        } else {
            jsonobj.Flags.Print = false;
            jsonobj.Flags.Harmony = false;
            jsonobj.Flags.Limit = false;
            jsonobj.Flags.Contexts = false;
            jsonobj.Flags.GPUblocklist = false;
            jsonobj.Flags.CanvasClip = false;
            jsonobj.Flags.Logging = false;
            jsonobj.Flags.ProcessGPU = false;
            jsonobj.Flags.AcceleratedCanvas = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));

            document.getElementById("disable_print_previewCheck").checked = false;
            document.getElementById("javascript_harmonyCheck").checked = false;
            document.getElementById("renderer_process_limitCheck").checked = false;
            document.getElementById("max_active_webgl_contextsCheck").checked = false;
            document.getElementById("ignore_gpu_blocklistCheck").checked = false;
            document.getElementById("disable_2d_canvas_clip_aaCheck").checked = false;
            document.getElementById("disable_loggingCheck").checked = false;
            document.getElementById("in_process_gpuCheck").checked = false;
            document.getElementById("disable_accelerated_2d_canvasCheck").checked = false;
        }
    });

    document.getElementById("disable_print_previewCheck").checked = jsonobj.Flags.Print;
    disable_print_previewCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Flags.Print = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Flags.Print = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("javascript_harmonyCheck").checked = jsonobj.Flags.Harmony;
    javascript_harmonyCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Flags.Harmony = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Flags.Harmony = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("renderer_process_limitCheck").checked = jsonobj.Flags.Limit;
    renderer_process_limitCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Flags.Limit = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Flags.Limit = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("max_active_webgl_contextsCheck").checked = jsonobj.Flags.Contexts;
    max_active_webgl_contextsCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Flags.Contexts = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Flags.Contexts = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("ignore_gpu_blocklistCheck").checked = jsonobj.Flags.GPUblocklist;
    ignore_gpu_blocklistCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Flags.GPUblocklist = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Flags.GPUblocklist = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("disable_2d_canvas_clip_aaCheck").checked = jsonobj.Flags.CanvasClip;
    disable_2d_canvas_clip_aaCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Flags.CanvasClip = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Flags.CanvasClip = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("disable_loggingCheck").checked = jsonobj.Flags.Logging;
    disable_loggingCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Flags.Logging = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Flags.Logging = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("in_process_gpuCheck").checked = jsonobj.Flags.ProcessGPU;
    in_process_gpuCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Flags.ProcessGPU = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Flags.ProcessGPU = false;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        }
    });

    document.getElementById("disable_accelerated_2d_canvasCheck").checked = jsonobj.Flags.AcceleratedCanvas;
    disable_accelerated_2d_canvasCheck.addEventListener('change', e => {
        if(e.target.checked){
            jsonobj.Flags.AcceleratedCanvas = true;
            fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        } else {
            jsonobj.Flags.AcceleratedCanvas = false;
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

    // SKIN-DISPLAY

    const skinCategoryoptionHolder = document.createElement('div');
    skinCategoryoptionHolder.className = 'optionholder';
    skinCategoryoptionHolder.id = 'skinCategoryoptionHolder';

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

    rightDiv.appendChild(skinCategoryoptionHolder);

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

    ////////////////////////////////////////////////////////

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
skincontent
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

    ////////////////////////////////////////////////////////

    // COLOR-DISPLAY Settings

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

    let keyNumber = 1;

    const createOptionHolder = (id, descrText, inputId) => {
        const optionHolder = createElement('div', 'optionholder', id, '');
        const optionDescr = createElement('p', 'optiondescr', '', descrText);
        const optionInput = createElement('input', '', inputId, '');
        if (id == "texturePackOptionHolder") {
            optionInput.type = 'button'; // normally I wouldn't do this, just so I can make it more efficient
            optionInput.value = 'Open Folder';
            //optionInput.placeholder = '';
            optionInput.style.width = '110px';
        } else if (id == "downloadTexturePackOptionHolder") {
            optionInput.type = 'button';
            optionInput.value = 'Download Pack';
            //optionInput.placeholder = '';
            optionInput.style.width = '110px';
        } else if (id == "resetColorOptionHolder") {
            optionInput.type = 'button';
            optionInput.value = 'Reset Color';
            //optionInput.placeholder = '';
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
            if (id == 'shortcutOptionHolder') {
                optionInput.placeholder = 'off / on';
                optionInput.setAttribute('value','');
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
        } else {
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

    createOptionHolder('resetColorOptionHolder', 'Reset Color', 'resetColorOptionInput');

    // color
    createOptionHolder('menuHeaderColorOptionHolder', 'Header Color', 'menuHeaderColorOptionInput');
    //menuHeaderColorOptionInput.value = jsonobj.Colors.menuHeaderColor;
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

    optionholders.forEach(holder => rightDiv.appendChild(holder));

    // get the shortcut values to later reuse
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

    // shortcutdisplay

    const shortcuts = document.createElement("h2");
    shortcuts.innerHTML = "[" + one + "] On/Off  [" + two + "] " + twoValue + "  [" + three + "] " + threeValue + "  [" + four + "] " + fourValue + "  [" + five + "] " + fiveValue;
    shortcuts.type = "submit";
    shortcuts.id = "shortcutsdisplay";
    shortcuts.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 2px; margin-left: 5px; outline: none; border: none; font-size: 100%; display: none;";
    document.body.appendChild(shortcuts);

    //Show or Hide Shortcuts based on JSON
    if(jsonobj.Stats.Shortcuts) {
        shortcuts.style.display = "block";
    } else if (!jsonobj.Stats.Shortcuts) {
        shortcuts.style.display = "none";
    };

    const inputs = ['shortcutOptionInput', 'shortcutOptionInput2', 'shortcutOptionInput3', 'shortcutOptionInput4', 'shortcutOptionInput5'];

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

            /* update value:
                1.  element.id*/

            keyContentMap = {
                [one]: [oneValue],
                [two]: [twoValue],
                [three]: [threeValue],
                [four]: [fourValue],
                [five]: [fiveValue],
            };

            shortcuts.innerHTML = "[" + one + "] On/Off  [" + two + "] " + twoValue + "  [" + three + "] " + threeValue + "  [" + four + "] " + fourValue + "  [" + five + "] " + fiveValue;

            console.log(keyContentMap);
        });
    });
    
    document.addEventListener('keydown', function(event) {
        const chatInput = document.querySelector('input[placeholder="[Enter] to use chat"]');
        const event222 = new KeyboardEvent('keydown', {
          keyCode: 13,
          bubbles: true,
          cancelable: true
        });

        if (event.key in keyContentMap) {
            chatInput.value = keyContentMap[event.key];
            chatInput.dispatchEvent(event222);
            chatInput.dispatchEvent(event222);
        }
    });

    //Color Customizations
    menuHeaderColorOptionInput.addEventListener('change', function() {
        menuHeaderColor = menuHeaderColorOptionInput.value;
        jsonobj.Colors.menuHeaderColor = menuHeaderColorOptionInput.value;
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        console.log(menuHeaderColor);
        skinHeader.style.background = menuHeaderColor;
    });

    optionColorOptionInput.addEventListener('change', function() {
        optionColor = optionColorOptionInput.value;
        jsonobj.Colors.optionColor = optionColorOptionInput.value;
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        console.log(optionColor);

        const elements = document.querySelectorAll('.optionholder');
        elements.forEach(element => {
          element.style.background = optionColor;
        });
    });

    behindOptionsColorOptionInput.addEventListener('change', function() {
        behindOptionsColor = behindOptionsColorOptionInput.value;
        jsonobj.Colors.behindOptionsColor = behindOptionsColorOptionInput.value;
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        console.log(behindOptionsColor);
        mainDiv.style.background = behindOptionsColor;
    });

    skinButtonColorOptionInput.addEventListener('change', function() {
        skinButtonColor = skinButtonColorOptionInput.value;
        jsonobj.Colors.skinButtonColor = skinButtonColorOptionInput.value;
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
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
        jsonobj.Colors.opacity = opacityOptionInput.value;
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        console.log(opacity);
        skinWrapper.style.opacity = opacity;
    });

    windowBorderOptionInput.addEventListener('change', function() {
        skinWrapperBorderRadius = windowBorderOptionInput.value;
        jsonobj.Colors.skinWrapperBorderRadius = windowBorderOptionInput.value;
        fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
        console.log(skinWrapperBorderRadius);
        skinWrapper.style.borderRadius = skinWrapperBorderRadius + "px";
    });

    texturePackOptionInput.addEventListener("click", function() {
        require('electron').ipcRenderer.send('openTexturePackFolder');
    });

    downloadTexturePackOptionInput.addEventListener("click", function() {
        window.open("https://github.com/jcjms/Quasar-DSC-Texturepack/archive/refs/heads/main.zip", "Texturepack Download", "height=500,width=500");
    });

    
    //Color Reset Button
    resetColorOptionInput.addEventListener("click", function() {
    
        var menuHeaderColor = "#232429";
        skinHeader.style.background = menuHeaderColor;
        jsonobj.Colors.menuHeaderColor = menuHeaderColor;
        var optionColor = "";
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

    // options
    
    const options = [
        "massCheckUncheckStatsOptionHolder",
        "fpsDisplayOptionHolder", 
        "pingDisplayOptionHolder", 
        /*"onlineDisplayOptionHolder",*/ 
        "shortcutDisplayOptionHolder", 
        "skincontent", 
        "skyboxcontent", 
        "optionColorOptionHolder", 
        "behindOptionsColorOptionHolder", 
        "menuHeaderColorOptionHolder", 
        "skinButtonColorOptionHolder", 
        "opacityOptionHolder", 
        "windowBorderOptionHolder", 
        "skinCategoryoptionHolder", 
        "skyboxoptionHolder", 
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
        "WASDDisplayOptionHolder",
        "AutoFullscreenOptionHolder", 
        "FullscreenOptionHolder",
        //"chromiumFlagsOptionHolder", 
        "resetColorOptionHolder",
        "massCheckUncheckFlagsOptionHolder",
        "disable_print_previewOptionHolder",
        "javascript_harmonyOptionHolder",
        "renderer_process_limitOptionHolder",
        "max_active_webgl_contextsOptionHolder",
        "ignore_gpu_blocklistOptionHolder",
        "disable_2d_canvas_clip_aaOptionHolder",
        "disable_loggingOptionHolder",
        "in_process_gpuOptionHolder",
        "disable_accelerated_2d_canvasOptionHolder",
        "debugOptionHolder",
    ];
    
    menuHeaderColorOptionInput.value = jsonobj.Colors.menuHeaderColor;
    behindOptionsColorOptionInput.value = jsonobj.Colors.behindOptionsColor;
    skinButtonColorOptionInput.value = jsonobj.Colors.skinButtonColor;
    optionColorOptionInput.value = jsonobj.Colors.optionColor;
    opacityOptionInput.value = jsonobj.Colors.opacity;
    windowBorderOptionInput.value = jsonobj.Colors.skinWrapperBorderRadius;

    // default title
    h2.innerHTML = "Home";

    // disable, bc key is already taken
    document.getElementsByName('shortcutOptionInput')[0].disabled = true;

    options.forEach(option => {
        document.getElementById(option).style.display = "none";
    });

    document.getElementById("allOptions").addEventListener("click", function() {
        h2.innerHTML = "Home";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        logo.style.display = "block";
        version.style.display = "block";
    });

    document.getElementById("general").addEventListener("click", function() {
        h2.innerHTML = "General";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        //document.getElementById("onlineDisplayOptionHolder").style.display = "";
        document.getElementById("WASDDisplayOptionHolder").style.display = "";
        document.getElementById("AutoFullscreenOptionHolder").style.display = "";
        document.getElementById("FullscreenOptionHolder").style.display = "";

        logo.style.display = "none";
        version.style.display = "none";
    });

    document.getElementById("stats").addEventListener("click", function() {
        h2.innerHTML = "Stats";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("massCheckUncheckStatsOptionHolder").style.display = "";
        document.getElementById("fpsDisplayOptionHolder").style.display = "";
        document.getElementById("pingDisplayOptionHolder").style.display = "";
        document.getElementById("platformDisplayOptionHolder").style.display = "";
        document.getElementById("cpuUsageDisplayOptionHolder").style.display = "";
        document.getElementById("memoryUsageDisplayOptionHolder").style.display = "";
        document.getElementById("totalMemoryDisplayOptionHolder").style.display = "";
        document.getElementById("cpuCoresDisplayOptionHolder").style.display = "";
        document.getElementById("uptimeDisplayOptionHolder").style.display = "";

        logo.style.display = "none";
        version.style.display = "none";
    });

    document.getElementById("shortcuts").addEventListener("click", function() {
        h2.innerHTML = "Shortcuts";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("shortcutDisplayOptionHolder").style.display = "";
        document.getElementById("shortcutOptionHolder").style.display = "";
        document.getElementById("shortcutOptionHolder2").style.display = "";
        document.getElementById("shortcutOptionHolder3").style.display = "";
        document.getElementById("shortcutOptionHolder4").style.display = "";
        document.getElementById("shortcutOptionHolder5").style.display = "";

        logo.style.display = "none";
        version.style.display = "none";
    });

    document.getElementById("skinmenu").addEventListener("click", function() {
        //h2.innerHTML = 'Skins <button id="reload">Reload</button>';
        h2.innerHTML = 'Skins <p style="color: red; font-size: 17px">ATTENTION: Need to restart client to apply skins</p>'
        
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("skinCategoryoptionHolder").style.display = "";
        document.getElementById("skincontent").style.display = "flex";

        logo.style.display = "none";
        version.style.display = "none";
    });

    document.getElementById("skyboxes").addEventListener("click", function() {
        h2.innerHTML = 'Skyboxes <p style="color: red; font-size: 17px">ATTENTION: Need to restart client to apply skyboxes</p>'
        
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("skyboxoptionHolder").style.display = "";
        document.getElementById("skyboxcontent").style.display = "flex";

        logo.style.display = "none";
        version.style.display = "none";
    });

    document.getElementById("texturepacks").addEventListener("click", function() {
        h2.innerHTML = 'Texture Packs'
        
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("texturePackOptionHolder").style.display = "";
        document.getElementById("downloadTexturePackOptionHolder").style.display = "";

        logo.style.display = "none";
        version.style.display = "none";
    });

    document.getElementById("chromiumflags").addEventListener("click", function() {
        h2.innerHTML = 'Chromium Flags <p style="color: red; font-size: 17px">ATTENTION: Need to restart client to apply flags</p>'
        
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        //document.getElementById("chromiumFlagsOptionHolder").style.display = "";

        document.getElementById("massCheckUncheckFlagsOptionHolder").style.display = "";
        document.getElementById("disable_print_previewOptionHolder").style.display = "";
        document.getElementById("javascript_harmonyOptionHolder").style.display = "";
        document.getElementById("renderer_process_limitOptionHolder").style.display = "";
        document.getElementById("max_active_webgl_contextsOptionHolder").style.display = "";
        document.getElementById("ignore_gpu_blocklistOptionHolder").style.display = "";
        document.getElementById("disable_2d_canvas_clip_aaOptionHolder").style.display = "";
        document.getElementById("disable_loggingOptionHolder").style.display = "";
        document.getElementById("in_process_gpuOptionHolder").style.display = "";
        document.getElementById("disable_accelerated_2d_canvasOptionHolder").style.display = "";

        logo.style.display = "none";
        version.style.display = "none";
    });

    document.getElementById("aimbot").addEventListener("click", function() {
        h2.innerHTML = "WTF?! <br> Didn't expect that from you tbh.";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });

        logo.style.display = "none";
        version.style.display = "none";
    });

    document.getElementById("colorsettings").addEventListener("click", function() {
        h2.innerHTML = "Color Settings";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("optionColorOptionHolder").style.display = "";
        document.getElementById("menuHeaderColorOptionHolder").style.display = "";
        document.getElementById("behindOptionsColorOptionHolder").style.display = "";
        document.getElementById("skinButtonColorOptionHolder").style.display = "";
        document.getElementById("opacityOptionHolder").style.display = "";
        document.getElementById("windowBorderOptionHolder").style.display = "";
        document.getElementById("resetColorOptionHolder").style.display = "";

        logo.style.display = "none";
        version.style.display = "none";
    });

    document.getElementById("devsettings").addEventListener("click", function() {
        h2.innerHTML = 'Dev Settings <p style="color: red; font-size: 17px">ATTENTION: Need to restart client to apply settings</p>'
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("debugOptionHolder").style.display = "";

        logo.style.display = "none";
        version.style.display = "none";
    });

    /*document.getElementById("customcss").addEventListener("click", function() {
        h2.innerHTML = "Custom CSS | doesn't work?";
        options.forEach(option => {
            document.getElementById(option).style.display = "none";
        });
        document.getElementById("customCSSOptionHolder").style.display = "";
    });

    document.getElementById("defaultsettings").addEventListener("click", function() {
        alert("you have to create them first lol");
    });*/

    //customCSSOptionHolder

    /*const optionHolder = document.createElement('div');
    optionHolder.classList.add('optionholder');
    optionHolder.id = 'customCSSOptionHolder';

    const cssSubmitButtonWrapper = document.createElement('div');
    cssSubmitButtonWrapper.style.display = 'flex';
    cssSubmitButtonWrapper.style.justifyContent = 'center';

    const cssTextarea = document.createElement('textarea');
    cssTextarea.rows = 4;
    cssTextarea.cols = 30;
    cssTextarea.style.maxWidth = '100%';
    cssTextarea.style.minWidth = '100%';
    cssTextarea.placeholder = 'Paste your custom CSS here...';

    const cssSubmit = document.createElement('button');
    cssSubmit.innerHTML = "Apply CSS"
    cssSubmit.style = "padding: 10px 12.5px 10px 12.5px;background-color: #364760;border: none;color: white;font-size: 20px;border: 1px solid black;";
    cssSubmitButtonWrapper.appendChild(cssSubmit);

    optionHolder.appendChild(cssTextarea);
    optionHolder.appendChild(cssSubmitButtonWrapper);

    document.getElementById('rightDiv').appendChild(optionHolder);*/

    // onclick cssSubmit

    const customCSS = "";

    /*cssSubmit.addEventListener('click', function() {
        customCSS = cssTextarea.value;
        console.log(customCSS)
    });*/

    // css
    let skincss = document.createElement('style');
    skincss.innerText = "@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif}.skinwrapper{position:absolute;top:50%;left:50%;max-width:750px;width:100%;background:#232429;/* if I add menuHeaderColor it spawns at a different location lmao, but the color has to stay like that, else the menu is see trough under header*/transform:translate(-50%,-50%);border:solid 1px #000;color:#fff;height:335px;}.skinwrapper header{font-size:23px;font-weight:500;padding:17px 30px;border-bottom:1px solid #000;text-align:center;border-top-left-radius: 10px;border-top-right-radius: 10px;}.skinwrapper header.skinactive{cursor:move;user-select:none;}.skinwrapper .skincontent{display:flex;flex-direction:wrap;flex-wrap:wrap;justify-content:center;}.skincontent .title{margin:15px 0;font-size:29px;font-weight:500}.skincontent p{font-size:16px;text-align:center;display:flex}.skinbutton{width:100%;height:50px;background-color:" + skinButtonColor + ";border:none;color:#fff;font-size:20px}.skinbutton:hover{background-color:" + skinButtonHoverColor + "}.skinclose{color:grey;position:absolute;top:0;right:0;margin-right:15px;margin-top:-6px;background-color:" + skinCloseColor + ";border:none;font-size:35px}.skinclose:hover{color:#fff}p{font-size:20px}input[type=text]{float:right;margin:14px 25px 10px 0;font-weight:700;color:grey}input[type=range]{float:right;margin:16px 20px 10px 0}input[type=checkbox]{float:right;transform:scale(2);margin:14px 25px 5px 0;width:35px;font-weight:700;color:grey;}input[type=button]{float:right;margin:14px 25px 10px 0;}.optiondescr{float:left;margin:10px 0 10px 20px}.optionholder{background-color:" + optionColor + "}hr{width:100%;border:.1px solid #000}/*select{float:right;margin:14px 25px 10px 0;width:50px}*/.skinCategory:hover{background-color:#0798fc}/* doesn't work lol*/" + customCSS;
    document.head.appendChild(skincss);

    // shortcuts

    document.body.addEventListener('keypress', (e) => {
        if (e.key == '1') {
            const wrapperElement = document.getElementById("skinWrapper");
            wrapperElement.style.display = wrapperElement.style.display === "none" ? "" : "none";
        }
    });

    // offline / online status

    /*const status = document.createElement("h2");
    status.innerHTML = "Network Status";
    status.id = "status";
    status.style = "position: absolute; width: 100%; text-align: center; z-index: 1000; color: lightgreen; font-size: 100%; display: none;";
    document.body.appendChild(status);*/

    //Show or Hide Online Status based on JSON
    /*if(jsonobj.Stats.Online) {
        status.style.display = "block";
    } else if (!jsonobj.Stats.Online) {
        status.style.display = "none";
    };*/

    const updateOnlineStatus = () => {
        //document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'

        if (navigator.onLine == 1)
        {
            //status.style.color = "lightgreen";
            document.getElementById('msgBoxText').innerHTML = "Connected...";
            document.getElementById('msgBox').style.display = "initial";

            setTimeout(function() {
                document.getElementById('msgBox').style.display = "none";
            }, 2000);
        } else {
            //status.style.color = "red";
            document.getElementById('msgBoxText').innerHTML = "Lost connection...";
            document.getElementById('msgBox').style.display = "initial";
        }

    }
      
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    
    updateOnlineStatus()

    // ping | with errors haha

    function ping2() {
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

    setInterval(ping2, 1000);

    // custom scope

    /*const scope = document.createElement("div");
    scope.id = "scope";
    scope.style = "position: absolute; z-index: 1000; top: 50.5%; left: 50%; transform: translate(-50%, -50%);";
    document.body.appendChild(scope);

    const scopeImg = document.createElement("img");
    scopeImg.id = "scopeImg";
    scopeImg.style = "height: 300px";
    //scopeImg.src = "https://www.freepnglogos.com/uploads/scope-png/scope-simple-sniper-crosshair-fallout-new-vegas-mods-and-5.png";
    scopeImg.src = "https://i.ibb.co/WpDfGzN/Png-Item-93100.png";
    scope.appendChild(scopeImg);*/

    // stats holder

    const statsHolderWrapper = document.createElement("div");
    statsHolderWrapper.id = "statsHolderWrapper";
    statsHolderWrapper.style = "position: absolute; right: 0;top: 25%; z-index: 1000; margin-right: 6px; font-size: 100%; height: 100%;";
    statsHolderWrapper.innerHTML = `
        <div id="statsHolder" style="z-index: 1000; /*top: 50%;*/ color: white; padding-right: 5px; font-size: 100%; background: #191919; opacity: 0.9;">
    `;
    document.body.appendChild(statsHolderWrapper);
    
    const electron = require('electron');
    const ipcRenderer = electron.ipcRenderer; // apply that later to everything
    
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
    if(jsonobj.Stats.FPS) {
        fpscounter.style.display = "initial";
    } else if (!jsonobj.Stats.FPS) {
        fpscounter.style.display = "none";
    };

    if(jsonobj.Stats.Ping) {
        ping.style.display = "initial";
    } else if (!jsonobj.Stats.Ping) {
        ping.style.display = "none";
    };

    if(jsonobj.Stats.Platform) {
        platform.style.display = "initial";
    } else if (!jsonobj.Stats.Platform) {
        platform.style.display = "none";
    };

    if(jsonobj.Stats.CPU) {
        cpu.style.display = "initial";
    } else if (!jsonobj.Stats.CPU) {
        cpu.style.display = "none";
    };

    if(jsonobj.Stats.memory) {
        mem.style.display = "initial";
    } else if (!jsonobj.Mem) {
        mem.style.display = "none";
    };

    if(jsonobj.Stats.Tmemory) {
        totalMem.style.display = "initial";
    } else if (!jsonobj.Stats.Tmemory) {
        totalMem.style.display = "none";
    };

    if(jsonobj.Stats.Cores) {
        cpuCount.style.display = "initial";
    } else if (!jsonobj.Stats.Cores) {
        cpuCount.style.display = "none";
    };

    if(jsonobj.Stats.Uptime) {
        uptime.style.display = "initial";
    } else if (!jsonobj.Stats.Uptime) {
        uptime.style.display = "none";
    };

    /*const freeMem = document.createElement("h2");
    freeMem.innerHTML = "loading...";
    freeMem.id = "freeMem";
    freeMem.style = "z-index: 1000; color: grey; margin-left: 7.5px; font-size: 100%;"; //display: none;";
    statsHolder.appendChild(freeMem);*/
    
    /*const ram = document.createElement("h2");
    ram.innerHTML = "loading...";
    ram.id = "ram";
    ram.style = "z-index: 1000; color: grey; margin-left: 7.5px; font-size: 100%;"; //display: none;";
    statsHolder.appendChild(ram);*/
    
    ipcRenderer.on('platform',(event,data) => {
        document.getElementById('platform').innerHTML = "Platform: " + data + "<br>";
    });
    ipcRenderer.on('cpu',(event,data) => {
        document.getElementById('cpu').innerHTML = "CPU: " + data.toFixed(2) + "%<br>";
    });
    ipcRenderer.on('mem',(event,data) => {
        document.getElementById('mem').innerHTML = "Memory: " + data.toFixed(2) + "<br>";
    });
    ipcRenderer.on('total-mem',(event,data) => {
        document.getElementById('totalMem').innerHTML = "Tot. Mem.: " + data.toFixed(2) + "%<br>";
    });
    /*ipcRenderer.on('freemem',(event,data) => {
        document.getElementById('freemem').innerHTML = "Free Mem.: " + data.toFixed(2);
    });
    ipcRenderer.on('ram',(event,data) => {
        document.getElementById('ram').innerHTML = "RAM: " + data.toFixed(2);
    });*/
    ipcRenderer.on('cpu-count',(event,data) => {
        document.getElementById('cpuCount').innerHTML = "CPU Cores: " + data + "<br>";
    });
    ipcRenderer.on('uptime',(event,data) => {
        document.getElementById('uptime').innerHTML = "Uptime: " + data.toFixed(2) + "s<br>";
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

    
    // WASD Detector

    // make this more efficient with classes lmao
    const WASD = document.createElement("div");
    WASD.style = "z-index: 1000; position: absolute; top: 90px; left: 5px; display: none;";
    WASD.innerHTML = `
<div style="width: 276px; display: flex; color: white; align-items: center; justify-content: center;">
    <div style="opacity: 0; width: 54px; height: 40px;"></div>
    <div id="w" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">W</div>
    <div style="opacity: 0; width: 86px; height: 40px;"></div>
    <div id="r" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">R</div>
    <div style="opacity: 0; width: 28px; height: 40px;"></div>
</div>
<div style="width: 276px; display: flex; color: white; align-items: center; justify-content: center;">
    <div id="a" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">A</div>
    <div id="s" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">S</div>
    <div id="d" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">D</div>
    <div id="shift" style="background: rgba(255, 255, 255, .2); width: 100px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">shift</div>
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
      w: false,
      a: false,
      s: false,
      d: false,
      r: false,
      shift: false
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
      wElement.style.background = keys.w ? '#232429' : 'rgba(255, 255, 255, .2)';
      aElement.style.background = keys.a ? '#232429' : 'rgba(255, 255, 255, .2)';
      sElement.style.background = keys.s ? '#232429' : 'rgba(255, 255, 255, .2)';
      dElement.style.background = keys.d ? '#232429' : 'rgba(255, 255, 255, .2)';
      rElement.style.background = keys.r ? '#232429' : 'rgba(255, 255, 255, .2)';
      shiftElement.style.background = keys.shift ? '#232429' : 'rgba(255, 255, 255, .2)';
    };
    
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            spaceElement.style.background = '#232429';
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            spaceElement.style.background = 'rgba(255, 255, 255, .2)';
        }
    });
    `;
    
    document.getElementsByTagName('head')[0].appendChild(WASDJS);

});
});