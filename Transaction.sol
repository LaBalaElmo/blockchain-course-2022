//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract ModifierExample {
    bool public myBoolean;
    string public myString;
    uint public myNumber;
    mapping(uint => bool) public myMapping;
    mapping(address => uint) public myAddress;

    function receiveMoney() public payable {
        myAddress[msg.sender] += msg.value;
    }

    function withdrawMoney(uint amount) public {
        myAddress[msg.sender] -= amount * (10**18);
        address payable wallet = payable(msg.sender);
        wallet.transfer(amount * (10**18));
    }

    function setValue(uint index, bool value) public{
        myMapping[index] = value;
    }

    function setAddress(address wallet, uint amount) public {
        myAddress[wallet] = amount;
    }
}
