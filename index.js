console.log("hello this is index.js")

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class BookOperations {
    //   checks validation 
    validateBook(name, author) {
        if (name.length > 2 && author.length > 2) {
            return true;
        }
        else {
            return false;
        }
    }
    //    used to display book 
    displayBook(bookList) {
        let uIString = "";
        let tableBody = document.getElementById("tableBody");
        for (let i = 0; i < bookList.length; i++) {
            uIString += `<tr>
                             <td>${bookList[i].name}</td>
                             <td>${bookList[i].author}</td>
                             <td>${bookList[i].type}</td>
                             <td <button type="button" class="btn btn-outline-danger" onclick = "deleteTheBook(${i})"  id = ${i}>Delete</button> </td>
                            
                        </tr> <br>`
        }

        tableBody.innerHTML = uIString;
    }
    // shows message whether book was added or not 
    showMessage(value, messageToDisplay) {
        let message = document.getElementById("Message");
        message.innerHTML = ` <div class="alert alert-${value} alert-dismissible fade show" role="alert">
                              <strong>${messageToDisplay}</strong> 
                              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                           </div> `
        //    auto dismiss alert after 2s 
        setTimeout(() => {
            message.innerHTML = ""
        }, 1000);

    }
}

// creating bookList array 
let bookList = [];
// creating object of class BookOperations
let bookOperations = new BookOperations();

let libraryForm = document.getElementById("libraryForm");
// adding event listener to the form on submit 
libraryForm.addEventListener("submit", libraryFormSubmitted);

function libraryFormSubmitted() {
    // prevent default behavior of sumbit event on form 
    event.preventDefault();

    // taking values from the user 
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("bookAuthor").value;
    let type = document.getElementById("bookType").value;
    // validating book 
    if (bookOperations.validateBook(name, author)) {
        // creating book from the above values 
        const book = new Book(name, author, type);
        // pushing book in bookList array 
        bookList.push(book);
        // showing success message 
        bookOperations.showMessage("success", "Book has been added successfully");
        // displaying the bookList 
        bookOperations.displayBook(bookList);
    }
    else {
        bookOperations.showMessage("danger", "Error in adding the book")

    }



}

// this function deletes the book 
function deleteTheBook(i) {
    // at position i delete 1 element from bookList array 
    bookList.splice(i, 1);
    // displayBook with updated data 
    bookOperations.displayBook(bookList);
}


