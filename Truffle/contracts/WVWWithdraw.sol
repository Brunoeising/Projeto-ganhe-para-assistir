// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./interfaces/IERC721WVW.sol";


contract WVWWithdraw is Ownable, Pausable {
    struct WithdrawStatus {
        uint256 amount;
        uint256 times;
        uint256 lastWithdraw;
    }

    IERC20 private token;
    IERC721WVW private erc721;

    uint8 private fee;
    uint256 private minWithdraw;
    uint256 private maxWithdraw;
    address private rewardWallet;
    address private withdrawerWallet;

    mapping(address => bool) banList;
    mapping(address => WithdrawStatus) withdrawStatus;

    event Withdraw(address indexed user, uint256 amount, uint256 tokenId);

    constructor(
        address _token,
        address _erc721,
        uint8 _fee,
        uint256 _minWithdraw,
        uint256 _maxWithdraw,
        address _rewardWallet,
        address _withdrawerWallet
    ) {
        token = IERC20(_token);
        erc721 = IERC721WVW(_erc721);
        fee = _fee;
        minWithdraw = _minWithdraw;
        maxWithdraw = _maxWithdraw;
        rewardWallet= _rewardWallet;
        withdrawerWallet = _withdrawerWallet;  
    }

    modifier onlyWithdrawer() {
        require(
            msg.sender == withdrawerWallet,
            "Only the withdraw Wallet can perform this action."
        );
        _;
    }

    function withdrawRewards(address _userWallet, uint256 _amount)
        external
        onlyWithdrawer
        whenNotPaused
    {
        require(!banList[_userWallet], "This wallets is banned.");
        require(token.allowance(rewardWallet, address(this)) >= _amount, "This contract needs to increase its allowance from reward wallet");
        require(
            token.balanceOf(rewardWallet) > _amount,
            "We are out of stock."
        );
        require(minWithdraw <= _amount, "You can't withdraw this value");
        require(maxWithdraw >= _amount, "You can't withdraw this value");

        // User needs to approveForAll for withdraw contract
        require(erc721.isApprovedForAll(_userWallet, address(this)), "User needs to approve all for this contract.");
        
        // This will revert if address doesn't have any Ticket.
        uint256 tokenId = erc721.getNFTByAddress(_userWallet);

        uint256 _feeAmount = (_amount * fee) / 100;
        _amount -= _feeAmount;

        withdrawStatus[_userWallet].amount += _amount;
        withdrawStatus[_userWallet].times += 1;
        withdrawStatus[_userWallet].lastWithdraw = block.timestamp;

        require(
            token.transferFrom(rewardWallet, _userWallet, _amount),
            "Error to transfer tokens."
        );
        require(
            token.transferFrom(rewardWallet, withdrawerWallet, _feeAmount),
            "Error to transfer tokens."
        );

        erc721.burn(tokenId);
        emit Withdraw(_userWallet, _amount, tokenId);
    }

    function setWithdrawerWallet(address _withdrawerWallet) external onlyOwner {
        withdrawerWallet = _withdrawerWallet;
    }

    function getWithdrawerWallet() external view returns (address) {
        return withdrawerWallet;
    }

    function setBanAddress(address _address, bool _status) external onlyOwner {
        banList[_address] = _status;
    }

    function getBanAddress(address _address) external view returns (bool) {
        return banList[_address];
    }

    function setToken(IERC20 _token) external onlyOwner {
        token = _token;
    }

    function setFee(uint8 _fee) external onlyOwner {
        fee = _fee;
    }

    function setMinWithdraw(uint256 _minWithdraw) external onlyOwner {
        minWithdraw = _minWithdraw;
    }

    function setMaxWithdraw(uint256 _maxWithdraw) external onlyOwner {
        maxWithdraw = _maxWithdraw;
    }

    function setRewardWallet(address _rewardWallet) external onlyOwner {
        rewardWallet = _rewardWallet;
    }

    function getToken() external view returns (IERC20) {
        return token;
    }

    function getFee() external view returns (uint256) {
        return fee;
    }

    function getMinWithdraw() external view returns (uint256) {
        return minWithdraw;
    }

    function getMaxWithdraw() external view returns (uint256) {
        return maxWithdraw;
    }

    function getRewardWallet() external view returns (address) {
        return rewardWallet;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
