//SPDX-License-Identifier: GPL-3.0

//0xb37C7cdA76cca41cF56556E05B7c1076Bbc0519d
pragma solidity ^0.8.0;

contract Inbox{
    string public message;
    address private ownerAddress;

    constructor(string memory initialMessage){
        ownerAddress = msg.sender;
        message = initialMessage;
    }

    function getMessage() public view ownerRestricted(msg.sender) returns(string memory){
        return message;
    }

    function setMessage(string memory newMessage) public ownerRestricted(msg.sender){
        message = newMessage;
    }

    modifier ownerRestricted(address client){
        require(ownerAddress == msg.sender, "Solo el owner puede modificar el mensaje");
        _;
    }
}
