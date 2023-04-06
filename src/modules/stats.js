const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
function statscreate(jsonobj) {
    const statsHolderWrapper = document.createElement("div");
    statsHolderWrapper.id = "statsHolderWrapper";
    statsHolderWrapper.style = "position: absolute; right: 0;top: 25%; z-index: 1000; margin-right: 6px; font-size: 100%; height: 100%;";
    statsHolderWrapper.innerHTML = `
        <div id="statsHolder" style="z-index: 1000; /*top: 50%;*/ color: white; padding-right: 5px; font-size: 100%; background: #191919; opacity: 0.9;">
    `;
    document.body.appendChild(statsHolderWrapper);
    
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
        dragElement(document.getElementById("statsHolderWrapper"));
    
        function dragElement(elmnt) {
            var pos1 = 0,pos2 = 0,pos3 = 0,pos4 = 0;
            document.getElementById("statsHolderWrapper").onmousedown = dragMouseDown;
    
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }
    
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.right = (document.documentElement.clientWidth - pos3 - elmnt.offsetWidth) + "px";
            }
    
            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        };
    `;
    document.getElementsByTagName('head')[0].appendChild(script);    
    
    const elementIds = ['fpscounter', 'ping', 'platform', 'cpu', 'mem', 'totalMem', 'cpuCount', 'uptime'];
    const styles = "z-index: 1000; color: white; font-size: 100%; display: none; white-space: nowrap;";
    
    for (const id of elementIds) {
      const element = document.createElement("h2");
      element.innerHTML = "loading...";
      element.id = id;
      element.style = styles;
      document.getElementById('statsHolder').appendChild(element);
    }

    //Show or Hide based on JSON
    if(jsonobj.Stats.FPS) { fpscounter.style.display = "initial"; } 
    else if (!jsonobj.Stats.FPS) { fpscounter.style.display = "none"; };
    
    if(jsonobj.Stats.Ping) { ping.style.display = "initial"; } 
    else if (!jsonobj.Stats.Ping) { ping.style.display = "none"; };

    if(jsonobj.Stats.Platform) { platform.style.display = "initial"; } 
    else if (!jsonobj.Stats.Platform) { platform.style.display = "none"; };

    if(jsonobj.Stats.CPU) { cpu.style.display = "initial"; } 
    else if (!jsonobj.Stats.CPU) { cpu.style.display = "none"; };

    if(jsonobj.Stats.memory) { mem.style.display = "initial"; } 
    else if (!jsonobj.Mem) { mem.style.display = "none"; };

    if(jsonobj.Stats.Tmemory) { totalMem.style.display = "initial"; } 
    else if (!jsonobj.Stats.Tmemory) { totalMem.style.display = "none"; };

    if(jsonobj.Stats.Cores) { cpuCount.style.display = "initial"; } 
    else if (!jsonobj.Stats.Cores) { cpuCount.style.display = "none"; };

    if(jsonobj.Stats.Uptime) { uptime.style.display = "initial"; } 
    else if (!jsonobj.Stats.Uptime) { uptime.style.display = "none"; };

    ipcRenderer.on('platform',(event,data) => { document.getElementById('platform').innerHTML = "Platform: " + data + "<br>"; });
    ipcRenderer.on('cpu',(event,data) => { document.getElementById('cpu').innerHTML = "CPU: " + data.toFixed(2) + "%<br>"; });
    ipcRenderer.on('mem',(event,data) => { document.getElementById('mem').innerHTML = "Memory: " + data.toFixed(2) + "<br>"; });
    ipcRenderer.on('total-mem',(event,data) => { document.getElementById('totalMem').innerHTML = "Tot. Mem.: " + data.toFixed(2) + "%<br>"; });
    ipcRenderer.on('cpu-count',(event,data) => { document.getElementById('cpuCount').innerHTML = "CPU Cores: " + data + "<br>"; });
    ipcRenderer.on('uptime',(event,data) => { document.getElementById('uptime').innerHTML = "Uptime: " + data.toFixed(2) + "s<br>"; });
}

module.exports = {
    statscreate: statscreate
};