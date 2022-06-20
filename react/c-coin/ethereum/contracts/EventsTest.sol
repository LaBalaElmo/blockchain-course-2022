//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract EventTest {
    address private owner;
    mapping(address => uint) public tokenBalance;

    event tokenSent(address from, address to, uint amount);

    constructor() {
        tokenBalance[msg.sender] = 100;
        owner = msg.sender;
    }

    function sendToken(address to, uint amount) public returns(bool) {
        require(owner == msg.sender, "You are not the owner");
        tokenBalance[msg.sender] -= amount;
        tokenBalance[to] += amount;

        emit tokenSent(msg.sender, to, amount);

        return true;
    }
}
