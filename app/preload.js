const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const { settings } = require('cluster');
require('v8-compile-cache');
require('./scripts/players.js');
// Preload things

var elements = {};
var fpsCounterOn = false;
var settingsMenuOpen = false;

// Lets us exit the game lmao
document.addEventListener("keydown", (event) => {
    if (event.code == "Escape") {
        document.exitPointerLock();
    }
})

// Settings Stuff
document.addEventListener("DOMContentLoaded", (event) => {
    ipcRenderer.send('preloadNeedSettings');

    // Swap
    ipcRenderer.send("swapFiles");

    const titleUpdate = setInterval(function () {
        if (!document.title.includes('Deadshot')) {
            document.title = 'Deadshot';
        }
    }, 100);
})

ipcRenderer.on('settingsSettings', (event, preferences) => {
    // I do a sneaky and use the event to store the file path
    let filePath = preferences;
    let userPrefs = JSON.parse(fs.readFileSync(filePath));

    // Load the settings into the form
    for (let pref in userPrefs) {
        if (!!document.querySelector(`select[name="${pref}"]`)) {
            document.querySelector(`select[name="${pref}"]`).value = userPrefs[pref];
        }
        else {
            if (document.querySelector(`input[name="${pref}"]`).type == 'checkbox') {
                document.querySelector(`input[name="${pref}"]`).checked = userPrefs[pref];
            }
            else {
                document.querySelector(`input[name="${pref}"]`).value = userPrefs[pref];
            }
        }
    }
});

function loadSettingsMenu(filedir){
    var clientSettingsDiv = document.createElement("div");
    clientSettingsDiv.setAttribute("id", "settingsDivCli");
    clientSettingsDiv.setAttribute("class", "inactiveSettings");
    clientSettingsDiv.setAttribute("style", "z-index: 100; position: fixed; opacity: 1; visibility: visible; margin-left: 682.5px; margin-top: 590px; transform: translate(-50%, -50%) scale(1.1);");
    clientSettingsDiv.innerHTML = fs.readFileSync(path.join(filedir, "./settings/settings.html"), "utf8");
    document.body.appendChild(clientSettingsDiv);

    var activeMenu = document.getElementById("settingsDiv");
    setInterval(function () {
        if(settingsMenuOpen){
            var style = activeMenu.getAttribute("style");
            clientSettingsDiv.setAttribute("style",style);
        }
    }, 20);
}

function switchSettingsMenu(){
    var activeMenu = document.getElementsByClassName("activeSettings")[0];
    var inactiveMenu = document.getElementsByClassName("inactiveSettings")[0];

    activeMenu.setAttribute("class", "inactiveSettings");
    inactiveMenu.setAttribute("class", "activeSettings");

    var activeMenu = document.getElementById("settingsDiv");
    var clientSettingsDiv = document.getElementById("settingsDivCli");
    var style = activeMenu.getAttribute("style");
    clientSettingsDiv.setAttribute("style",style);

    settingsMenuOpen = !settingsMenuOpen;

    ipcRenderer.send('settingsNeedSettings');
}

