//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract StructTest {
    struct Book {
        string title;
        string author;
        uint id;
        bool available;
        uint quantity;
    }

    Book public book1;
    Book public book2 =  Book("Nuevo titulo", "Rodrigo", 1, true, 5);

    mapping(uint => Book) public libraryBook;

    function getBook(uint idBook) public view returns(bool){
        return libraryBook[idBook].available;
    }

    function addBook(Book memory newBook)public {
        libraryBook[newBook.id] = newBook;
    }

    function borrowBook(uint idBook) public {
        if(libraryBook[idBook].quantity == 1){
            libraryBook[idBook].available = false;
        }
        require(libraryBook[idBook].quantity > 0, "There is no more books in stock");
        libraryBook[idBook].quantity -= 1;
    }

    function getTitle() public view returns(string memory){
        return book1.title;
    }

    function setTitle() public {
        book1.title = "my title";
    }

    function getTitleAndIdBook() public view returns(string memory, uint){
        return (book2.title, book2.id);
    }
}
