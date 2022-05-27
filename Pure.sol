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

    function convertWeiToEther(uint amountWei) public pure returns(uint){
        return amountWei / 1 ether;
    }

    function convertEthertoWei(uint amountWei) public pure returns(uint){
        return amountWei * 1 ether;
    }

    function withdrawMoney(uint amount) public {
        require(convertEthertoWei(amount) <= myAddress[msg.sender], "Not enough money to withdraw");
        myAddress[msg.sender] -= convertEthertoWei(amount);
        address payable wallet = payable(msg.sender);
        wallet.transfer(convertEthertoWei(amount));

        //if(convertEthertoWei(amount) <= myAddress[msg.sender]){
        //    myAddress[msg.sender] -= amount * (10**18);
        //    address payable wallet = payable(msg.sender);
        //    wallet.transfer(convertEthertoWei(amount));
        //}
    }

    function setValue(uint index, bool value) public{
        myMapping[index] = value;
    }

    function setAddress(address wallet, uint amount) public {
        myAddress[wallet] = amount;
    }
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
