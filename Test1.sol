//SPDX-License-Identifier: GPL-3.0

//contract Rinkeby: 0xE546E4D6FB1a98839fD455580F8a7b78C909585C

pragma solidity ^0.8.0;

contract Test1 {
    address private teacherAddress;
    mapping(uint => Grade) listGrades;

    constructor(){
        teacherAddress = msg.sender;
    }
    struct Grade {
        uint id;
        string name;
        uint score;
        bool finalized;
        uint typeTest;
    }

    modifier teacherRestricted(address student, string memory message){
        require(student == teacherAddress, message);
        _;
    }

    function addRevisionGrade(uint id, string memory name) public teacherRestricted(msg.sender, "Only the teacher can add a new grade"){
        require(bytes(listGrades[id].name).length > 0, "The selected id is currently in use");
        require(bytes(listGrades[id].name).length > 5, "The name's length must be more than 5 characters");
        listGrades[id] = Grade(id, name, 0, false, 0);
    }
}
