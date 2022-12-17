document.addEventListener("DOMContentLoaded", function() {
    let btn = document.createElement("button");
    btn.innerHTML = "GG";
    btn.type = "submit";
    btn.id = "ggbtn";
    btn.style = "position: absolute;left: 100;top: 100;z-index: 1000;";
    document.body.appendChild(btn);

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
    status.style = "position: absolute; text-align: center; z-index: 1000; color: lightgreen";
    document.body.appendChild(status);

    const updateOnlineStatus = () => {
        document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'

        if (navigator.onLine == 1)
        {
            status.style.color = "lightgreen";
        } else {
            status.style.color = "red";
        }
    }
      
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    
    updateOnlineStatus()

});
