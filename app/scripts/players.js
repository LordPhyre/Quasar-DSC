const { machineIdSync } = require('node-machine-id')

let machineId = machineIdSync()

setInterval(async function () {
    await fetch('https://gatoclient-api.vercel.app/api/gatoclient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ "id": machineId })
    })
}, 60000)