function wasd(jsonobj) {
    // Try-Catch block is here to eliminate any errors. An error at this stage can halt the entire program.
    try {
        var keydata = window.localStorage.getItem('keyb');
        var game_keys = JSON.parse(keydata);
    
        // {"up":"W","down":"S","left":"A","right":"D","space":"Space","chat":"Enter","pause":"Escape","leaderboard":"Tab","ads":"L","shoot":"K","crouch":"Shift","reload":"R"}
        var up = game_keys.up;
        var down = game_keys.down;
        var left = game_keys.left;
        var right = game_keys.right;
        var reload = game_keys.reload;
        var crouch = game_keys.crouch;
        var space = game_keys.space;
    } catch {
        console.error("Could not access localstorage");
        var up = "w";
        var down = "s";
        var left = "a";
        var right = "d";
        var reload = "r";
        var crouch = "shift";
        var space = "space";
    }

    const WASD = document.createElement("div");
    WASD.style = "z-index: 1000; position: absolute; top: 90px; left: 5px; display: none;";
    WASD.innerHTML = `
<div style="width: 276px; display: flex; color: white; align-items: center; justify-content: center;">
    <div style="opacity: 0; width: 54px; height: 40px;"></div>
    <div id="w" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${up}</div>
    <div style="opacity: 0; width: 86px; height: 40px;"></div>
    <div id="r" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${reload}</div>
    <div style="opacity: 0; width: 28px; height: 40px;"></div>
</div>
<div style="width: 276px; display: flex; color: white; align-items: center; justify-content: center;">
    <div id="a" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${left}</div>
    <div id="s" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${down}</div>
    <div id="d" style="background: rgba(255, 255, 255, .2); width: 40px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${right}</div>
    <div id="shift" style="background: rgba(255, 255, 255, .2); width: 100px; height: 40px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;">${crouch}</div>
</div>
<div style="width: 276px; display: flex; color: white; align-items: center; justify-content: center;">
    <div id="space" style="background: rgba(255, 255, 255, .2); width: 220px; height: 34px; margin: 5px; border: 2px solid #aaaaaa; border-radius: 5px; font-weight: 700;"></div>
</div>`;
    WASD.id = "WASD";
    document.body.appendChild(WASD);
    
    if(jsonobj.WASD) {
        WASD.style.display = "block";
    } else if (!jsonobj.WASD) {
        WASD.style.display = "none";
    };

        // WASD CODE
        const WASDJS = document.createElement("script");
        WASDJS.innerHTML = `
        const wElement = document.getElementById('w');
        const aElement = document.getElementById('a');
        const sElement = document.getElementById('s');
        const dElement = document.getElementById('d');
        const rElement = document.getElementById('r');
        const shiftElement = document.getElementById('shift');
        const spaceElement = document.getElementById('space');
        
        const keys = {
          ${up.toLowerCase()}: false,
          ${left.toLowerCase()}: false,
          ${down.toLowerCase()}: false,
          ${right.toLowerCase()}: false,
          ${reload.toLowerCase()}: false,
          ${crouch.toLowerCase()}: false
        };
    
        document.addEventListener('keydown', event => {
          const key = event.key.toLowerCase();
          if (key in keys) {
            keys[key] = true;
            updateElements();
          }
        });
        
        document.addEventListener('keyup', event => {
          const key = event.key.toLowerCase();
          if (key in keys) {
            keys[key] = false;
            updateElements();
          }
        });
        
        function updateElements() {
          wElement.style.background = keys.${up.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
          aElement.style.background = keys.${left.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
          sElement.style.background = keys.${down.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
          dElement.style.background = keys.${right.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
          rElement.style.background = keys.${reload.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
          shiftElement.style.background = keys.${crouch.toLowerCase()} ? '#232429' : 'rgba(255, 255, 255, .2)';
        };
        
        document.addEventListener('keydown', (event) => {
            if (event.code === '${space}') { spaceElement.style.background = '#232429'; }
        });
        document.addEventListener('keyup', (event) => {
            if (event.code === '${space}') { spaceElement.style.background = 'rgba(255, 255, 255, .2)'; }
        });
        `;
        
        document.getElementsByTagName('head')[0].appendChild(WASDJS);
}

module.exports = {
    wasd: wasd
};