const { walletsMainnet, walletsTestnet, walletsTestnetDev, devConfig } = require("../helpers/wallets");

const WVWToken = artifacts.require("WVWToken");
const WVWDistribution = artifacts.require("WVWDistribution");

let _overwrite = true;
let _excludeFromFeeAddress = [];

let _fee = "";
let _swapWhen = "";
let _pancakeSwapRouter = "";

module.exports = async function (deployer, _network, accounts) {

    let wallets = {};

    if (_network === "development") {
        wallets._owner = accounts[0];
        _fee = "5";
        _swapWhen = "50000000000000000000"; // 50 Tokens
        _marketingWalletAddress = accounts[9];
        _pancakeSwapRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
        _overwrite = true;
    } else if (_network === "testnet" && !devConfig) {
        wallets = walletsTestnet;
        _fee = "5";
        _swapWhen = "50000000000000000000"; // 50 Tokens
        _pancakeSwapRouter = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
        _excludeFromFeeAddress = ["0x4c770440137c8e69dc5E2C4b0fddc09248f482c3",
            "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
            "0xE5f09103A2617E5f3E396bC5294a7Ce52E001966",
            "0x264e1f9298A48Bf58BB5C5298df89CF3c45Fddc2",
            "0x76D2B3c059Ec380bfC12721158432a12cdd01351",
            "0x69Ebf2F6C542936C6cc540FE623b854f88C3b685",
            "0x2607397f5D0a40a10f0787fF222D2D4929214b25",
            "0x236F22dA7a9F39Fb92F3898ffCBEB3d7194B0414",
            "0xe2521FA8F92C8eA323e18a9dA10A8021C5c685F1",
            "0x55475eaf16CcECAA661E169bdBA7d8625e36842C"
        ];

        _overwrite = true;

    } else if (_network === "testnet" && devConfig) {
        wallets = walletsTestnetDev;
        _fee = "5";
        _swapWhen = "50000000000000000000"; // 50 Tokens
        _pancakeSwapRouter = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
        _excludeFromFeeAddress = ["0x4c770440137c8e69dc5E2C4b0fddc09248f482c3",
            "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
            "0xE5f09103A2617E5f3E396bC5294a7Ce52E001966",
            "0x264e1f9298A48Bf58BB5C5298df89CF3c45Fddc2",
            "0x76D2B3c059Ec380bfC12721158432a12cdd01351",
            "0x69Ebf2F6C542936C6cc540FE623b854f88C3b685",
            "0x2607397f5D0a40a10f0787fF222D2D4929214b25",
            "0x236F22dA7a9F39Fb92F3898ffCBEB3d7194B0414",
            "0xe2521FA8F92C8eA323e18a9dA10A8021C5c685F1",
            "0x55475eaf16CcECAA661E169bdBA7d8625e36842C"
        ];

        _overwrite = true;

    } else if (_network === "mumbai" && !devConfig) {
        wallets = walletsTestnet;
        _fee = "5";
        _swapWhen = "50000000000000000000"; // 50 Tokens
        _pancakeSwapRouter = "0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5";
        _excludeFromFeeAddress = ["0x4c770440137c8e69dc5E2C4b0fddc09248f482c3",
            "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
            "0xE5f09103A2617E5f3E396bC5294a7Ce52E001966",
            "0x264e1f9298A48Bf58BB5C5298df89CF3c45Fddc2",
            "0x76D2B3c059Ec380bfC12721158432a12cdd01351",
            "0x69Ebf2F6C542936C6cc540FE623b854f88C3b685",
            "0x2607397f5D0a40a10f0787fF222D2D4929214b25",
            "0x236F22dA7a9F39Fb92F3898ffCBEB3d7194B0414",
            "0xe2521FA8F92C8eA323e18a9dA10A8021C5c685F1",
            "0x55475eaf16CcECAA661E169bdBA7d8625e36842C"
        ];

        _overwrite = true;

    }else if (_network === "mumbai" && devConfig) {
        wallets = walletsTestnetDev;
        _fee = "5";
        _swapWhen = "50000000000000000000"; // 50 Tokens
        _pancakeSwapRouter = "0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5";
        _excludeFromFeeAddress = ["0x4c770440137c8e69dc5E2C4b0fddc09248f482c3",
            "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
            "0xE5f09103A2617E5f3E396bC5294a7Ce52E001966",
            "0x264e1f9298A48Bf58BB5C5298df89CF3c45Fddc2",
            "0x76D2B3c059Ec380bfC12721158432a12cdd01351",
            "0x69Ebf2F6C542936C6cc540FE623b854f88C3b685",
            "0x2607397f5D0a40a10f0787fF222D2D4929214b25",
            "0x236F22dA7a9F39Fb92F3898ffCBEB3d7194B0414",
            "0xe2521FA8F92C8eA323e18a9dA10A8021C5c685F1",
            "0x55475eaf16CcECAA661E169bdBA7d8625e36842C"
        ];

        _overwrite = true;

    } else if (_network === "bsc") {
        // DANGER - Change values to mainnet
        wallets = walletsMainnet;
        _fee = "5";
        _swapWhen = "50000000000000000000"; // 50 Tokens

        // DOCS: https://docs.pancakeswap.finance/code/smart-contracts/pancakeswap-exchange/v2/router-v2
        // Pancakeswap router bsc (https://bscscan.com/address/0x10ed43c718714eb63d5aa57b78b54704e256024e)
        _pancakeSwapRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
        _excludeFromFeeAddress = ["0x4c770440137c8e69dc5E2C4b0fddc09248f482c3",
        "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
        "0xE5f09103A2617E5f3E396bC5294a7Ce52E001966",
        "0x264e1f9298A48Bf58BB5C5298df89CF3c45Fddc2",
        "0x76D2B3c059Ec380bfC12721158432a12cdd01351",
        "0x69Ebf2F6C542936C6cc540FE623b854f88C3b685",
        "0x2607397f5D0a40a10f0787fF222D2D4929214b25",
        "0x236F22dA7a9F39Fb92F3898ffCBEB3d7194B0414",
        "0xe2521FA8F92C8eA323e18a9dA10A8021C5c685F1",
        "0x55475eaf16CcECAA661E169bdBA7d8625e36842C"
        ];
        _overwrite = true;
    }

    const _instanceDistribution = await WVWDistribution.deployed();
    await deployer.deploy(
        WVWToken,
        wallets._owner,
        _instanceDistribution.address,
        _fee,
        _swapWhen,
        wallets._marketingWalletAddress,
        _pancakeSwapRouter,
        _excludeFromFeeAddress,
        { overwrite: _overwrite }
    );

    if (_overwrite) {
        const _instanceWVWToken = await WVWToken.deployed();
        await _instanceDistribution.configureTokenAddress(_instanceWVWToken.address);
    }
};
