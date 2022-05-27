//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract PauseDestroy {
    address private owner;
    bool public paused;

    constructor(){
        owner = msg.sender;
    }

    function setPaused(bool value) public{
        require(msg.sender == owner, "You are not the owner");
        paused = value;
    }

    function depositMoney() public payable {

    }

    function withdrawAllMoney(address payable to) public{
        require(msg.sender == owner, "You are not the owner");
        require(!paused, "Contract is paused");
        to.transfer(address(this).balance);
    }

    function destroyContract(address payable to) public {
        //require(msg.sender == owner, "You are not the owner");
        //require(!paused, "Contract is paused");
        selfdestruct(to);
    }
}
