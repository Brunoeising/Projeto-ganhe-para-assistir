const { walletsMainnet, walletsTestnet, walletsTestnetDev, devConfig } = require("../helpers/wallets");

const WVWTicketSale = artifacts.require("WVWTicketSale");
const WVWTicket = artifacts.require("WVWTicket");
const WVWToken = artifacts.require("WVWToken");

let _plan1Price = "";
let _plan2Price = "";
let _plan3Price = "";

const MINT_ROLE = "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
const _localSeed = true;

module.exports = async function (deployer, _network, accounts) {

    let wallets = {};

    if (_network === "development") {
        wallets._owner = accounts[0];
        wallets._rewardWallet = accounts[1];
        wallets._walletTeam = accounts[2];

        _plan1Price = "5000000000000";
        _plan2Price = "5000000000000";
        _plan3Price = "5000000000000";
        _overwrite = true;
    } else if ((_network === "testnet" || _network === "mumbai") && devConfig) {
        wallets = walletsTestnetDev;

        _plan1Price = "500000000000000000000";
        _plan2Price = "20000000000000000000000";
        _plan3Price = "60000000000000000000000";
        _overwrite = true;
    } else if ((_network === "testnet" || _network === "mumbai")  && !devConfig) {
        wallets = walletsTestnet;

        _plan1Price = "500000000000000000000";
        _plan2Price = "20000000000000000000000";
        _plan3Price = "60000000000000000000000";
        _overwrite = true;
    } else if (_network === "bsc") {
        wallets = walletsMainnet;

        _plan1Price = "500000000000000000000";
        _plan2Price = "20000000000000000000000";
        _plan3Price = "60000000000000000000000";
        _overwrite = true;
    }

    const _instanceWVWToken = await WVWToken.deployed();
    const _instanceWVWTicket = await WVWTicket.deployed();

    await deployer.deploy(
        WVWTicketSale,
        _instanceWVWToken.address,
        _instanceWVWTicket.address,
        wallets._owner,
        wallets._rewardWallet,
        wallets._walletTeam,
        _plan1Price,
        _plan2Price,
        _plan3Price,
        {overwrite: _overwrite}
    );

    if (_localSeed) {
        const _instanceWVWTicketSale = await WVWTicketSale.deployed();
        await _instanceWVWTicket.grantRole(MINT_ROLE, _instanceWVWTicketSale.address, { from: wallets._owner });
    }
};
