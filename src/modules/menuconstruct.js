function menuconstruct(opacity, skinWrapperBorderRadius, menuHeaderColor, behindOptionsColor, client_version, optionColor, msgBoxColor) {

    const logoFont = document.createElement('link')
    logoFont.href = "https://fonts.cdnfonts.com/css/aquire";
    logoFont.rel = "stylesheet";
    document.getElementsByTagName('head')[0].appendChild(logoFont);

    document.documentElement.style.setProperty('--opacity', opacity);
    document.documentElement.style.setProperty('--borderRadius', skinWrapperBorderRadius + "px");
    document.documentElement.style.setProperty('--menuHeaderColor', menuHeaderColor);
    document.documentElement.style.setProperty('--behindOptionsColor', behindOptionsColor);
    document.documentElement.style.setProperty('--optionColor', optionColor);
    document.documentElement.style.setProperty('--msgBoxColor', msgBoxColor);

    const skinWrapper = document.createElement('div');
    skinWrapper.className = 'skinwrapper';
    skinWrapper.id = "skinWrapper";
    skinWrapper.style = "::-webkit-scrollbar{border:1px solid #d5d5d5};opacity: var(--opacity); border-radius: var(--borderRadius); z-index: 9999;";
    skinWrapper.innerHTML = `
        <header id="skinheader" style="background: var(--menuHeaderColor);" class="titlebar">Main Menu</header>
        <div id="mainDiv" style="background: var(--behindOptionsColor);"></div>
        <div id="leftDiv" style="float: left; width: 40%; height: 263px; overflow: scroll; overflow-x: hidden; overflow-y: auto;"></div>
        <div id="rightDiv" style="float: right; width: 60%; height: 263px; overflow: scroll; overflow-x: hidden; overflow-y: auto;">
            <h2 id="PageTitle" style="text-align: center; margin: 10px 0 10px 0;">Home</h2>
            <h2 id="logo" style="font-family: 'Aquire', sans-serif; text-align: center; color: white; font-size: 75px; margin-top: 30px;">Quasar<br></h2>
            <h2 id="version" style="font-family: 'Aquire', sans-serif; text-align: center; color: white; font-size: 17.5px;">v${client_version} - PUBLIC</h2>
            <h3 id="openCloseText" style="sans-serif; text-align: center; color: white; font-size: 14px; display: block; margin-top: 50px">Use the F1/fn + F1 key on your keyboard to toggle this menu</h3>
            <div id="skinCategoryoptionHolder" class="optionholder">
                <div style="display: flex; justify-content: center;"> <!-- use classes later -->
                    <button class="skinCategory" id="allButton" style="padding: 10px 12.5px 10px 12.5px;background-color: var(--optionColor);border: none;color: white;font-size: 20px;">All</button>
                    <button class="skinCategory" id="awpButton" style="padding: 10px 12.5px 10px 12.5px;background-color: var(--optionColor);border: none;color: white;font-size: 20px;">AWP</button>
                    <button class="skinCategory" id="ar2Button" style="padding: 10px 12.5px 10px 12.5px;background-color: var(--optionColor);border: none;color: white;font-size: 20px;">AR2</button>
                    <button class="skinCategory" id="vectorButton" style="padding: 10px 12.5px 10px 12.5px;background-color: var(--optionColor);border: none;color: white;font-size: 20px;">Vector</button>
                    <button class="skinCategory" id="shotgunButton" style="padding: 10px 12.5px 10px 12.5px;background-color: var(--optionColor);border: none;color: white;font-size: 20px;">Shotgun</button>
                    <button class="skinCategory" id="skinFolderButton" style="padding: 10px 12.5px 10px 12.5px;background-color: var(--optionColor);border: none;color: white;font-size: 20px;"><span style="text-decoration: underline; cursor: pointer;">Folder</span></button>
                </div>
            </div> 
            <div id="skincontent" class="skincontent" style="background: var(--optionColor);"></div>
            <div id="skinSkyboxDivider">
                <hr style="height:5px; background-color: #1d00ff; border: none; width: 410px; margin: 15px; border-radius: 5px;">
                <h2 style="text-align: center; margin: 10px 0 10px 0;">Skyboxes</h2>
            </div>
            <div id="skyboxoptionHolder" class="optionholder">
                <div style="display: flex; justify-content: center;">
                    <button class="skinCategory" id="skyboxFolderButton" style="padding: 10px 12.5px 10px 12.5px;background-color: var(--optionColor);border: none;color: white;font-size: 20px; text-decoration: underline; cursor: pointer;">Open Folder</button>
                </div>
            </div>
            <div id="skyboxcontent" class="skyboxcontent" style="background: var(--optionColor);"></div>
            <div id="skyboxTextureDivider">
                <hr style="height:5px; background-color: #1d00ff; border: none; width: 410px; margin: 15px; border-radius: 5px;">
                <h2 style="text-align: center; margin: 10px 0 10px 0;">Texture Packs</h2>
            </div>
            <div id="wallpaperoptionHolder" class="optionholder">
            <div style="display: flex; justify-content: center;">
                <button class="skinCategory" id="wallpaperFolderButton" style="padding: 10px 12.5px 10px 12.5px;background-color: var(--optionColor);border: none;color: white;font-size: 20px; text-decoration: underline; cursor: pointer;">Open Folder</button>
            </div>
        </div>
        </div>
    `;
    document.body.appendChild(skinWrapper);

    var skinHeader = document.getElementById("skinheader");
    var isDragging = false;
    var dragOffset = { x: 0, y: 0 };
    
    skinWrapper.addEventListener('mousedown', function(e) {
      if (e.target !== skinHeader) {
        e.stopPropagation();
      } else {
        isDragging = true;
        dragOffset.x = e.clientX - skinWrapper.offsetLeft;
        dragOffset.y = e.clientY - skinWrapper.offsetTop;
      }
    });
    
    document.addEventListener('mousemove', function(e) {
      if (isDragging) {
        skinWrapper.style.left = (e.clientX - dragOffset.x) + 'px';
        skinWrapper.style.top = (e.clientY - dragOffset.y) + 'px';
      }
    });
    
    document.addEventListener('mouseup', function(e) {
      isDragging = false;
    });
    

    // close button
    const skinCloseButton = document.createElement('button');
    skinCloseButton.className = 'skinclose';
    skinCloseButton.innerText = '✖';
    skinCloseButton.id = 'skinclose';
    document.getElementById('skinWrapper').appendChild(skinCloseButton);

    document.getElementById('skinclose').addEventListener('click', function() {
        document.getElementById('skinWrapper').style.display = 'none';
    });

    // hide and show skins on click
    function toggleSkins(displayType) {
        const skinContainers = document.querySelectorAll('#awp, #ar2, #vector, #shotgun');
        skinContainers.forEach((container) => {
            container.style.display = displayType;
        });
    }    

    document.getElementById('allButton').addEventListener('click', function() {
        const allSkins = document.querySelectorAll('#awp, #ar2, #vector, #shotgun');
        allSkins.forEach((skin) => {
            skin.style.display = "initial";
        });
    });

    ['awp', 'ar2', 'vector', 'shotgun'].forEach(function(type) {
        document.getElementById(type + 'Button').addEventListener('click', function() {
            const skins = document.querySelectorAll('#' + type);
            toggleSkins("none");
            skins.forEach(skin => {
            skin.style.display = "initial";
            });
        });
    });
    
    document.getElementById('skinFolderButton').addEventListener('click', function() {
        require('electron').ipcRenderer.send('openSkinFolder')
    });

    const msgBoxWrapper = document.createElement('div');
    msgBoxWrapper.style = "position: absolute; width: 100%; z-index: 1001; display: flex; justify-content: center; align-items: center; margin-top: 10px;"
    msgBoxWrapper.id = "msgBoxWrapper"
    msgBoxWrapper.innerHTML = `
        <div id="msgBox" style="background: var(--msgBoxColor);; text-align: center; z-index: 1001; border-radius: 10px; font-size: 20px; color: white; display: none;">
            <p id="msgBoxText" style='line-height: 2.2; width: 325px; height: 45px; border: 1px solid black;'></p>
        </div>
    `;
    document.body.appendChild(msgBoxWrapper);

    document.getElementById('skinWrapper').style.display='none'
}

module.exports = {
    menuconstruct: menuconstruct
};