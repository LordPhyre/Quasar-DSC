const { create } = require("./invitemenu");

const optionholders = [];
const optiondescrs = [];
const optioninputs = [];
const optionhrs = [];

const createElement = (type, className, id, innerText) => {
    const element = document.createElement(type);
    element.className = className;
    element.id = id;
    element.innerText = innerText;
    element.backgroundColor = "var(--optionColor)";
    return element;
};

let keyNumber = 1;
const createOptionHolder = (id, descrText, inputId, jsonobj) => {
    const optionHolder = createElement('div', 'optionholder', id, '');
    const optionDescr = createElement('p', 'optiondescr', '', descrText);
    const optionInput = createElement('input', '', inputId, '');
    const optionHr = createElement('hr', '', '', '');
    const optionCheck = document.createElement('input');
    optionCheck.type = 'checkbox';
    optionCheck.id = 'colorblindCheck';
    optionCheck.style = 'margin-top: 18px; margin-right: 5px;';
    optionHolder.style.backgroundColor = 'var(--optionColor)';

    if (id == "texturePackOptionHolder") {
        optionInput.type = 'button';
        optionInput.value = 'Open Folder';
        optionInput.style.width = '110px';
    } else if (id == "downloadTexturePackOptionHolder") {
        optionInput.type = 'button';
        optionInput.value = 'Download Pack';
        optionInput.style.width = '110px';
    } else {
        optionInput.type = 'text';
        optionInput.style.width = '100px';
    }
    if (id.includes('shortcutOptionHolder')) {
        optionInput.style.float = 'right';
        if (id == 'shortcutOptionHolder') {
            optionInput.placeholder = 'GG';
            optionInput.setAttribute('value', jsonobj.Shortcuts.one);
        } else if (id == 'shortcutOptionHolder2') {
            optionInput.placeholder = 'hello guys';
            optionInput.setAttribute('value', jsonobj.Shortcuts.two);
        } else if (id == 'shortcutOptionHolder3') {
            optionInput.placeholder = 'noob';
            optionInput.setAttribute('value', jsonobj.Shortcuts.three);
        } else if (id == 'shortcutOptionHolder4') {
            optionInput.placeholder = 'lmao';
            optionInput.setAttribute('value', jsonobj.Shortcuts.four);
        } else if (id == 'shortcutOptionHolder5') {
            optionInput.placeholder = 'wsg';
            optionInput.setAttribute('value', jsonobj.Shortcuts.five);
        } 
        optionInput.style.width = '140px';
        optionInput.name = inputId;
        optionInput.id = keyNumber++;
    } else if (id == 'texturePackOptionHolder' || id == "downloadTexturePackOptionHolder") {
        optionInput.placeholder = '';
    } else if (id == 'RPCTextOptionHolder') {
        optionInput.placeholder = 'Slapping noobs';
        optionInput.style.width = '200px';
        optionInput.setAttribute('value', jsonobj.RPC.text);
    } else if (id == 'colorblindOptionHolder') {
        optionInput.style.float = 'right';
        optionInput.style.width = '100px';
        optionInput.placeholder = '#FF0';
        optionInput.setAttribute('value', jsonobj.ColorblindmodeColor);
    }

    optionholders.push(optionHolder);
    optiondescrs.push(optionDescr);
    optioninputs.push(optionInput);
    optionhrs.push(optionHr);

    optionHolder.appendChild(optionDescr);
    optionHolder.appendChild(optionInput);
    if (id == 'colorblindOptionHolder') {
        optionHolder.appendChild(optionCheck);
    }
    optionHolder.appendChild(optionHr);

    rightDiv.appendChild(optionHolder);
};

module.exports = {
    createOptionHolder: createOptionHolder
};