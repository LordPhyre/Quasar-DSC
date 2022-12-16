// unlock curser
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