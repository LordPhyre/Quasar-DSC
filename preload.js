document.addEventListener("DOMContentLoaded", function() {

    // vars & preset stuff
    var wrapperHidden = true;

    let shortcuts = document.createElement("h2");
    shortcuts.innerHTML = "[1] GG  [2] hello guys  [3] show  [4] hide";
    shortcuts.type = "submit";
    shortcuts.id = "hidewrapper";
    shortcuts.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 4px; margin-left: 7.5px; outline: none; border: none; font-size: 100%;";
    document.body.appendChild(shortcuts);

    // draggable windows

    /*<div class="wrapper">
        <header>Draggable Div</header>
        <div class="content">
        <p>Content</p>
        </div>
    </div>*/

    // example button window (examplebuttons.html)

    /*let wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    wrapper.classList.add('wrapper');
    document.body.appendChild(wrapper);

    let close = document.createElement("button");
    close.id = "close";
    close.classList.add('close');
    close.onclick = "close()";
    close.innerHTML = "_";

    document.getElementById('wrapper').appendChild(close);

    let header = document.createElement("header");
    header.id = "header";
    header.innerHTML = "header";

    document.getElementById('wrapper').appendChild(header);

    let content = document.createElement("div");
    content.id = "content";
    content.classList.add('content');

    document.getElementById('wrapper').appendChild(content);

    // content

    let contentbutton1 = document.createElement("button");
    contentbutton1.id = "contentbutton1";
    contentbutton1.classList.add('button');
    contentbutton1.innerHTML = "content";

    document.getElementById('content').appendChild(contentbutton1);

    let contentbutton2 = document.createElement("button");
    contentbutton2.id = "contentbutton2";
    contentbutton2.classList.add('button');
    contentbutton2.innerHTML = "content";

    document.getElementById('content').appendChild(contentbutton2);

    let contentbutton3 = document.createElement("button");
    contentbutton3.id = "contentbutton3";
    contentbutton3.classList.add('button');
    contentbutton3.innerHTML = "content";

    document.getElementById('content').appendChild(contentbutton3);

    // css and js

    let css = document.createElement('style');
    //css.type = 'text/css';
    css.innerText = "@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';*{margin:0;padding:0;box-sizing:border-box; z-index: 1000; border: none;}.wrapper{position:absolute;top:50%;left:50%;max-width:350px;width:100%;background:#fff;transform:translate(-50%,-50%);color:#fff}.wrapper header{font-size:23px;font-weight:500;padding:17px 30px;border-bottom:1px solid #000;background:#2a394f;text-align:center;font-family:'Poppins',sans-serif;}.wrapper header.active{cursor:move;user-select:none}.wrapper .content{display:flex;align-items:center;flex-direction:column;justify-content:center;background:#2a394f;font-family:'Poppins',sans-serif;}.content .title{margin:15px 0;font-size:29px;font-weight:500; border: none;}.content p{font-size:16px;text-align:center}.button{width:111%;height:50px;background-color:#364760;border:none;color:#fff;text-align:center;}.button:hover{background-color:#0798fc}.close{color:grey;position:absolute;top:0;right:0;margin-right:15px;margin-top:-6px;background-color:#ffffff00;border:none;font-size:35px}.close:hover{color:#fff}";
    document.head.appendChild(css);

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "const wrapper=document.querySelector('.wrapper'),header=wrapper.querySelector('header');function onDrag({movementX:e,movementY:r}){let t=window.getComputedStyle(wrapper),a=parseInt(t.left),o=parseInt(t.top);wrapper.style.left=`${a+e}px`,wrapper.style.top=`${o+r}px`}header.addEventListener('mousedown',()=>{header.classList.add('active'),header.addEventListener('mousemove',onDrag)}),document.addEventListener('mouseup',()=>{header.classList.remove('active'),header.removeEventListener('mousemove',onDrag)});function close(){document.getElementById('wrapper').style.display = 'none';}";
    document.getElementsByTagName('head')[0].appendChild(script);

    // hide
    document.getElementById("wrapper").style.display = "none";*/

    // skinselector.html

    /*let skinwrapper = document.createElement("div");
    skinwrapper.id = "skinwrapper";
    skinwrapper.classList.add('skinwrapper');
    document.body.appendChild(skinwrapper);

    const skinWrapper = document.querySelector('.skinwrapper');

    const skinClose = document.createElement('button');
    skinClose.classList.add('skinclose');
    skinClose.addEventListener('click', close);
    skinClose.textContent = '_';

    const skinHeader = document.createElement('header');
    skinHeader.classList.add('skinheader');
    skinHeader.id = "skinheader";
    skinHeader.textContent = 'Main Menu';

    const mainDiv = document.createElement('div');
    mainDiv.style.backgroundColor = '#2a394f';

    const leftDiv = document.createElement('div');
    leftDiv.style.cssText = 'float: left; width: 40%;';
    for (let i = 0; i < 7; i++) {
        const button = document.createElement('button');
        button.classList.add('skinbutton');
        button.textContent = 'Option';
        leftDiv.appendChild(button);
    }
    mainDiv.appendChild(leftDiv);

    const rightDiv = document.createElement('div');
    rightDiv.style.cssText = 'float: right; width: 60%;';
    const rightHolder = document.createElement('div');
    rightHolder.classList.add('skincontent');
    rightHolder.id = 'right-holder';
    rightDiv.appendChild(rightHolder);
    mainDiv.appendChild(rightDiv);

    skinWrapper.appendChild(skinClose);
    skinWrapper.appendChild(skinHeader);
    skinWrapper.appendChild(mainDiv);

    var skincontent = document.getElementById('right-holder');

    var flexSquare = document.createElement('div');
    flexSquare.style.width = '85px';
    flexSquare.style.height = '85px';
    flexSquare.style.border = '1px solid black';
    flexSquare.style.margin = '10px';
    flexSquare.style.backgroundColor = '#ffffff';
    skincontent.appendChild(flexSquare);
    skincontent.appendChild(flexSquare.cloneNode(true));
    skincontent.appendChild(flexSquare.cloneNode(true));
    skincontent.appendChild(flexSquare.cloneNode(true));
    skincontent.appendChild(flexSquare.cloneNode(true));
    skincontent.appendChild(flexSquare.cloneNode(true));
    skincontent.appendChild(flexSquare.cloneNode(true));
    skincontent.appendChild(flexSquare.cloneNode(true));
    skincontent.appendChild(flexSquare.cloneNode(true));
    skincontent.appendChild(flexSquare.cloneNode(true));
    skincontent.appendChild(flexSquare.cloneNode(true));
    skincontent.appendChild(flexSquare.cloneNode(true));*/


    /*let skinclose = document.createElement("button");
    skinclose.id = "skinclose";
    skinclose.classList.add('skinclose');
    skinclose.onclick = "close()";
    skinclose.innerHTML = "_";

    document.getElementById('skinwrapper').appendChild(close);

    let skinheader = document.createElement("header");
    skinheader.id = "skinheader";
    skinheader.innerHTML = "Skin Select";

    document.getElementById('skinwrapper').appendChild(skinheader);

    let skincontent = document.createElement("div");
    skincontent.id = "skincontent";
    skincontent.classList.add('skincontent');

    document.getElementById('skinwrapper').appendChild(skincontent);

    // content

    var skincontentselector = document.getElementById('skincontent');

    var flexSquare = document.createElement('div');
    flexSquare.style.width = '100px';
    flexSquare.style.height = '100px';
    flexSquare.style.border = '1px solid black';
    flexSquare.style.margin = '10px';
    flexSquare.style.backgroundColor = '#ffffff';

    for (let i = 0; i < 10; i++) {
        console.log(i);
    }

    skincontentselector.appendChild(flexSquare);
    skincontentselector.appendChild(flexSquare.cloneNode(true));
    skincontentselector.appendChild(flexSquare.cloneNode(true));
    skincontentselector.appendChild(flexSquare.cloneNode(true));
    skincontentselector.appendChild(flexSquare.cloneNode(true));
    skincontentselector.appendChild(flexSquare.cloneNode(true));
    skincontentselector.appendChild(flexSquare.cloneNode(true));
    skincontentselector.appendChild(flexSquare.cloneNode(true));
    skincontentselector.appendChild(flexSquare.cloneNode(true));
    skincontentselector.appendChild(flexSquare.cloneNode(true));
    skincontentselector.appendChild(flexSquare.cloneNode(true));
    skincontentselector.appendChild(flexSquare.cloneNode(true));
    skincontentselector.appendChild(flexSquare.cloneNode(true));*/

    // wrapper
    const skinWrapper = document.createElement('div');
    skinWrapper.className = 'skinwrapper';
    skinWrapper.id = "skinWrapper";
    document.body.appendChild(skinWrapper);

    // close button
    const skinCloseButton = document.createElement('button');
    skinCloseButton.className = 'skinclose';
    skinCloseButton.innerText = '_';
    skinCloseButton.addEventListener('click', close);
    document.getElementById('skinWrapper').appendChild(skinCloseButton);

    // title
    const skinHeader = document.createElement('header');
    skinHeader.id = 'skinheader';
    skinHeader.innerText = 'Main Menu';
    document.getElementById('skinWrapper').appendChild(skinHeader);

    // background & container
    const mainDiv = document.createElement('div');
    mainDiv.style.backgroundColor = '#2a394f';
    mainDiv.id = "mainDiv";
    document.getElementById('skinWrapper').appendChild(mainDiv);

    // left part of the menu (the buttons)
    const leftDiv = document.createElement('div');
    leftDiv.style.float = 'left';
    leftDiv.style.width = '40%';
    leftDiv.id = "leftDiv";
    document.getElementById('mainDiv').appendChild(leftDiv);

    // the buttons (using for loop for demo purposes)
    //for (let i = 0; i < 7; i++) {
        const optionButton1 = document.createElement('button');
        optionButton1.className = 'skinbutton';
        optionButton1.innerText = 'General';
        optionButton1.id = "general";
        document.getElementById('leftDiv').appendChild(optionButton1);

        const optionButton2 = document.createElement('button');
        optionButton2.className = 'skinbutton';
        optionButton2.innerText = 'Option2';
        optionButton2.id = "optionButton2";
        document.getElementById('leftDiv').appendChild(optionButton2);

        const optionButton3 = document.createElement('button');
        optionButton3.className = 'skinbutton';
        optionButton3.innerText = 'Option3';
        optionButton3.id = "optionButton3";
        document.getElementById('leftDiv').appendChild(optionButton3);
    //}

    // right part of the menu (sub-options)
    const rightDiv = document.createElement('div');
    rightDiv.style.float = 'right';
    rightDiv.style.width = '60%';
    rightDiv.id = "rightDiv";
    document.getElementById('mainDiv').appendChild(rightDiv);

    // title of sub options (demo)
    const h2 = document.createElement('h2');
    h2.style.textAlign = 'center';
    h2.style.margin = '10px 0 10px 0';
    h2.innerText = 'Option Name';
    document.getElementById('rightDiv').appendChild(h2);

    for (let i = 0; i < 5; i++) {
        // holds the sub-options
        const optionHolder = document.createElement('div');
        optionHolder.className = 'optionholder';
        optionHolder.id = "optionHolder";
        document.getElementById('rightDiv').appendChild(optionHolder);

        // sub-option title
        const optionDescr = document.createElement('p');
        optionDescr.className = 'optiondescr';
        optionDescr.innerText = 'Option Name';
        document.getElementById('optionHolder').appendChild(optionDescr);

        // percent input
        const input1 = document.createElement('input');
        input1.type = 'text';
        document.getElementById('optionHolder').appendChild(input1);

        // slider
        const input2 = document.createElement('input');
        input2.type = 'range';
        input2.min = '1';
        input2.max = '100';
        input2.value = '50';
        input2.className = 'slider';
        input2.id = 'myRange';
        document.getElementById('optionHolder').appendChild(input2);

        const div = document.createElement('div');
        div.style.height = '50px';
        document.getElementById('optionHolder').appendChild(div);

        const hr = document.createElement('hr');
        document.getElementById('optionHolder').appendChild(hr);
    }

    document.body.append(skinWrapper);

    document.getElementById("general").addEventListener("click", function() {
        rightDiv.innerHTML = '';

        // holds the sub-options
        const optionHolder = document.createElement('div');
        optionHolder.className = 'optionholder';
        optionHolder.id = "optionHolder";
        document.getElementById('rightDiv').appendChild(optionHolder);

        // sub-option title
        const optionDescr = document.createElement('p');
        optionDescr.className = 'optiondescr';
        optionDescr.innerText = 'FPS-Counter';
        document.getElementById('optionHolder').appendChild(optionDescr);

        // percent input
        /*const input1 = document.createElement('input');
        input1.type = 'text';
        document.getElementById('optionHolder').appendChild(input1);*/

        // slider
        /*const input2 = document.createElement('input');
        input2.type = 'range';
        input2.min = '1';
        input2.max = '100';
        input2.value = '50';
        input2.className = 'slider';
        input2.id = 'myRange';
        document.getElementById('optionHolder').appendChild(input2);*/

        const input3 = document.createElement('input');
        input3.type = 'checkbox';
        input3.id = "input3";
        input3.style = "float: right; margin: 14px 25px 10px 0; width: 35px; font-weight: bold; color: grey;";
        document.getElementById('optionHolder').appendChild(input3);

        const div = document.createElement('div');
        div.style.height = '50px';
        document.getElementById('optionHolder').appendChild(div);

        const hr = document.createElement('hr');
        document.getElementById('optionHolder').appendChild(hr);

        input3.addEventListener('change', e => {
            if(e.target.checked){
                fpscounter.style.display = "";
            } else {
                fpscounter.style.display = "none";
            }
        }); 
    
    });

    document.getElementById("optionButton2").addEventListener("click", function() {
        alert("optionButton2");
    });

    document.getElementById("optionButton3").addEventListener("click", function() {
        alert("optionButton3");
    });

    // css and js

    let skincss = document.createElement('style');
    skincss.innerText = "@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';*{z-index:1000;margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif}.skinwrapper{position:absolute;top:50%;left:50%;max-width:750px;width:100%;background:#2a394f;transform:translate(-50%,-50%);border:solid 1px #000;color:#fff}.skinwrapper header{font-size:23px;font-weight:500;padding:17px 30px;border-bottom:1px solid #000;background:#2a394f;text-align:center}.skinwrapper header.skinactive{cursor:move;user-select:none}.skinwrapper .skincontent{display:flex;flex-direction:wrap;flex-wrap:wrap;justify-content:center;background:#2a394f}.skincontent .title{margin:15px 0;font-size:29px;font-weight:500}.skincontent p{font-size:16px;text-align:center;display:flex}.skinbutton{width:100%;height:50px;background-color:#364760;border:none;color:#fff;font-size:20px}.skinbutton:hover{background-color:#0798fc}.skinclose{color:grey;position:absolute;top:0;right:0;margin-right:15px;margin-top:-6px;background-color:#ffffff00;border:none;font-size:35px}.skinclose:hover{color:#fff}p{font-size:20px}input[type=text]{float:right;margin:14px 25px 10px 0;width:35px;font-weight:700;color:grey}input[type=range]{float:right;margin:16px 20px 10px 0}.optiondescr{float:left;margin:10px 0 10px 20px}.optionholder{background-color:#364760}hr{width:100%;border:.1px solid #000}";
    document.head.appendChild(skincss);

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "const skinwrapper1=document.querySelector('.skinwrapper'),skinheader1=document.getElementById('skinheader');function onDrag({movementX:e,movementY:n}){let s=window.getComputedStyle(skinwrapper1),t=parseInt(s.left),r=parseInt(s.top);skinwrapper1.style.left=`${t+e}px`,skinwrapper1.style.top=`${r+n}px`}function close(){document.getElementById('skinwrapper').style.display='none'}skinheader1.addEventListener('mousedown',()=>{skinheader1.classList.add('skinactive'),skinheader1.addEventListener('mousemove',onDrag)}),document.addEventListener('mouseup',()=>{skinheader1.classList.remove('skinactive'),skinheader1.removeEventListener('mousemove',onDrag)});";
    document.getElementsByTagName('head')[0].appendChild(script);

    // hide
    //document.getElementById("skinwrapper").style.display = "none";

    // fixes wrong area glitch
    /*const canvas = document.querySelector('body > canvas:last-of-type');
    canvas.style.zoom = 0.5;*/

    //window.scrollTo(window.innerWidth * 0.01, window.innerHeight * 0.01);


    //const body = document.querySelector('body');
    //body.style.zoom = 0.65;

    /*let clientsettingscanvas = document.createElement("canvas");
    clientsettingscanvas.id = "canvas";
    clientsettingscanvas.classList.add('clientsettingscanvas');
    document.body.appendChild(clientsettingscanvas);

    let menu1 = document.createElement("div");
    menu1.id = "menu1";
    menu1.classList.add('menu1');
    menu1.innerHTML = "This should be working";
    document.body.appendChild(menu1);


    let css = document.createElement('style');
    css.innerText = "div {z-index: 1000; position: absolute;top: 0;height: 60px;width: 100px;background: #15a5ed;text-align: center;line-height: 60px;border-radius: 15px 15px 15px 15px;}";
    document.head.appendChild(css);

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "for(div of divs=document.getElementsByTagName('div'))div.onmousedown=onMouseDown;document.onmousemove=onMouseMove,document.onmouseup=onMouseUp,canvas.width=window.innerWidth-20,canvas.height=window.innerHeight-20;var the_moving_div='',the_last_mouse_position={x:0,y:0};function onMouseDown(e){e.preventDefault(),the_moving_div=e.target.id,the_last_mouse_position.x=e.clientX,the_last_mouse_position.y=e.clientY;var t=document.getElementsByTagName('div');e.target.style.zIndex=t.length;var o=1;for(div of t)div.id!=the_moving_div&&(div.style.zIndex=o++)}function onMouseMove(e){if(e.preventDefault(),''!=the_moving_div){var t=document.getElementById(the_moving_div);t.style.left=t.offsetLeft+e.clientX-the_last_mouse_position.x+'px',t.style.top=t.offsetTop+e.clientY-the_last_mouse_position.y+'px',the_last_mouse_position.x=e.clientX,the_last_mouse_position.y=e.clientY}}function onMouseUp(e){e.preventDefault(),''!=the_moving_div&&(the_moving_div='')}drawConnectors();";
    document.getElementsByTagName('head')[0].appendChild(script);*/


    // background change | doesn't really work

    // css
    /*let el = document.createElement('style');
    el.type = 'text/css';
    el.innerText = "html, body {background: url(https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg);";
    document.head.appendChild(el);

    const canvas = document.querySelector('body > canvas:last-of-type');
    canvas.style.display = "none";
    console.log("should have worked");
    //canvas.style.display = "block" // undo*/

    // replace "wallpaper" (camera) | completely destroys page -> find a way to still reload size (grab the values from there!)
    /*const canvas = document.querySelector('body > canvas:last-of-type');

    // style="display: block; opacity: 0.5; width: 283px; height: 423px;"
    const canvasstyle = canvas.style;

    const src = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg';

    canvas.insertAdjacentHTML("beforebegin", '<img height="' + canvas.height + '" width="' + canvas.width + '" id="bgimage" src="'+ src + '" style="display: block; opacity:' + canvasstyle.opacity + '; width:' + canvasstyle.width + '; height:' + canvasstyle.width + ';">');
    //canvas.insertAdjacentHTML("beforebegin", img);

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === "attributes" && mutation.attributeName === "style") {
                console.log("canvas size changed");

                // change image size
                const bgimage = document.getElementById("bgimage");
                bgimage.style.width = canvasstyle.width;
                bgimage.style.height = canvasstyle.height;

                // also need these
                bgimage.width = canvas.width;
                bgimage.height = canvas.height;
            }
        });
    });
      
    observer.observe(canvas, { attributes: true });*/

    document.body.addEventListener('keypress', (e) => {
        if(e.key == '1') {
            const input = document.querySelector('input[placeholder="[Enter] to use chat"]');
            input.value = 'GG';

            const event = new KeyboardEvent('keydown', {
                keyCode: 13,
                bubbles: true,
                cancelable: true
            });
    
            input.dispatchEvent(event);
            input.dispatchEvent(event);
        }

        if(e.key == '2') {
            const input = document.querySelector('input[placeholder="[Enter] to use chat"]');
            input.value = 'hello guys';

            const event = new KeyboardEvent('keydown', {
                keyCode: 13,
                bubbles: true,
                cancelable: true
            });
    
            input.dispatchEvent(event);
            input.dispatchEvent(event);
        }

        if(e.key == '3') {
            //document.getElementById("wrapper").style.display = "";
            document.getElementById("skinWrapper").style.display = "";
            /*if (wrapperHidden = true)
            {
                document.getElementById("wrapper").style.display = "";
                wrapperHidden = false;
            } else {
                document.getElementById("wrapper").style.display = "none";
                wrapperHidden = true;
            }*/
        }

        if(e.key == '4') {
            //document.getElementById("wrapper").style.display = "none";
            document.getElementById("skinWrapper").style.display = "none";
        }
    });

    // offline / online status

    let status = document.createElement("h2");
    status.innerHTML = "Network Status";
    status.id = "status";
    status.style = "position: absolute; width: 100%; text-align: center; z-index: 1000; color: lightgreen; font-size: 100%";
    document.body.appendChild(status);

    const updateOnlineStatus = () => {
        document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'

        if (navigator.onLine == 1)
        {
            status.style.color = "lightgreen";
        } else {
            status.style.color = "red";
            mainWindow.loadFile('index.html')
        }

    }
      
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    
    updateOnlineStatus()

    // ping | doesn't work | jquery is the problem

    /*var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    let pingimg = document.createElement("img");
    pingimg.id = "junkOne";
    document.body.appendChild(pingimg);

    let faFEA = document.createElement("p");
    faFEA.innerHTML = "ping here";
    faFEA.id = "timer";
    faFEA.style = "position: absolute; width: 100%; text-align: center; z-index: 1000; color: red";
    document.body.appendChild(faFEA);

    function ping() {
        var start = new Date().getTime();
        $('#junkOne').attr('src', 'http://deadshot.io/').error(function () {
            var end = new Date().getTime();
            $('#timer').html("" + (end-start) + "ms");
        });
    }
    
    ping();*/

    /*function ping() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/ping', true);
        xhr.send();
        
        var startTime = performance.now();
        
        xhr.onload = function() {
            var endTime = performance.now();
            var pingTime = endTime - startTime;
            console.log('Ping time: ' + pingTime + 'ms');
        };
    }
    
    ping();*/

    // FPS-Counter

    const fpscounter = document.createElement("h2");
    fpscounter.innerHTML = "FPS Counter";
    fpscounter.id = "fpscounter";
    fpscounter.style = "position: absolute; left: 100;top: 100; z-index: 1000; color: grey; margin-left: 7.5px; font-size: 100%; display: none;";
    document.body.appendChild(fpscounter);

    let fps = 0;
    let frameCount = 0;
    let startTime = 0;

    function updateFps() {
        frameCount++;

        const elapsedTime = (performance.now() - startTime) / 1000;

        if (elapsedTime > 1) {
            fps = frameCount / elapsedTime;
            startTime = performance.now();
            frameCount = 0;
        }

        document.getElementById('fpscounter').innerText = 'FPS: ' + fps.toFixed(2);

        requestAnimationFrame(updateFps);
    }

    updateFps();

});
