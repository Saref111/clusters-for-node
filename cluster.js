const cluster = require('cluster')
const { info } = require('console')
const os = require('os')
const pid = process.pid

if (cluster.isMaster) {
    const cpus = os.cpus().length
    info('CPU amount:' + cpus)
    info('Master PID:' + pid)

    for (let i = 0; i < cpus - 1; i++) {
        const worker = cluster.fork() 
        worker.on('exit', () => {
            console.log(`Worker died! PID: ` + worker.process.pid)
            cluster.fork()
        })
        worker.send('Hello from server ' + worker.process.pid)
    }
}

if (cluster.isWorker) {
    require('./worker.js')
    process.on('message', (msg) => {
        info('Got message from master: ' + msg)
    })
}