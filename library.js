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

const dialog = document.querySelector("dialog");
const submitButton = document.querySelector("dialog button");
const addBookForm = document.querySelector("#add-book");

addBookForm.addEventListener("click", () => {
    dialog.showModal();
});

const addBookButton = document.querySelector('button[type="submit"]');
const form = document.querySelector("form");
addBookButton.addEventListener("click", () => {
    if (!form.checkValidity()) {
        form.reportValidity(); // Show native validation messages
        return; // Stop here if the form is invalid
    }
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const readStatus = "Read";

    addBookToLibrary(title, author, pages, readStatus);
    displayBooks();
    dialog.close();
    form.reset(); // Reset the form after submission
});

const closeDialogButton = document.querySelector("#close-dialog-button");

closeDialogButton.addEventListener("click", () => {
  form.reset();      
  dialog.close();    
});