// When Settings are recieved run scripts
ipcRenderer.on('preloadSettings', (event, preferences, version, filedir) => {
    let filePath = preferences;
    let userPrefs = JSON.parse(fs.readFileSync(filePath));

    let btn = document.createElement("button");
    btn.innerHTML = "GG";
    btn.type = "submit";
    btn.name = "formBtn";
    btn.style = "position: absolute;left: 100;top: 100;z-index: 1000;";
    document.body.appendChild(btn);

    // FPS Counter
    if(userPrefs['fpsCounter'] == true){
        fpsCounterOn = true;
        var times = [];
        var fps;
        var fpsOut = document.createElement("h2");
        fpsOut.style.position = "fixed";
        fpsOut.style.color = "grey";
        fpsOut.style.left = 0;
        fpsOut.style.top = 0;
        document.body.appendChild(fpsOut);
    
        function refreshLoop() {
            if(fpsCounterOn){
                window.requestAnimationFrame(function() {
                    const now = performance.now();
                    while (times.length > 0 && times[0] <= now - 1000) {
                        times.shift();
                    }
                    times.push(now);
                    fps = times.length;
                   fpsOut.innerText = fps + " FPS";
                    refreshLoop();
                });
            } else {
                fpsOut.remove();
            }
        }
    
        refreshLoop();
    }

    // Special Discord RPC script
    const rpcScript = (require("./scripts/discord-rpc"));
    rpcScript();

    // Chat Button for Emote Picker
    if (userPrefs['disableEmotes'] != true) {
    //    const elem = document.createElement('div');
    //    elem.setAttribute("id", "emotePicker");
    //    elem.setAttribute("style","z-index: 2; position: absolute; margin-left: 10px; width: 100px; padding: 6px; padding-left: 0; font-size: 14px; box-sizing: border-box; background-color: rgba(0,0,0,.4); border: 2px solid rgba(0,0,0,.1); pointer-events: all; border-radius: 5px; text-align: center; color: #fff");
    //    elem.innerHTML = '<img id="emoteIcon" src="https://media.discordapp.net/attachments/901905234861883432/965766725205364766/smile.png" width="40px" height="40px" class="material-icons" style="color:#fff;"></img><div id="recTimer">[F9]</div>';
    //    const target = document.querySelector('#voiceDisplay');
    //    target.parentNode.insertBefore(elem, target.nextSibling);
    }

    // Settings Menu Thing
    var settingsHolder = document.getElementById('settingsDiv');
    settingsHolder.setAttribute("class", "activeSettings");
    var settingHeader = document.createElement('div');
    settingHeader.setAttribute("class", "setting");
    settingHeader.setAttribute("style", "color:gray;margin-top: 14px; margin-bottom: 14px;");
    settingHeader.innerHTML = `<p style="font-size: 18px; margin-top: 2px;">Game Settings:</p>`;
    var settingSeparator = document.createElement('div');
    settingSeparator.setAttribute("class", "bar");
    settingsHolder.insertBefore(settingSeparator, settingsHolder.childNodes[0]);
    settingsHolder.insertBefore(settingHeader, settingsHolder.childNodes[0]);

    settingSeparator = document.createElement('div');
    settingSeparator.setAttribute("class", "bar");
    settingsHolder.appendChild(settingSeparator);
    settingHeader = document.createElement('div');
    settingHeader.setAttribute("id", "clientSettingsTab");
    settingHeader.setAttribute("style", "color:white;margin-top: 14px; margin-bottom: 14px; width: 200px; height: 40px; text-align:center; border-radius:4px; border:2px solid gray");
    settingHeader.innerHTML = `<p style="font-size: 18px; margin-top: 8px;">Edit Client Settings</p>`;
    settingsHolder.appendChild(settingHeader);

    loadSettingsMenu(filedir);

    document.getElementById('clientSettingsTab').addEventListener("click", (event) => {
        switchSettingsMenu();
    });
    document.getElementById('gameSettingsTab').addEventListener("click", (event) => {
        switchSettingsMenu();
    });
});

// CSS
ipcRenderer.on('injectCSS', (event, css) => {
    let s = document.createElement("style");
    s.setAttribute("class", "clientCSS");
    s.setAttribute("id", "clientCSS");
    s.innerHTML = css;
    document.getElementsByTagName("body")[0].appendChild(s);
});

// Badges
var elements = null;
ipcRenderer.on('badges', (event) => {
    const fetch = require('node-fetch');
    let settings = { method: "Get" };
    let url = "https://creepycats.github.io/api/gatoclient/badges.json";
    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            const t = setInterval(function () { usernameIcons(json); }, 100);
        });
});

function usernameIcons(data) {
    const userData = data;
    // Hopefully this doesnt cause lag now
    // Dev Clan Color: #40C4FF
    elements = document.querySelectorAll(".leaderName, .leaderNameM, .newLeaderName, .newLeaderNameM, .newLeaderNameF, .menuClassPlayerName, .floatR, .endTableN");
    for (var i = 0; i < elements.length; i++) {
        // Menu Things
        if (!elements[i].firstElementChild) {
            for (let obj in userData) {
                if (userData[obj] instanceof Object) {
                    badgeTest(elements[i], userData[obj], 1);
                }
            }
        }
        // Match End Table
        if (elements[i].getAttribute("class") == "endTableN") {
            for (let obj in userData) {
                if (userData[obj] instanceof Object) {
                    badgeTest(elements[i], userData[obj], 2);
                }
            }
        }
        // Leaderboard
        if (elements[i].getAttribute("class") == "leaderName" || elements[i].getAttribute("class") == "leaderNameM" || elements[i].getAttribute("class") == "leaderNameF") {
            for (let obj in userData) {
                if (userData[obj] instanceof Object) {
                    badgeTest(elements[i], userData[obj], 3);
                }
            }          
        }
        // New Leaderboard
        if (elements[i].getAttribute("class") == "newLeaderName" || elements[i].getAttribute("class") == "newLeaderNameM" || elements[i].getAttribute("class") == "newLeaderNameF") {
            for (let obj in userData) {
                if (userData[obj] instanceof Object) {
                    badgeTest(elements[i], userData[obj], 3);
                }
            }
        }
    }
}

