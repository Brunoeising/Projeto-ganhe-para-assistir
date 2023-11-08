const WVWToken = artifacts.require("WVWToken");
const WVWPreSale = artifacts.require("WVWPreSale");

let _owner = "";
let _walletPreSale = "";
let _walletTeam = "";
let _liquidityExchange = "";

const _tokenPrice = "5000000000000";
const _maxSpend = "3000000000000000000";
const _minSpend = "100000000000000000";

let _localSeed = true;
let _overwrite = true;


module.exports = async function (deployer, _network, accounts) {

    const _instanceToken = await WVWToken.deployed();
    let approveAmount = "";

    if (_network === "development") {
        _owner = accounts[0];
        _walletPreSale = accounts[6];
        _walletTeam = accounts[1];
        _liquidityExchange = accounts[4];
        _overwrite = true;
        _localSeed = true;
    } else if (_network === "testnet") {
        _owner = "0x7bC34B349aF9756D6fBAa32e13e5945d181b9613";
        _walletPreSale = "0xE38f7C92CB03511Cb81556B6fA6277d5E38af288";
        _walletTeam = "0x232C35c9C92Eae3cf7CB8dF1777F01673fe2029a";
        _liquidityExchange = "0x720D3766743ebe71092BF1E365f7Ee3576de57E8";
        _overwrite = true;
        _localSeed = true;
    } else if (_network === "goerli") {
        _owner = "0x7bC34B349aF9756D6fBAa32e13e5945d181b9613";
        _walletPreSale = "0xE38f7C92CB03511Cb81556B6fA6277d5E38af288";
        _walletTeam = "0x232C35c9C92Eae3cf7CB8dF1777F01673fe2029a";
        _liquidityExchange = "0x720D3766743ebe71092BF1E365f7Ee3576de57E8";
        _overwrite = true;
        _localSeed = true;
    } else if (_network === "bsc") {
        _owner = "0x7bC34B349aF9756D6fBAa32e13e5945d181b9613";
        _walletPreSale = "0xE38f7C92CB03511Cb81556B6fA6277d5E38af288";
        _walletTeam = "0x232C35c9C92Eae3cf7CB8dF1777F01673fe2029a";
        _liquidityExchange = "0x720D3766743ebe71092BF1E365f7Ee3576de57E8";
        _overwrite = true;
        _localSeed = false;
    }

    await deployer.deploy(
        WVWPreSale,
        _instanceToken.address,
        _owner,
        _tokenPrice,
        _walletPreSale,
        _walletTeam,
        _liquidityExchange,
        _maxSpend,
        _minSpend,
        {overwrite: _overwrite}
    );

    if (_localSeed && _overwrite) {
        const _instancePreSale = await WVWPreSale.deployed();
        approveAmount = await _instanceToken.balanceOf(_walletPreSale);
        await _instanceToken.approve(_instancePreSale.address, approveAmount.toString(), { from: _walletPreSale });
    }
};
