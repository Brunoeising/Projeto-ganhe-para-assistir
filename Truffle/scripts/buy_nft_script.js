// Contracts
const WVWTicketSale = artifacts.require("WVWTicketSale");
const WVWToken = artifacts.require("WVWToken");
const WVWTicket = artifacts.require("WVWTicket");


const PLAN1 = "0";
const PLAN2 = "1";
const PLAN3 = "2";

module.exports = async function(callback) {
    const accounts = await web3.eth.getAccounts();
    const _walletFounder = accounts[7];
    
    const _instanceWVWTicketSale = await WVWTicketSale.deployed();
    const _instanceWVWToken = await WVWToken.deployed();
    const _instanceWVWTicket = await WVWTicket.deployed();

    // Get NFT plans
    const prices = await _instanceWVWTicketSale.getNFTPlansPrice();
    console.log("Get plan prices", prices._plan1Price.toString());

    // Check Token Balance before buy NFT
    const walletTokenBalanceBefore = await _instanceWVWToken.balanceOf(_walletFounder);
    console.log("Get balance of founder before ", walletTokenBalanceBefore.toString());

    // it needs to approve Tokens to Contract, exacly price to buy a NFT Plan.
    await _instanceWVWToken.approve(_instanceWVWTicketSale.address, prices._plan1Price.toString(), {from: _walletFounder});
    console.log("Aproved amount to founder wallet ", _instanceWVWTicketSale.address);

    // After aprove it needs to buy the NFT
    await _instanceWVWTicketSale.buyTicket(PLAN1, {from: _walletFounder});
    console.log("Buy NFT from Founder wallet ", _walletFounder);

    // Check BalanceOf Token and NFT to see if the transaction was a success.
    const walletNFTBalance = await _instanceWVWTicket.balanceOf(_walletFounder);
    console.log("Get BalanceOf from NFT ", walletNFTBalance.toString());

    const walletTokenBalanceAfter = await _instanceWVWToken.balanceOf(_walletFounder);
    console.log("Get balance of founder after ", walletTokenBalanceAfter.toString());

    callback();
}