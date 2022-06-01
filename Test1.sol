//SPDX-License-Identifier: GPL-3.0

//contract Goerly: 0xBe8Ce3e77aFa45a217F16c5Bb8d1198f0344AEF4

pragma solidity ^0.8.0;

contract Test1 {
    address private teacherAddress;
    mapping(uint => Grade) private listGrades;
    event congratulation(string name, string message);
    bool open;

    constructor(){
        teacherAddress = msg.sender;
        open = true;
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

    modifier openRevisions(){
        require(open, "Everything related to revision is closed");
        _;
    }

    function addGradeRevision(uint id, string memory name) public teacherRestricted(msg.sender, "Only the teacher can add a new grade") openRevisions{
        require(keccak256(bytes(listGrades[id].name)) == keccak256(bytes("")), "The selected id is currently in use");
        require(bytes(name).length > 5, "The name's length must be more than 5 characters");
        listGrades[id] = Grade(id, name, 0, false, 0);
    }

    function finishGradeRevision(uint gradeId, uint score) public teacherRestricted(msg.sender, "Only the teacher can finish the revision") openRevisions{
        require(listGrades[gradeId].typeTest == 0 || listGrades[gradeId].typeTest ==2, "Your test was revised");
        listGrades[gradeId].finalized = true;
        listGrades[gradeId].typeTest = 1;
        listGrades[gradeId].score = score;

        if(listGrades[gradeId].score > 90){
            listGrades[gradeId].score = 100;
            emit congratulation(listGrades[gradeId].name, "Congratulations");
        }
    }

    function request2T(uint gradeId, string memory name) public openRevisions payable{
        require(keccak256(bytes(listGrades[gradeId].name)) == keccak256(bytes(name)), "The requested grade belongs to another student");
        require(listGrades[gradeId].typeTest == 1 && listGrades[gradeId].finalized, "Your test was not closed");
        require(convertWeiToEther(msg.value) >= 10, "The provided ethers are less than 10 ethers");
        if(convertWeiToEther(msg.value) > 10){
            payable (msg.sender).transfer( msg.value - 10*1 ether);
        }
        listGrades[gradeId].finalized = false;
        listGrades[gradeId].typeTest = 2;
        listGrades[gradeId].score = 0;

    }

    function getGrade(uint gradeId, string memory name) public view returns(Grade memory){
        require(keccak256(bytes(listGrades[gradeId].name)) == keccak256(bytes(name)), "The requested grade belongs to another student");
        return listGrades[gradeId];
    }

    function closeOrOpenRevisions(bool value) public teacherRestricted(msg.sender, "Only the teacher can open the university"){
        open = value;
    }

    function convertWeiToEther(uint weiAmount) private pure returns(uint) {
        return weiAmount / 1 ether;
    }

    function getBalanceOfUniversity() public view teacherRestricted(msg.sender, "Only the teacher can see the balance of the contract") returns(uint){
        return address(this).balance;
    }
}
