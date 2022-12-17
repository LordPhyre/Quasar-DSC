document.addEventListener("DOMContentLoaded", function() {

    // vars & preset stuff

    var wrapperHidden = true;

    /*let ggbtn = document.createElement("button");
    ggbtn.innerHTML = "[1] GG";
    ggbtn.type = "submit";
    ggbtn.id = "ggbtn";
    //btn.disabled = true; // !!!
    ggbtn.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 4px; margin-left: 7.5px; outline: none; border: none; font-size: 20px;"; // bugging
    document.body.appendChild(ggbtn);

    let hellobtn = document.createElement("button");
    hellobtn.innerHTML = "[2] hello guys";
    hellobtn.type = "submit";
    hellobtn.id = "hellobtn";
    hellobtn.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 4px; margin-left: 77.5px; outline: none; border: none; font-size: 20px;"; // bugging
    document.body.appendChild(hellobtn);

    let showwrapper = document.createElement("button");
    showwrapper.innerHTML = "[3] show";
    showwrapper.type = "submit";
    showwrapper.id = "showwrapper";
    showwrapper.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 4px; margin-left: 220px; outline: none; border: none; font-size: 20px;"; // bugging
    document.body.appendChild(showwrapper);

    let hidewrapper = document.createElement("button");
    hidewrapper.innerHTML = "[4] hide";
    hidewrapper.type = "submit";
    hidewrapper.id = "hidewrapper";
    hidewrapper.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 4px; margin-left: 315px; outline: none; border: none; font-size: 20px;"; // bugging
    document.body.appendChild(hidewrapper);*/

    let shortcuts = document.createElement("h2");
    shortcuts.innerHTML = "[1] GG  [2] hello guys  [3] show  [4] hide";
    shortcuts.type = "submit";
    shortcuts.id = "hidewrapper";
    shortcuts.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 4px; margin-left: 7.5px; outline: none; border: none; font-size: 20px;"; // bugging
    document.body.appendChild(shortcuts);

    // draggable windows

    /*<div class="wrapper">
        <header>Draggable Div</header>
        <div class="content">
        <p>Content</p>
        </div>
    </div>*/

    let wrapper = document.createElement("div");
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
    document.getElementById("wrapper").style.display = "none";

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

    document.getElementById('ggbtn').onclick = function() {
        //alert("it should work");
        //document.getElementById('input').value = 'GG';

        const input = document.querySelector('input[placeholder="[Enter] to use chat"]');
        input.value = 'GG';

        const event = new KeyboardEvent('keydown', {
            keyCode: 13,
            bubbles: true,
            cancelable: true
        });

        input.dispatchEvent(event);
        // without this one it wont work
        input.dispatchEvent(event);

        //input.click();

        /*const event = new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true,
            cancelable: true
        });*/

        /*const event = new KeyboardEvent('keydown', {
            keyCode: 13,
            bubbles: true,
            cancelable: true
        });

        input.dispatchEvent(event);*/
    };

    document.getElementById('hellobtn').onclick = function() {
        const input = document.querySelector('input[placeholder="[Enter] to use chat"]');
        input.value = 'hello guys';

        const event = new KeyboardEvent('keydown', {
            keyCode: 13,
            bubbles: true,
            cancelable: true
        });

        input.dispatchEvent(event);
        input.dispatchEvent(event);
    };

    document.getElementById('showwrapper').onclick = function() {
        document.getElementById("wrapper").style.display = "";
    };

    document.getElementById('hidewrapper').onclick = function() {
        document.getElementById("wrapper").style.display = "none";
    };

    document.body.addEventListener('keypress', (e) => {
        if(e.key == '1') {
            // this definetly works
            //console.log("g Key Pressed");

            const input = document.querySelector('input[placeholder="[Enter] to use chat"]');
            input.value = 'GG';

            const event = new KeyboardEvent('keydown', {
                keyCode: 13,
                bubbles: true,
                cancelable: true
            });
    
            input.dispatchEvent(event);
            // without this one it wont work
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
            // without this one it wont work
            input.dispatchEvent(event);
        }

        if(e.key == '3') {
            document.getElementById("wrapper").style.display = "";
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
            document.getElementById("wrapper").style.display = "none";
            /*if (wrapperHidden = true)
            {
                document.getElementById("wrapper").style.display = "";
                wrapperHidden = false;
            } else {
                document.getElementById("wrapper").style.display = "none";
                wrapperHidden = true;
            }*/
        }
    });

    /*document.addEventListener("keypress", function(event) {
        if (event.altKey && event.key === "g") {
            const input = document.querySelector('input[placeholder="[Enter] to use chat"]');
            input.value = 'GG';

            const event = new KeyboardEvent('keydown', {
                keyCode: 13,
                bubbles: true,
                cancelable: true
            });
    
            input.dispatchEvent(event);
            // without this one it wont work
            input.dispatchEvent(event);
        }

        if (event.altKey && event.key === "h") {
            const input = document.querySelector('input[placeholder="[Enter] to use chat"]');
            input.value = 'hello guys';

            const event = new KeyboardEvent('keydown', {
                keyCode: 13,
                bubbles: true,
                cancelable: true
            });
    
            input.dispatchEvent(event);
            // without this one it wont work
            input.dispatchEvent(event);
        }
      });*/
      

    /*document.body.addEventListener('keypress', (e) => {
        if(e.key == 'j') {
            const input = document.querySelector('input[placeholder="[Enter] to use chat"]');
            input.value = 'ඞ'; // doesn't work :/

            const event = new KeyboardEvent('keydown', {
                keyCode: 13,
                bubbles: true,
                cancelable: true
            });
    
            input.dispatchEvent(event);
            // without this one it wont work
            input.dispatchEvent(event);
        }
    });*/

    // offline / online status

    let status = document.createElement("h2");
    status.innerHTML = "Network Status";
    status.id = "status";
    status.style = "position: absolute; width: 100%; text-align: center; z-index: 1000; color: lightgreen";
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

    let fpscounter = document.createElement("h2");
    fpscounter.innerHTML = "FPS Counter";
    fpscounter.id = "fpscounter";
    fpscounter.style = "position: absolute; left: 100;top: 100; z-index: 1000; color: grey; margin-left: 7.5px;";
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
