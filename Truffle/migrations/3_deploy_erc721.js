const { walletsMainnet, walletsTestnet, walletsTestnetDev, devConfig } = require("../helpers/wallets");
const WVWTicket = artifacts.require("WVWTicket");

let _overwrite = true;

module.exports = async function (deployer, _network, accounts) {
    let wallets = {};

    if (_network === "development") {
        wallets._owner = accounts[0];
        _overwrite = true;
    } else if ((_network === "testnet" || _network === "mumbai") && devConfig) {
        wallets = walletsTestnetDev;
        _overwrite = true;
    } else if ((_network === "testnet" || _network === "mumbai") && !devConfig) {
        wallets = walletsTestnet;
        _overwrite = true;
    } else if (_network === "bsc") {
        wallets = walletsMainnet;
        _overwrite = true;
    }

    await deployer.deploy(
        WVWTicket,
        wallets._owner,
        {overwrite: _overwrite}
    );
};