function badgeTest(element, user, type) {
    var accountName = user['accountName'];
    var badgeName = user['badge'];
    var clanName = user['clan'];
    if (user['hasPremiumName'] == true) {
        var premiumName = user['premiumName'];
        // Premium On
        if (type == 1) {
            if (element.innerHTML == accountName || element.innerHTML == premiumName) {
                element.setAttribute('id', badgeName);
            }
        }
        else if (type == 2) {
            if (element.getAttribute("href") == './social.html?p=profile&q=' + accountName) {
                element.setAttribute('id', badgeName);
            }
        }
        else if (type == 3) {
            if (element.innerHTML == accountName + '<span style="color:#fff"> ' + clanName + '</span>' || element.innerHTML == premiumName + '<span style="color:#fff"> ' + clanName + '</span>' || element.innerHTML == accountName + '<span style="color:#40C4FF"> ' + clanName + '</span>' || element.innerHTML == premiumName + '<span style="color:#40C4FF"> ' + clanName + '</span>') {
                element.setAttribute('id', badgeName);
            }
        }
    }
    else {
        // Premium Off
        if (type == 1) {
            if (element.innerHTML == accountName) {
                element.setAttribute('id', badgeName);
            }
        }
        else if (type == 2) {
            if (element.getAttribute("href") == './social.html?p=profile&q=' + accountName) {
                element.setAttribute('id', badgeName);
            }
        }
        else if (type == 3) {
            if (element.innerHTML == accountName + '<span style="color:#fff"> ' + clanName + '</span>' || element.innerHTML == accountName + '<span style="color:#40C4FF"> ' + clanName + '</span>') {
                element.setAttribute('id', badgeName);
            }
        }
    }
}

// Emotes
ipcRenderer.on('emotes', (event) => {
    const e = setInterval(Emotes, 100);
});

function Emotes() {
    // Find Latest
        //var x = document.querySelectorAll('.chatMsg')[i];
    var x = document.getElementById('chatList').lastChild.childNodes[0].lastChild;
        // x.setAttribute('id', x.innerHTML);

        // Emotes
        if (x.innerHTML == '‎bruhcat‎') {
            x.innerHTML = '&lrm;<img src="https://cdn.discordapp.com/emojis/859521142092333079.png?size=96" width="32" height="32">&lrm;';
        }
        if (x.innerHTML == '‎sheesh‎') {
            x.innerHTML = '&lrm;<img src="https://cdn.discordapp.com/emojis/776184047557804062.png?size=96" width="32" height="32">&lrm;';
        }
        if (x.innerHTML == '‎kek‎') {
            x.innerHTML = '&lrm;<img src="https://cdn.discordapp.com/emojis/793731121052909598.png?size=96" width="32" height="32">&lrm;';
        }
        if (x.innerHTML == '‎krunktwerk‎') {
            x.innerHTML = '&lrm;<img src="https://cdn.discordapp.com/emojis/861985132563267595.gif?size=96" width="32" height="32">&lrm;';
        }
        if (x.innerHTML == '‎xd‎') {
            x.innerHTML = '&lrm;<img src="https://cdn.discordapp.com/attachments/789269252779671603/903795195030691840/666140879488024587.png" width="32" height="32">&lrm;';
        }
        if (x.innerHTML == '‎smiledog‎') {
            x.innerHTML = '&lrm;<img src="https://cdn.discordapp.com/emojis/837689670023381062.png?size=96" width="32" height="32">&lrm;';
        }

        // Commands
        if (x.innerHTML == '‎/clear‎' && x.getAttribute('id') != 'command') {
            // Set as command
            x.setAttribute('id', 'command');
            // Clear chat
            var messages = document.getElementById('chatList').children;
            for(var j = messages.length - 1; j > -1; j--){
                messages[j].remove();
            }
            // Chat Message
            const chatHolder = document.getElementById("chatList");
            const message = document.createElement("div");
            message.setAttribute("class", "chatItem");
            message.innerHTML = '<span class="chatMsg" style="color:#30ffea">&lrm;Cleared Chat&lrm;</span>';
            chatHolder.appendChild(message);
        }
        if (x.innerHTML == '‎/help‎' && x.getAttribute('id') != 'command') {
            // Set as command
            x.setAttribute('id','command');
            // Chat Message
            // Help
            const chatHolder = document.getElementById("chatList");
            const message = document.createElement("div");
            message.setAttribute("id", "chatMsg_cmd");
            message.setAttribute("data-tab", "-1");
            message.innerHTML = '<div class="chatItem"><span class="chatMsg" style="color:#30ffea; text-decoration:underline;">&lrm;===Help===&lrm;</span></div>';
            chatHolder.appendChild(message);
            // /clear - Clears Chat
            const message2 = document.createElement("div");
            message2.setAttribute("id", "chatMsg_cmd");
            message2.setAttribute("data-tab", "-1");
            message2.innerHTML = '<div class="chatItem"><span class="chatMsg" style="color:#30ffea">&lrm;/clear - Clears Chat&lrm;</span></div>';
            chatHolder.appendChild(message2);
        }

}