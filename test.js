const SeeedStudioRelayBoard = require('js-seeed-studio-relay-board');

async function sleep(ms, rpi) {
    console.log(await rpi.getAll())
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

async function main() {
    const rpi = new SeeedStudioRelayBoard.Relay()
    const time = 500
    await rpi.init()
    await sleep(time, rpi)
    // await rpi.allOff()
    await sleep(time, rpi)
    await rpi.on(1)
    await sleep(time, rpi)
    await rpi.on(3)
    await sleep(time, rpi)
    await rpi.on(2)
    await sleep(time, rpi)
    await rpi.on(4)
    await sleep(time, rpi)
    await rpi.off(1)
    await sleep(time, rpi)
    await rpi.off(3)
    await sleep(time, rpi)
    await rpi.off(2)
    await sleep(time, rpi)
    await rpi.off(4)
    await sleep(time, rpi)
    await rpi.on(1)
    await rpi.on(4)
    await sleep(time, rpi)
    await rpi.on(3)
    await rpi.on(2)
    await sleep(time, rpi)
    await rpi.off(1)
    await rpi.off(4)
    await sleep(time, rpi)
    await rpi.off(3)
    await rpi.off(2)
    await sleep(time, rpi)
    // console.log('dd', await rpi.getRelay(1))

    //console.log('aa', await rpi.on(2))

    // console.log('state 1:', await rpi.getRelay(1))
    // console.log('state 2:', await rpi.getRelay(2))
    // console.log('state 3:', await rpi.getRelay(3))
    // console.log('state 4:', await rpi.getRelay(4))
    // console.log(await rpi.getAllStatus())
}

main()
