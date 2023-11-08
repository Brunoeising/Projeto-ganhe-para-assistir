// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WVWTicket is ERC721, Pausable, AccessControl, ERC721Burnable {
    using Counters for Counters.Counter;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant WITHDRAW_ROLE = keccak256("WITHDRAW_ROLE");

    event BurnToken(address _owner, uint256 _tokenId);

    Counters.Counter private _tokenIdCounter;

    enum TicketType {
        PLAN1,
        PLAN2,
        PLAN3
    }

    struct TicketAttributes {
        TicketType ticketType;
        uint256 creationTime;
        uint256 withdrawTimes;
    }

    string private constant PLAN1 =
        "QmVFmeZR75ZJKHU4q2ctz5SKsY1wERjX8o7K8vqw1NGNgs";
    string private constant PLAN2 =
        "QmPQ4oQ1tdJR83FngJMziJar9sNcry9FEfhPcBFeT5kwPr";
    string private constant PLAN3 =
        "QmYjUaB3XmqCcmVnHXJVnGgf7b3fffAztZaApUhH9ghUMz";

    mapping(uint256 => TicketAttributes) ticketsAttributes;
    mapping(address => uint256) owners;

    constructor(address _owner) ERC721("WVWTicket", "WVW") {
        _grantRole(DEFAULT_ADMIN_ROLE, _owner);
        _grantRole(PAUSER_ROLE, _owner);
        _grantRole(MINTER_ROLE, _owner);
        _grantRole(WITHDRAW_ROLE, _owner);

        //Start Counter by 1
        _tokenIdCounter.increment();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://wvw.infura-ipfs.io/ipfs/";
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function safeMint(address _to, uint8 _planType)
        public
        onlyRole(MINTER_ROLE)
    {
        require(
            balanceOf(_to) == 0,
            "You already have a NFT, please claim your rewards before buy anoter one."
        );
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_to, tokenId);
        ticketsAttributes[tokenId] = TicketAttributes(
            TicketType(_planType),
            block.timestamp,
            0
        );
        owners[_to] = tokenId;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        _requireMinted(_tokenId);
        string memory base = _baseURI();

        if (ticketsAttributes[_tokenId].ticketType == TicketType.PLAN1) {
            return string(abi.encodePacked(base, PLAN1));
        } else if (ticketsAttributes[_tokenId].ticketType == TicketType.PLAN2) {
            return string(abi.encodePacked(base, PLAN2));
        } else if (ticketsAttributes[_tokenId].ticketType == TicketType.PLAN3) {
            return string(abi.encodePacked(base, PLAN3));
        }
    }

    function getNFTAttributes(uint256 _tokenId)
        external
        view
        returns (TicketAttributes memory _attributes)
    {
        _requireMinted(_tokenId);
        return ticketsAttributes[_tokenId];
    }

    function getNFTByAddress(address _address)
        external
        view
        returns (uint256 _tokenId)
    {
        uint256 _id = owners[_address];
        _requireMinted(_id);
        return _id;
    }

    function setWithdrawCount(address _address)
        external
        onlyRole(WITHDRAW_ROLE)
    {
        uint256 _id = owners[_address];
        _requireMinted(_id);
        ticketsAttributes[_id].withdrawTimes =
            ticketsAttributes[_id].withdrawTimes +
            1;
    }

    function burn(uint256 _tokenId) public override onlyRole(WITHDRAW_ROLE) {
        // Remove attributes from burned token.
        delete ticketsAttributes[_tokenId];
        _burn(_tokenId);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
