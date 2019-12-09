# js-seeed-studio-relay-board

This is a node.js package that can control and get state of the [Seeed Studio Raspberry Pi Relay Board v.1.0](https://www.seeedstudio.com/Raspberry-Pi-Relay-Board-v1.0-p-2409.html).
Inspired by the [Python library for the Seeed Studio Relay Board](https://github.com/johnwargo/Seeed-Studio-Relay-Board).


## Getting Started

Install :
```
npm install js-seeed-studio-relay-board
```

## Usage
```js
const SeeedStudioRelayBoard = require('js-seeed-studio-relay-board')

async function main() {
    const rpi = new SeeedStudioRelayBoard.Relay()

    // Initialize I2C controler
    await rpi.init()

    /**
     * Examples
     **/

    // Turn relay 3 ON.
    await rpi.on(3)

    // Get status of relay 3.
    await rpi.get(3)

    // Get status of all relays.
    await rpi.getAll()

    // Turn relay OFF.
    await rpi.off(3)

    // Turn all relays OFF.
    await rpi.allOff()
}
```

## Contributing
If you wanna fix something feel free to open a issue or a PR.