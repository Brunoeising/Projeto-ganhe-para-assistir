// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IERC721WVW is IERC721 {
    function safeMint(address _to, uint8 _planType) external;

    function burn(uint256 tokenId) external;

    function getNFTByAddress(address _address)
        external
        view
        returns (uint256 _tokenId);
}
