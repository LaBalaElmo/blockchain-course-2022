//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Inbox{
    string public message;

    constructor(){

    }

    function setMessage() public view returns(string memory){
        return message;
    }

    function getMessage(string memory newMessage) public {
        message = newMessage;
    }
}
