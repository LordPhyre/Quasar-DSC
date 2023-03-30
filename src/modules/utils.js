function addTab(tab) {
    const optionButton = document.createElement('button');
    optionButton.className = 'skinbutton';
    optionButton.innerText = tab.text;
    optionButton.id = tab.id;
    document.getElementById('leftDiv').appendChild(optionButton);
}

function addCheckbox(holderId, descrText, checkId) {
    // holds the sub-options
    const optionHolder = document.createElement('div');
    optionHolder.className = 'optionholder';
    optionHolder.id = holderId;
    
    // sub-option title
    const optionDescr = document.createElement('p');
    optionDescr.className = 'optiondescr';
    optionDescr.innerText = descrText;
    
    // checkbox
    const optionCheck = document.createElement('input');
    optionCheck.type = 'checkbox';
    optionCheck.id = checkId;
    
    // putting the elements together, <hr> is for formatting (breaks without)
    optionHolder.innerHTML = `
        ${optionDescr.outerHTML}
        ${optionCheck.outerHTML}
        <hr>
    `;
    rightDiv.appendChild(optionHolder);
}

function showTab(tabId, pageTitle, elementIds, optionList, additionalHide) {
    PageTitle.innerHTML = pageTitle;
    hideOptions(optionList, additionalHide);
    hideLogoVersionAndOpenCloseText();
    hideStuff();
    for (const elementId of elementIds) {
        document.getElementById(elementId).style.display = "block";
    }
}

function hideLogoVersionAndOpenCloseText() {
    logo.style.display = "none";
    version.style.display = "none";
    openCloseText.style.display = "none";
}

function hideStuff() {
    shortcutOptionHolder.style.display = "none";
    shortcutOptionHolder2.style.display = "none";
    shortcutOptionHolder3.style.display = "none";
    shortcutOptionHolder4.style.display = "none";
    shortcutOptionHolder5.style.display = "none";
    texturePackOptionHolder.style.display = "none";
    downloadTexturePackOptionHolder.style.display = "none";
    RPCTextOptionHolder.style.display = "none";
    skinCategoryoptionHolder.style.display = "none";
    skyboxoptionHolder.style.display = "none";
}

function hideOptions(optionList, additionalHide) {
    optionList.forEach((option) => {const element = document.getElementById(option.holderId);element.style.display = "none";});
    additionalHide.forEach((id) => {const element = document.getElementById(id);element.style.display = "none";});
}

module.exports = {
    addTab: addTab,
    addCheckbox: addCheckbox,
    showTab: showTab,
    hideLogoVersionAndOpenCloseText: hideLogoVersionAndOpenCloseText,
    hideStuff: hideStuff,
    hideOptions: hideOptions,
};