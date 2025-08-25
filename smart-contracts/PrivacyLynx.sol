// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PrivacyLynx {
    event DataShared(address indexed user, string dataHash);

    function shareData(string memory dataHash) external {
        emit DataShared(msg.sender, dataHash);
    }
}
