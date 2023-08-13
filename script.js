const booksDisplayDiv = document.querySelector(".books-display");

let myLibrary = [];

function Book(author, title, numPage, read) {
  // the constructor...
  this.author = author;
  this.title = title;
  this.numPage = numPage;
  this.read = read;
}

function addBookToLibrary() {
  // do stuff here
}

function createFakeData() {
    for (let i = 0; i < 10; i++) {
        const book = new Book(`Author ${i}`, `Title ${i}`, 100, false);
        myLibrary.push(book);
    }
}

function createBookCard(book) {
    // Clone the book card template
    const template = document.querySelector(".book-card");
    const bookCard = template.content.cloneNode(true);
    // Add book title
    const title = bookCard.querySelector(".book-title");
    title.textContent = book.title;
    // Add book info
    const author = bookCard.querySelector(".book-info > :first-child");
    author.textContent = `By: ${book.author}`
    const length = bookCard.querySelector(".book-info > :nth-child(2)");
    length.textContent = `Length: ${book.numPage} pages`
    // Add read status
    const toggle = bookCard.querySelector(".toggle-switch");
    const status = bookCard.querySelector(".read-toggle > :nth-child(2)");
    if (book.read) {
        toggle.checked = true;
        status.textContent = "Read";
    } else {
        toggle.checked = false;
        status.textContent = "Not read yet";
    }

    return bookCard;
}

function displayBooks() {
    for (const book of myLibrary) {
        const bookCard = createBookCard(book);
        booksDisplayDiv.appendChild(bookCard);
    }
}

createFakeData();
displayBooks();

