const ping_get = require('ping');
function ping() {
    setInterval(() => {
        const host = 'deadshot.io';
        
        ping_get.promise.probe(host)
          .then(res => {
            if (res.alive) {
              document.getElementById('ping').innerHTML = "Ping: " + res.time.toFixed(0) + "ms<br>";
            } else {
              console.log('ping error: offline');
            }
          })
        
          .catch(err => console.error(err));        
    }, 1000);
}

module.exports = {
    ping: ping
};