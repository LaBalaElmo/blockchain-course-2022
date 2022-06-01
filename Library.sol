//SPDX-License-Identifier: GPL-3.0

//contract Rinkeby: 0xE546E4D6FB1a98839fD455580F8a7b78C909585C

pragma solidity ^0.8.0;

contract Library {
    address private ownerAddress;
    mapping(string => Book) public generalLibrary;
    mapping(address => uint) public totalMoney;
    bool private open;
    mapping(address => string[]) private loanedBooks;

    struct Book {
        string title;
        string author;
        bool available;
        uint priceBorrow;
    }

    constructor(){
        ownerAddress = msg.sender;
        open = true;
    }

    modifier ownerRestricted(address client, string memory message){
        require(ownerAddress == msg.sender, message);
        _;
    }

    modifier libraryOpen(){
        require(open, "The library is closed for now");
        _;
    }

    function bookDoesntExists(Book memory book) private pure returns(bool){
        return keccak256(bytes(book.title)) == keccak256(bytes("")) && keccak256(bytes(book.author)) == keccak256(bytes(""));
    }

    function hasTheBook(string memory bookName) private view returns(bool, uint){
        for(uint i = 0; i < loanedBooks[msg.sender].length; i++){
            if(keccak256(bytes(loanedBooks[msg.sender][i])) == keccak256(bytes(bookName))){

                return (true, i);
            }
        }
        return (false, 0);
    }

    function remove(uint index) private {
        if (index >= loanedBooks[msg.sender].length) return;

        for (uint i = index; i<loanedBooks[msg.sender].length-1; i++){
            loanedBooks[msg.sender][i] = loanedBooks[msg.sender][i+1];
        }
        loanedBooks[msg.sender].pop();

    }

    function addBook(Book memory book) public ownerRestricted(msg.sender, "Only the owner can add a book") {
        require(bookDoesntExists(generalLibrary[book.title]), "The book is registered");
        generalLibrary[book.title] = book;
        //The priceBorrow value must be in Wei in order to put values less than 1
        generalLibrary[book.title].priceBorrow = book.priceBorrow;
    }

    function getBalance() public view ownerRestricted(msg.sender, "Only the owner can see the balance") returns(uint){
        return address(this).balance;
    }

    function closeLibrary() public ownerRestricted(msg.sender, "Only the owner can close the library") {
        open = false;
    }

    function openLibrary() public ownerRestricted(msg.sender, "Only the owner can close the library") {
        open = true;
    }

    function getRentedBooks() public view returns(string[] memory){
        return loanedBooks[msg.sender];
    }

    function rentBook(string memory bookName) public libraryOpen() payable{
        require(msg.value >= generalLibrary[bookName].priceBorrow, "The money provided is not less than the cost of the book");
        require(generalLibrary[bookName].available, "The book is currently unavailable");
        if(msg.value > generalLibrary[bookName].priceBorrow){
            payable (msg.sender).transfer(msg.value - generalLibrary[bookName].priceBorrow);
        }
        totalMoney[msg.sender] += generalLibrary[bookName].priceBorrow;
        generalLibrary[bookName].available = false;
        loanedBooks[msg.sender].push(bookName);
    }

    function returnBook(string memory bookName) public libraryOpen(){
        (bool hasBook, uint index) = hasTheBook(bookName);
        require(hasBook, "You did not rent this book");
        remove(index);
        totalMoney[msg.sender] -= generalLibrary[bookName].priceBorrow;
        generalLibrary[bookName].available = true;
        payable (msg.sender).transfer(generalLibrary[bookName].priceBorrow);
    }

    function addBooksToLibrary() public ownerRestricted(msg.sender, "Only the owner can add books to the library") {
        generalLibrary["Harry Potter"] = Book("Harry Potter", "JK Rowling", true, 8000000000000000);
        generalLibrary["El Alquimista"] = Book("El Alquimista", "Paulo Coelho", true, 10000000000000000);
        generalLibrary["Codigo da Vinci"] = Book("Codigo da Vinci", "Dan Brown", true, 12000000000000000);
        generalLibrary["Crepusculo"] = Book("Crepusculo", "Stephenie Meyer", true, 5000000000000000);
        generalLibrary["Piense y hagase rico"] = Book("Piense y hagase rico", "Napoleos Hill", true, 20000000000000000);
        generalLibrary["Diario de Ana Frank"] = Book("Diario de Ana Frank", "Anna Frank", true, 6000000000000000);
    }
}
