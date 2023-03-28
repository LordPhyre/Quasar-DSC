const fs = require('original-fs');
const path = require('path');


module.exports = {
    replaceResources: (win, app) => {
    
        let swapDirectory = path.normalize(`${app.getPath('documents')}/Quasar-DSC/Resource Swapper`)
        
        if(!fs.existsSync(swapDirectory)) {
            fs.mkdirSync(swapDirectory, {
                recursive: true
            });
        }
        
        win.webContents.session.webRequest.onBeforeRequest((details, callback) => {
            if (new URL(details.url).hostname === 'deadshot.io' && new URL(details.url).pathname.length > 1) {
                let url = `${swapDirectory}\\${new URL(details.url).pathname}`;
                if(fs.existsSync(url)) {
                    return callback({ cancel: false, redirectURL: `swap:/${url}` });
                }
            }
            return callback({ cancel: false });
        });
    }
}
