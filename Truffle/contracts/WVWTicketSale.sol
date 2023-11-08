// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./interfaces/IERC20WVW.sol";
import "./interfaces/IERC721WVW.sol";

contract WVWTicketSale is AccessControl, Pausable, ReentrancyGuard {
    using SafeMath for uint256;

    event BuyTicket(address indexed _buyer, uint8 _plan);

    IERC20WVW private erc20;
    IERC721WVW private erc721;

    uint256 private plan1Price;
    uint256 private plan2Price;
    uint256 private plan3Price;

    address private walletReward;
    address private walletTeam;
    address private owner;

    enum TicketType {
        PLAN1,
        PLAN2,
        PLAN3
    }

    constructor(
        address _erc20,
        address _erc721,
        address _owner,
        address _walletReward,
        address _walletTeam,
        uint256 _plan1Price,
        uint256 _plan2Price,
        uint256 _plan3Price
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, _owner);
        erc20 = IERC20WVW(_erc20);
        erc721 = IERC721WVW(_erc721);

        owner = _owner;
        walletReward = _walletReward;
        walletTeam = _walletTeam;
        plan1Price = _plan1Price;
        plan2Price = _plan2Price;
        plan3Price = _plan3Price;
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function setNFTPlan1Price(uint256 _newPrice)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        plan1Price = _newPrice;
    }

    function setNFTPlan2Price(uint256 _newPrice)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        plan2Price = _newPrice;
    }

    function setNFTPlan3Price(uint256 _newPrice)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        plan3Price = _newPrice;
    }

    function setWallets(
        address _walletReward,
        address _walletTeam
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        walletTeam = _walletTeam;
        walletReward = _walletReward;
    }

    function getNFTPlansPrice()
        public
        view
        returns (
            uint256 _plan1Price,
            uint256 _plan2Price,
            uint256 _plan3Price
        )
    {
        return (plan1Price, plan2Price, plan3Price);
    }

    function buyTicket(TicketType indexPlan) public whenNotPaused nonReentrant {
        uint256 price = 0;

        if (indexPlan == TicketType.PLAN1) {
            price = plan1Price;
        } else if (indexPlan == TicketType.PLAN2) {
            price = plan2Price;
        } else if (indexPlan == TicketType.PLAN3) {
            price = plan3Price;
        } else {
            require(false, "You need to choose a plan 1-3.");
        }

        // Get NFT price to contract.
        require(erc20.transferFrom(msg.sender, address(this), price));
        
        // Sent money to wallets as Tokenomics said so.
        sendMoneyToWalletReward(price);
        sendMoneyToWalletTeam(price);
        burnTokens(price);

        //After send the correct money to wallets then mint the NFT.
        erc721.safeMint(msg.sender, uint8(indexPlan));
        emit BuyTicket(msg.sender, uint8(indexPlan));
    }

    function sendMoneyToWalletReward(uint256 amount) private {
        // Send 80% to the Reward wallet
        (bool multSuccess, uint256 multResult) = amount.tryMul(8000);
        require(multSuccess, "Problem with safe math.");
        (bool divSuccess, uint256 divResult) = multResult.tryDiv(10_000);
        require(divSuccess, "Problem with safe math.");

        require(erc20.transfer(walletReward, divResult));
    }

    function sendMoneyToWalletTeam(uint256 amount) private {
        // Send 10% to the Team Wallet
        (bool multSuccess, uint256 multResult) = amount.tryMul(1000);
        require(multSuccess, "Problem with safe math.");
        (bool divSuccess, uint256 divResult) = multResult.tryDiv(10_000);
        require(divSuccess, "Problem with safe math.");

        require(erc20.transfer(walletTeam, divResult));
    }

    function burnTokens(uint256 amount) private {
        // Burn 10% of the Tokens
        (bool multSuccess, uint256 multResult) = amount.tryMul(1000);
        require(multSuccess, "Problem with safe math.");
        (bool divSuccess, uint256 divResult) = multResult.tryDiv(10_000);
        require(divSuccess, "Problem with safe math.");

        erc20.burn(divResult);
    }

    // If some WVWToken got stucked its possible to claim.
    function claimTokens() external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 balance = erc20.balanceOf(address(this));
        require(erc20.transfer(owner, balance));
    }
}
