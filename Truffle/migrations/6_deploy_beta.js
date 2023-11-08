const { walletsMainnet, walletsTestnet, walletsTestnetDev, devConfig } = require("../helpers/wallets");

const WVWToken = artifacts.require("WVWToken");
const WVWPreSale = artifacts.require("WVWPreSale");

const _tokenPrice = "5000000000000";
const _maxSpend = "3000000000000000000";
const _minSpend = "100000000000000000";

let _localSeed = true;
let _overwrite = true;

module.exports = async function (deployer, _network, accounts) {

    const _instanceToken = await WVWToken.deployed();
    let approveAmount = "";
    let wallets = {};

    if (_network === "development") {
        wallets._owner = accounts[0];
        wallets._walletTeam = accounts[1];
        wallets._walletLiquidityExchange = accounts[4];
        wallets._walletLaunch = accounts[5];
        _overwrite = true;
        _localSeed = true;
    } else if ((_network === "testnet" || _network === "mumbai") && devConfig) {
        wallets = walletsTestnetDev;
        _overwrite = true;
        _localSeed = true;
    } else if ((_network === "testnet" || _network === "mumbai") && !devConfig) {
        wallets = walletsTestnet;
        _overwrite = true;
        _localSeed = true;
    } else if (_network === "goerli") {
        wallets = walletsTestnet;
        _overwrite = true;
        _localSeed = true;
    } else if (_network === "bsc") {
        wallets = walletsMainnet;
        _overwrite = true;
        _localSeed = false;
    }

    await deployer.deploy(
        WVWPreSale,
        _instanceToken.address,
        wallets._owner,
        _tokenPrice,
        wallets._walletLaunch,
        wallets._walletTeam,
        wallets._walletLiquidityExchange,
        _maxSpend,
        _minSpend,
        {overwrite: _overwrite}
    );

    if (_localSeed && _overwrite) {
        const _instancePreSale = await WVWPreSale.deployed();
        approveAmount = await _instanceToken.balanceOf(wallets._walletLaunch);
        await _instanceToken.approve(_instancePreSale.address, approveAmount.toString(), { from: wallets._walletLaunch });
    }
};