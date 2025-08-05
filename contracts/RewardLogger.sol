// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SBT.sol";

contract RewardLogger is Ownable {
    IERC20 public rewardToken;
    SBT public sbt;

    event ContributionLogged(
        uint256 indexed tokenId,
        address indexed artist,
        uint256 reward,
        string modelHash,
        uint256 round
    );

    constructor(address tokenAddress, address sbtAddress, address initialOwner)
        Ownable(initialOwner)
    {
        rewardToken = IERC20(tokenAddress);
        sbt = SBT(sbtAddress);
    }

    function logContributionAndReward(
        uint256 tokenId,
        string calldata modelHash,
        uint256 reward,
        uint256 round
    ) external onlyOwner {
        address artist = sbt.ownerOf(tokenId);
        require(artist != address(0), "Invalid tokenId or artist");

        rewardToken.transfer(artist, reward);

        emit ContributionLogged(tokenId, artist, reward, modelHash, round);
    }
}
