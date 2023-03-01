const fs = require('fs');
//const {ipcRenderer} = require('electron'); doesn't work, idk why tbh
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer; // apply that later to everything

document.addEventListener("DOMContentLoaded", function() {

//Receive user datapath and save as variable
ipcRenderer.on('SendUserData', (event, message) => {

    // read JSON values
    const jsonpath = message;

    // Parse the contents of the file into a JavaScript object
    let jsonobj = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));

    // do this later by sending reload from menu to main and from main to here, then call funtion -> less cost of operation
    setInterval(function(){ 
        let jsonobj = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));
      
        msgBoxColor = jsonobj.Colors.msgBoxColor;
        document.getElementById("msgBox").style.background = msgBoxColor;

        twoValue = jsonobj.Shortcuts.two;
        threeValue = jsonobj.Shortcuts.three;
        fourValue = jsonobj.Shortcuts.four;
        fiveValue = jsonobj.Shortcuts.five;

        shortcuts.innerHTML = "[" + one + "] " + oneValue + "  [" + two + "] " + twoValue + "  [" + three + "] " + threeValue + "  [" + four + "] " + fourValue + "  [" + five + "] " + fiveValue;

        if(jsonobj.Stats.Shortcuts) {
            shortcuts.style.display = "block";
        } else if (!jsonobj.Stats.Shortcuts) {
            shortcuts.style.display = "none";
        };

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

        if(jsonobj.WASD) {
            WASD.style.display = "block";
        } else if (!jsonobj.WASD) {
            WASD.style.display = "none";
        };
    }, 1000);

    var msgBoxColor = jsonobj.Colors.msgBoxColor; //"#2a394f";

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

    // get the shortcut values to later reuse
    const one = "1"
    const two = "2";
    const three = "3";
    const four = "4";
    const five = "5";

    var oneValue = jsonobj.Shortcuts.one;
    var twoValue = jsonobj.Shortcuts.two;
    var threeValue = jsonobj.Shortcuts.three;
    var fourValue = jsonobj.Shortcuts.four;
    var fiveValue = jsonobj.Shortcuts.five;

    // shortcut initialisation

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

        if (event.key in keyContentMap) {
            chatInput.value = keyContentMap[event.key];
            chatInput.dispatchEvent(event222);
            chatInput.dispatchEvent(event222);
        }
    });

    // shortcutdisplay

    const shortcuts = document.createElement("h2");
    shortcuts.innerHTML = "[" + one + "] " + oneValue + " [" + two + "] " + twoValue + "  [" + three + "] " + threeValue + "  [" + four + "] " + fourValue + "  [" + five + "] " + fiveValue;
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

    // stats holder

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

    const WASD = document.createElement("div");
    WASD.style = "z-index: 1000; position: absolute; top: 90px; left: 5px; display: none;";

    const keydata = window.localStorage.getItem('keyb');
    const game_keys = JSON.parse(keydata);

    // {"up":"W","down":"S","left":"A","right":"D","space":"Space","chat":"Enter","pause":"Escape","leaderboard":"Tab","ads":"L","shoot":"K","crouch":"Shift","reload":"R"}

    const up = game_keys.up;
    const down = game_keys.down;
    const left = game_keys.left;
    const right = game_keys.right;
    const reload = game_keys.reload;
    const crouch = game_keys.crouch;
    const space = game_keys.space;

    // WASD Detector
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
        if (event.code === '${space}') {
            spaceElement.style.background = '#232429';
        }
    });
    document.addEventListener('keyup', (event) => {
        if (event.code === '${space}') {
            spaceElement.style.background = 'rgba(255, 255, 255, .2)';
        }
    });
    `;
    
    document.getElementsByTagName('head')[0].appendChild(WASDJS);


    //Add Wallpaper Thing
    
    ipcRenderer.on('wallpaper-path',(event,path) => {
        // replace \ with / (doesn't work the other way)
        var newPath = path.replace(/\\/g, "/");

        const bgcss = document.createElement('style');
        bgcss.innerText = ``;
        document.head.appendChild(bgcss);
        const chat = document.querySelector("input[placeholder='[Enter] to use chat']");

        function wallpaperSetter() {
            if (chat.style.visibility == "hidden") {
                bgcss.innerText = `            
                    html, body {background: url("${newPath}") !important;
                        background-size: cover !important;
                    }`;
                document.getElementById("custombg").style.display = "none"
                
            } else {
                bgcss.innerText = ``;
                document.getElementById("custombg").style.display = "block"
            }
            
            ipcRenderer.on('toggleFullscreen',() => {
                document.getElementById("custombg").style.display = "block"
                setTimeout(() => {
                    bg_canvas.style.display = "none";
                }, 1000);
            });
        };
        

            setInterval(wallpaperSetter, 1000);


    });
    
    setTimeout(() => {
        document.querySelector("body > canvas:nth-last-of-type(1)").setAttribute("id", "custombg");
    }, 2000);
    
    
});
});
