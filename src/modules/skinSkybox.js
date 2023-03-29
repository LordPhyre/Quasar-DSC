function skinPathHandlerAwp(src) {
    require('electron').ipcRenderer.send('filepath-awp', src);
}

function skinPathHandlerAr2(src) {
    require('electron').ipcRenderer.send('filepath-ar2', src);
}

function skinPathHandlerVector(src) {
    require('electron').ipcRenderer.send('filepath-vector', src);
}

function skyboxPathHandler(src) {
    require('electron').ipcRenderer.send('filepath-skybox', src)
}
  
function skinSkybox() {
const skincontentselector = document.getElementById('skincontent');
const skyboxcontentselector = document.getElementById('skyboxcontent');

const textureSquare = document.createElement('img');
textureSquare.style = 'width: 100px; height: 100px; border: 1px solid black; margin: 10px;';

var skipper = 1;
function processItems(items, handler, type, id) {
    for (let i = 0; i < items.length; i++) {
        let element;
        if (skipper > 0) {
            const flexSquareClone = textureSquare.cloneNode(true);
            flexSquareClone.setAttribute('src', items[i]);
            flexSquareClone.setAttribute('id', id);
            element = flexSquareClone;
            skipper++;
        } else {
            textureSquare.src = items[i];
            textureSquare.id = id;
            element = textureSquare;
        }

        element.addEventListener('click', function() {
            const src = this.getAttribute('src');
            console.log(`The source of the selected ${type} is: ${src}`);

            document.getElementById('msgBoxText').innerHTML = `${type} applied successfully...`;
            document.getElementById('msgBox').style.display = "initial";

            setTimeout(function() {
                document.getElementById('msgBox').style.display = "none";
            }, 2000);

            if (handler === 1) {
                skinPathHandlerAwp(src);
            } else if (handler === 2) {
                skinPathHandlerAr2(src);
            } else if (handler === 3) {
                skinPathHandlerVector(src);
            } else if (handler === 4) {
                skyboxPathHandler(src);
            }
        });

        if (type === 'skin') {
            skincontentselector.appendChild(element);
        } else if (type === 'skybox') {
            skyboxcontentselector.appendChild(element);
        }
    }
}

    require('electron').ipcRenderer.on('filepaths-awp', (event, message) => {
        processItems(message, 1, 'skin', 'awp');
    });

    require('electron').ipcRenderer.on('filepaths-ar2', (event, message) => {
        processItems(message, 2, 'skin', 'ar2');
    });

    require('electron').ipcRenderer.on('filepaths-vector', (event, message) => {
        processItems(message, 3, 'skin', 'vector');
    });

    require('electron').ipcRenderer.on('filepaths-skybox', (event, message) => {
        processItems(message, 4, 'skybox', 'skybox');
    });
}

module.exports = {
    skinSkybox: skinSkybox
};