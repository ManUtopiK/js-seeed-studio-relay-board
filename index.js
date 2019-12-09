const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;



/**
 * The number of relay ports on the relay board.
 * This value should never change!
 */
const NUM_RELAY_PORTS = 4

/**
 * Change the following value if your Relay board uses a different I2C address.
 * To know I2C address of your relay board in your raspberry pi, try:
 * `i2cdetect -y -r 1`
 */
const DEVICE_ADDRESS = 0x20

/**
 * Don't change the values, there's no need for that.
 */
const DEVICE_REG_MODE1 = 0x06
const DEVICE_REG_DATA = 0xff // 255 mean all relay off



/**
 * Initialize Relay prototype that will contains all functions.
 * Should be followed by init() call.
 * eg:
 * ```
 * const SeeedStudioRelayBoard = require('js-seeed-studio-relay-board');

 * const rpi = new SeeedStudioRelayBoard.Relay()
 * rpi.init()
 * ```
 */
function Relay() {
    this.status = DEVICE_REG_DATA
}



/**
 * Internal use to get I2C handler.
 */
Relay.prototype._initRaspi = function() {
    return new Promise(function(resolve, reject) {
        try {
            raspi.init(function() {
                resolve(new I2C())
            })
        } catch(err) {
            reject(err)
        }
    })
}



/**
 * Initialize I2C and current board status.
 */
Relay.prototype.init = async function() {
    this.I2C = await this._initRaspi()
    this.status = await this.I2C.readByteSync(DEVICE_ADDRESS, DEVICE_REG_MODE1)
}



/**
 * Check if provided relay number is correct. Throw error if not
 */
Relay.prototype.checkRelayNumber = function(relay_num) {
    try {
        if (!relay_num) throw 'No relay specified.'
        if (relay_num < 1 || relay_num > NUM_RELAY_PORTS) throw `Relay number should be between 1 and ${NUM_RELAY_PORTS}.`
    } catch(err) {
        console.error(`SeeedStudioRelayBoard error: ${err}`)
    }
}



/**
 * Get status of a relay.
 */
Relay.prototype.get = function(relay_num) {
    this.checkRelayNumber(relay_num)
    const mask = 1 << (relay_num - 1)
    return (this.status & mask) == 0
}



/**
 * Get status of all relays.
 */
Relay.prototype.getAll = function() {
    const relais = {}
    for (let i = 1; i <= NUM_RELAY_PORTS; i++) {
        const mask = 1 << (i - 1)
        relais[i] = (this.status & mask) == 0
    }
    return relais
}



/**
 * Turn relay ON.
 */
Relay.prototype.on = function(relay_num) {
    this.checkRelayNumber(relay_num)
    this.status &= ~(0x1 << (relay_num - 1))
    this.I2C.writeByteSync(DEVICE_ADDRESS, DEVICE_REG_MODE1, this.status)
}



/**
 * Turn relay OFF.
 */
Relay.prototype.off = function(relay_num) {
    this.checkRelayNumber(relay_num)
    this.status |= (0x1 << (relay_num - 1))
    this.I2C.writeByteSync(DEVICE_ADDRESS, DEVICE_REG_MODE1, this.status)
}



/**
 * Turn all relays OFF.
 */
Relay.prototype.allOff = function() {
    this.status = DEVICE_REG_DATA
    this.I2C.writeByteSync(DEVICE_ADDRESS, DEVICE_REG_MODE1, this.status)
}



module.exports.Relay = Relay