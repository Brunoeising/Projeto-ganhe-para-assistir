const { walletsMainnet, walletsTestnet, walletsTestnetDev, devConfig } = require("../helpers/wallets");

const WVWDistribution = artifacts.require("WVWDistribution");

let _overwrite = true;

module.exports = async function (deployer, _network, accounts) {
    let wallets = {};
    
    if (_network === "development") {
        wallets._owner = accounts[0];
        wallets._walletTeam = accounts[1];
        wallets._walletPartners = accounts[2];
        wallets._walletGiveWays = accounts[3];
        wallets._walletLiquidityExchange = accounts[4];
        wallets._walletLaunch = accounts[5];
        wallets._walletStake = accounts[6];
        wallets._walletFounder = accounts[7];

        _overwrite = true;
    } else if (_network === "testnet" && devConfig) {
        wallets = walletsTestnetDev;
        _overwrite = true;
    } else if (_network === "mumbai" && devConfig) {
        wallets = walletsTestnetDev;
        _overwrite = true;
    } else if (_network === "testnet" && !devConfig) {
        wallets = walletsTestnet;
        _overwrite = true;
    } else if (_network === "bsc") {
        wallets = walletsMainnet;
        _overwrite = true;
    }

    await deployer.deploy(
        WVWDistribution,
        wallets._owner,
        wallets._walletTeam,
        wallets._walletPartners,
        wallets._walletGiveWays,
        wallets._walletLiquidityExchange,
        wallets._walletLaunch,
        wallets._walletStake,
        wallets._walletFounder,
        {overwrite: _overwrite}
    );
};
