const fs = require('fs');
const createOptionHolder = require('./createOptionHolder.js');
function shortcuts(jsonobj, jsonpath) {
    // the vars are like that in case we add shortcuts that also work with other keys
    var one = "1"
    var two = "2";
    var three = "3";
    var four = "4";
    var five = "5";

    var oneValue = jsonobj.Shortcuts.one;
    var twoValue = jsonobj.Shortcuts.two;
    var threeValue = jsonobj.Shortcuts.three;
    var fourValue = jsonobj.Shortcuts.four;
    var fiveValue = jsonobj.Shortcuts.five;

    const shortcuts = document.createElement("h2");
    shortcuts.innerHTML = "[" + one + "] " + oneValue + " [" + two + "] " + twoValue + "  [" + three + "] " + threeValue + "  [" + four + "] " + fourValue + "  [" + five + "] " + fiveValue;
    shortcuts.type = "submit";
    shortcuts.id = "shortcutsdisplay";
    shortcuts.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 2px; margin-left: 5px; outline: none; border: none; font-size: 100%; display: none;";
    document.body.appendChild(shortcuts);

    function updateShortcutBar() {
        oneValue = jsonobj.Shortcuts.one;
        twoValue = jsonobj.Shortcuts.two;
        threeValue = jsonobj.Shortcuts.three;
        fourValue = jsonobj.Shortcuts.four;
        fiveValue = jsonobj.Shortcuts.five;
        
        shortcuts.innerHTML = "[" + one + "] " + oneValue + " [" + two + "] " + twoValue + "  [" + three + "] " + threeValue + "  [" + four + "] " + fourValue + "  [" + five + "] " + fiveValue;
    }

    //Show or Hide Shortcuts based on JSON
    if(jsonobj.Stats.Shortcuts) { shortcuts.style.display = "block"; }
    else if (!jsonobj.Stats.Shortcuts) { shortcuts.style.display = "none"; };

    // Making the Textboxes
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

    // defining the options with input fields (I could put them into an array and to for each later...)
    createOptionHolder.createOptionHolder('shortcutOptionHolder', 'Shortcut Option [1]', 'shortcutOptionInput', jsonobj);
    createOptionHolder.createOptionHolder('shortcutOptionHolder2', 'Shortcut Option [2]', 'shortcutOptionInput2', jsonobj);
    createOptionHolder.createOptionHolder('shortcutOptionHolder3', 'Shortcut Option [3]', 'shortcutOptionInput3', jsonobj);
    createOptionHolder.createOptionHolder('shortcutOptionHolder4', 'Shortcut Option [4]', 'shortcutOptionInput4', jsonobj);
    createOptionHolder.createOptionHolder('shortcutOptionHolder5', 'Shortcut Option [5]', 'shortcutOptionInput5', jsonobj);

    // get the shortcut values
    const one_id = document.getElementsByName('shortcutOptionInput')[0].id;
    const two_id = document.getElementsByName('shortcutOptionInput2')[0].id;
    const three_id = document.getElementsByName('shortcutOptionInput3')[0].id;
    const four_id = document.getElementsByName('shortcutOptionInput4')[0].id;
    const five_id = document.getElementsByName('shortcutOptionInput5')[0].id;

    var oneValue = document.getElementsByName('shortcutOptionInput')[0].value;
    var twoValue = document.getElementsByName('shortcutOptionInput2')[0].value;
    var threeValue = document.getElementsByName('shortcutOptionInput3')[0].value;
    var fourValue = document.getElementsByName('shortcutOptionInput4')[0].value;
    var fiveValue = document.getElementsByName('shortcutOptionInput5')[0].value;

    // shortcut initialisation

    var keyContentMap = {
        [one_id]: [oneValue],
        [two_id]: [twoValue],
        [three_id]: [threeValue],
        [four_id]: [fourValue],
        [five_id]: [fiveValue],
    };

    console.log(keyContentMap);

    const inputs = ['shortcutOptionInput', 'shortcutOptionInput2', 'shortcutOptionInput3', 'shortcutOptionInput4', 'shortcutOptionInput5'];

    // shortcut creation
    inputs.forEach((input, index) => {
        const element = document.getElementsByName(input)[0];
            element.addEventListener('change', function() {
                const variableName = `${input.substring(0, 1).toLowerCase()}${input.substring(1)}`; //shortcutOptionInput
                window[variableName] = element.id;
                window[`${variableName}Value`] = element.value;
                console.log(element.value);
    
                if (element.id == 1) {
                    oneValue = element.value;
                    jsonobj.Shortcuts.one = element.value;
                    updateShortcutBar();
                } else if (element.id == 2) {
                    twoValue = element.value;
                    jsonobj.Shortcuts.two = element.value;
                    updateShortcutBar();
                } else if (element.id == 3) {
                    threeValue = element.value;
                    jsonobj.Shortcuts.three = element.value;
                    updateShortcutBar();
                } else if (element.id == 4) {
                    fourValue = element.value;
                    jsonobj.Shortcuts.four = element.value;
                    updateShortcutBar();
                } else if (element.id == 5) {
                    fiveValue = element.value;
                    jsonobj.Shortcuts.five = element.value;
                    updateShortcutBar();
                }
    
                fs.writeFileSync(jsonpath, JSON.stringify(jsonobj));
    
                keyContentMap = {
                    [one]: [oneValue],
                    [two]: [twoValue],
                    [three]: [threeValue],
                    [four]: [fourValue],
                    [five]: [fiveValue],
                };
    
                console.log(keyContentMap);
            });
        });

    var keyContentMap = {
        [one]: [oneValue],
        [two]: [twoValue],
        [three]: [threeValue],
        [four]: [fourValue],
        [five]: [fiveValue],
    };
    console.log(keyContentMap);

    var isVisible = true;

    document.addEventListener('keydown', function(event) {
        const chatInput = document.querySelector('input[placeholder="[Enter] to use chat"]');
        const event222 = new KeyboardEvent('keydown', {
          keyCode: 13,
          bubbles: true,
          cancelable: true
        });

        const focusedElement = document.activeElement;
        if (focusedElement.tagName !== 'INPUT' && event.key in keyContentMap) {
            chatInput.value = keyContentMap[event.key];
            chatInput.dispatchEvent(event222);
            chatInput.dispatchEvent(event222);
        }

        if (event.key === 'F1') {
            isVisible = !isVisible;
            skinWrapper.style.display = isVisible ? 'block' : 'none';
        }
    });
}

module.exports = {
    shortcuts: shortcuts
};