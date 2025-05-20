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
    
    let book = new Book(title, author, pages, readStatus);
    myLibrary.push(book);
    // displayBooks();
    return book;
}

function displayBooks() {
    const bookLists = document.querySelector("#library");

    // ✅ Clear the container so books aren't duplicated
    bookLists.innerHTML = "";

    myLibrary.forEach(book => {
        const newDiv = document.createElement("div");
        newDiv.className = "book";
        newDiv.id = book.uuid;
        const readStatusClass = book.readStatus === "Read" ? "read-status" : "unread-status";

        newDiv.innerHTML = 
            `<h2>${book.title}</h2>
            <p><b>By:</b> ${book.author}</p>
            <p><b>${book.pages}</b> pages</p>
            <button class="readButton"><p class="${readStatusClass}">${book.readStatus}</p></button>
            <br>
            <button class="deleteBook"><span><<</span> Delete Book <span>>></span></button>`;

        if (bookLists) {
            bookLists.appendChild(newDiv);
        } else {
            console.error("Book list element not found.");
            return;
        }

        const deleteButton = newDiv.querySelector(".deleteBook");
        deleteButton.addEventListener("click", deleteBook);
    });
    attachReadStatusListeners();
}

const dialog = document.querySelector("dialog");
const submitButton = document.querySelector("dialog button");
const addBookForm = document.querySelector("#add-book");

addBookForm.addEventListener("click", () => {
    dialog.showModal();
});

const addBookButton = document.querySelector('button[type="submit"]');
const form = document.querySelector("form");
const checkbox = document.querySelector("#read");
addBookButton.addEventListener("click", () => {
    if (!dialog.open) {
        dialog.showModal();
    }
    if (!form.checkValidity()) {
        return; // Stop here if the form is invalid
    }
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const readStatus = checkbox.checked ? "Read" : "Unread";

    addBookToLibrary(title, author, pages, readStatus);
    displayBooks();
    form.reset();
    dialog.close();
});

const closeDialogButton = document.querySelector("#close-dialog-button");
closeDialogButton.addEventListener("click", () => {
    form.reset();      
    dialog.close();    
});

function attachReadStatusListeners() {
    const readStatusToggle = document.querySelectorAll(".book .readButton");
    readStatusToggle.forEach(button => {
        button.removeEventListener("click", toggleStatus);
        button.addEventListener("click", toggleStatus);
    });
}

function toggleStatus(e) {
    const readStatusChange = e.currentTarget.querySelector("p");
    if (readStatusChange.textContent === "Read") {
        readStatusChange.textContent = "Unread";
        readStatusChange.className = "unread-status";
    } else {
        readStatusChange.textContent = "Read";
        readStatusChange.className = "read-status";
    }
}


function deleteBook(e) {
    const bookElement = e.currentTarget.closest(".book");
    const bookId = bookElement.id;
    const bookIndex = myLibrary.findIndex(book => book.uuid === bookId);
    
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        bookElement.remove();
    } else {
        console.error("Book not found in library.");
    }
}

function runOnFirstLoad() {
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "Read");
    addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, "Read");
    addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, "Unread");
    addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "Read");
    displayBooks();
}
window.addEventListener("DOMContentLoaded", runOnFirstLoad);

attachReadStatusListeners();
