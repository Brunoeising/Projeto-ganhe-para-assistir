const { walletsMainnet, walletsTestnet, walletsTestnetDev, devConfig } = require("../helpers/wallets");

const WVWWithdraw = artifacts.require("WVWWithdraw");
const WVWToken = artifacts.require("WVWToken");
const WVWTicket = artifacts.require("WVWTicket");

let fee;
let minWithdraw;
let maxWithdraw;

let _overwrite = true;
let dev = true;

const WITHDRAW_ROLE = "0x5d8e12c39142ff96d79d04d15d1ba1269e4fe57bb9d26f43523628b34ba108ec";

module.exports = async function (deployer, _network, accounts) {

    let wallets = {};

    if (_network === "development") {
        fee = "10";
        minWithdraw = "1000000000000000000000";
        maxWithdraw = "10000000000000000000000";
        wallets._rewardWallet = accounts[8];
        wallets._withdrawerWallet = accounts[9];
    } else if ((_network === "testnet" || _network === "mumbai") && devConfig) {
        fee = "10";
        minWithdraw = "1000000000000000000000";
        maxWithdraw = "10000000000000000000000";
        wallets = walletsTestnetDev;
    } else if ((_network === "testnet" || _network === "mumbai") && !devConfig) {
        fee = "10";
        minWithdraw = "1000000000000000000000";
        maxWithdraw = "10000000000000000000000";
        wallets = walletsTestnet;
    } else if (_network === "bsc") {
        fee = "10";
        minWithdraw = "1000000000000000000000";
        maxWithdraw = "10000000000000000000000";
        wallets = walletsMainnet;
    }

    const _instanceWVWToken = await WVWToken.deployed();
    const _instanceWVWTicket = await WVWTicket.deployed();

    await deployer.deploy(
        WVWWithdraw,
        _instanceWVWToken.address,
        _instanceWVWTicket.address,
        fee,
        minWithdraw,
        maxWithdraw,
        wallets._rewardWallet,
        wallets._withdrawerWallet,
        {overwrite: _overwrite},
    );

    // This is possible to do only if you have local Seed.
    const _instanceWVWWithdraw = await WVWWithdraw.deployed();
    const balance = await _instanceWVWToken.balanceOf(wallets._rewardWallet);
    await _instanceWVWToken.approve(_instanceWVWWithdraw.address, balance);
    await _instanceWVWTicket.grantRole(WITHDRAW_ROLE, _instanceWVWWithdraw.address);
};
