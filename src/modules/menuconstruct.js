function menuconstruct(opacity, skinWrapperBorderRadius, menuHeaderColor, behindOptionsColor, client_version, optionColor) {

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
}

module.exports = {
    menuconstruct: menuconstruct
};