const myLibrary = [];

let title;
let author;
let pages;
let uuid;
let readStatus;

// Book constructor
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages; 
    this.readStatus = readStatus;
    this.uuid = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, readStatus) {
    // Check if the book already exists in the library
    const existingBook = myLibrary.find(book => book.title === title && book.author === author && book.year === year);
    if (existingBook) { 
        console.log("Book already exists in the library.");
        return;
    }
    let book = new Book(title, author, pages, readStatus);
    myLibrary.push(book);
    console.log(`Book added: ${book.title} by ${book.author}, number of pages ${book.pages}`);
    // displayBooks();
    return book;
}

function displayBooks() {
    myLibrary.forEach(book => {
        const bookLists = document.querySelector("#library");

        

        const newDiv = document.createElement("div");
        newDiv.className = "book";

        newDiv.innerHTML = 
            `<h2>${book.title}</h2>
            <p><b>By:</b> ${book.author}</p>
            <p><b>${book.pages}</b> pages</p>
            <p id="readStatus">${book.readStatus}</p>
            <br>
            <button><span><<</span> Delete Book <span>>></span></button>`;

        bookLists.appendChild(newDiv);

        if (bookLists) {
            bookLists.appendChild(newDiv);
        } else {
            console.error("Book list element not found.");
            return;
        }

        // const readStatus = newDiv.querySelector("#readStatus");
        // if (book.readStatus === "Read") {
        //     readStatus.className = "read-status";
        //     readStatus.innerHTML = "Read";
        // }else {
        //     readStatus.className = "unread-status";
        //     readStatus.innerHTML = "Unread";
        // }
    });
}

const addBookButton = document.querySelector("#add-book");
addBookButton.addEventListener("click", () => {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const readStatus = document.querySelector("#readStatus").value;

    if (title && author && pages) {
        addBookToLibrary(title, author, pages, readStatus);
        displayBooks();
    } else {
        alert("Please fill in all fields.");
    }
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, "Read");
addBookToLibrary("1984", "George Orwell", 1949, "Unread");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 1960, "Read");
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 1925, "Unr ead");

displayBooks();

const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");
const addBookForm = document.querySelector("#add-book");

addBookForm.addEventListener("click", () => {
    dialog.showModal();
});


// "Close" button closes the dialog
closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});