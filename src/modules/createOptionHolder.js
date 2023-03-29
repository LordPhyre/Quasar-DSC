const optionholders = [];
const optiondescrs = [];
const optioninputs = [];
const optionhrs = [];

const createElement = (type, className, id, innerText) => {
    const element = document.createElement(type);
    element.className = className;
    element.id = id;
    element.innerText = innerText;
    return element;
};

let keyNumber = 1;
const createOptionHolder = (id, descrText, inputId, jsonobj) => {
    const optionHolder = createElement('div', 'optionholder', id, '');
    const optionDescr = createElement('p', 'optiondescr', '', descrText);
    const optionInput = createElement('input', '', inputId, '');
    const optionHr = createElement('hr', '', '', '');
    if (id == "texturePackOptionHolder") {
        optionInput.type = 'button'; // normally I wouldn't do this, just so I can make it more efficient
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
        optionInput.style.float = "right";
        optionHolder.style.backgroundColor = jsonobj.Colors.optionColor;
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
    }

    optionholders.push(optionHolder);
    optiondescrs.push(optionDescr);
    optioninputs.push(optionInput);
    optionhrs.push(optionHr);

    optionHolder.appendChild(optionDescr);
    optionHolder.appendChild(optionInput);
    optionHolder.appendChild(optionHr);

    //optionholders.forEach(holder => {
        rightDiv.appendChild(optionHolder);
    //});
};

module.exports = {
    createOptionHolder: createOptionHolder
};