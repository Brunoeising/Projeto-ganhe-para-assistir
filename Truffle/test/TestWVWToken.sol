// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

import "../contracts/WVWToken.sol";
import "../contracts/WVWDistribution.sol";

contract TestWVWToken {
    function testBalancesAfterDistributionTokensWasDeployed() public {
        WVWDistribution distribution = WVWDistribution(DeployedAddresses.WVWDistribution());
        WVWToken wvw = WVWToken(DeployedAddresses.WVWToken());
        
        // Distribution Contract must have
        uint distributionContractExpect = 50000000 * 10**18;
        // Launch Wallet must have
        uint launchWalletExpect = 30000000 * 10**18;
        // Launch Wallet must have
        uint preSaleWalletExpect = 10000000 * 10**18;
        // Launch Wallet must have
        uint founderWalletExpect = 10000000 * 10**18;

        Assert.equal(wvw.balanceOf(DeployedAddresses.WVWDistribution()), distributionContractExpect, "Incorrect distribution contract balance");
        Assert.equal(wvw.balanceOf(distribution.walletLaunch()), launchWalletExpect, "Incorrect launch wallet balance");
        Assert.equal(wvw.balanceOf(distribution.walletPreSale()), preSaleWalletExpect, "Incorrect launch wallet balance");
        Assert.equal(wvw.balanceOf(distribution.walletFounder()), founderWalletExpect, "Incorrect launch wallet balance");
    }
}