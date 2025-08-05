// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SBT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    mapping(uint256 => bool) public soulbound;

    constructor(address initialOwner)
        ERC721("ArtistSoulboundImage", "SBTIMG")
        Ownable(initialOwner)
    {
        tokenCounter = 0;
    }

    function mintSBT(address artist, string memory uri) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(artist, newTokenId);
        _setTokenURI(newTokenId, uri);
        soulbound[newTokenId] = true;
        tokenCounter++;
        return newTokenId;
    }

    function burn(uint256 tokenId) public onlyOwner {
        _burn(tokenId); // ✅ No override needed
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
