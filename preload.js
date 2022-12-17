document.addEventListener("DOMContentLoaded", function() {
    let ggbtn = document.createElement("button");
    ggbtn.innerHTML = "[g] GG";
    ggbtn.type = "submit";
    ggbtn.id = "ggbtn";
    //btn.disabled = true; // !!!
    ggbtn.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 4px; margin-left: 7.5px; outline: none; border: none; font-size: 20px;"; // bugging
    document.body.appendChild(ggbtn);

    let hellobtn = document.createElement("button");
    hellobtn.innerHTML = "[h] hello guys";
    hellobtn.type = "submit";
    hellobtn.id = "hellobtn";
    hellobtn.style = "position: absolute; left: 0; bottom: 0; z-index: 1000; color: grey; background-color: transparent; outline: none; margin-bottom: 4px; margin-left: 80px; outline: none; border: none; font-size: 20px;"; // bugging
    document.body.appendChild(hellobtn);

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

    document.body.addEventListener('keypress', (e) => {
        if(e.key == 'g') {
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
    });

    document.body.addEventListener('keypress', (e) => {
        if(e.key == 'h') {
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
    });

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

    var script = document.createElement('script');
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
    
    ping();

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
