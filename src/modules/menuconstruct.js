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
                    <button class="skinCategory" id="skinFolderButton" style="padding: 10px 12.5px 10px 12.5px;background-color: var(--optionColor);border: none;color: white;font-size: 20px;">| <span style="text-decoration: underline; cursor: pointer;">Folder</span></button>
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

    // close button
    const skinCloseButton = document.createElement('button');
    skinCloseButton.className = 'skinclose';
    skinCloseButton.innerText = '✖';
    skinCloseButton.id = 'skinclose';
    document.getElementById('skinWrapper').appendChild(skinCloseButton);

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

    // some juicy js
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `dragElement(document.getElementById("skinWrapper"));function dragElement(elmnt) {var pos1 = 0,pos2 = 0,pos3 = 0,pos4 = 0;document.getElementById("skinheader").onmousedown = dragMouseDown;function dragMouseDown(e) {e = e || window.event;e.preventDefault();pos3 = e.clientX;pos4 = e.clientY;document.onmouseup = closeDragElement;document.onmousemove = elementDrag;}function elementDrag(e) {e = e || window.event;e.preventDefault();pos1 = pos3 - e.clientX;pos2 = pos4 - e.clientY;pos3 = e.clientX;pos4 = e.clientY;elmnt.style.top = (elmnt.offsetTop - pos2) + "px";elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";}function closeDragElement() {document.onmouseup = null;document.onmousemove = null;}};document.getElementById('skinclose').addEventListener('click',function(){document.getElementById('skinWrapper').style.display='none'});`;
    document.getElementsByTagName('head')[0].appendChild(script);

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