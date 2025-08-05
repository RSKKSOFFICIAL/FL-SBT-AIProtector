// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AccessControlFL is Ownable {
    mapping(address => bool) public approvedNodes;

    event NodeApproved(address indexed node);
    event NodeRevoked(address indexed node);

    constructor(address initialOwner) Ownable(initialOwner) {}

    modifier onlyApprovedNode() {
        require(approvedNodes[msg.sender], "Node not approved");
        _;
    }

    function approveNode(address node) external onlyOwner {
        approvedNodes[node] = true;
        emit NodeApproved(node);
    }

    function revokeNode(address node) external onlyOwner {
        approvedNodes[node] = false;
        emit NodeRevoked(node);
    }

    function isNodeApproved(address node) external view returns (bool) {
        return approvedNodes[node];
    }
}
