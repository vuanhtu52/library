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
    const bookCard = document.createElement("div");
    bookCard.className = "book";
    // Create a strip at the left side of the card
    const stripe = document.createElement("div");
    stripe.className = "stripe";
    bookCard.appendChild(stripe);
    // Add title to card
    const title = document.createElement("div");
    title.className = "book-title";
    title.textContent = book.title;
    bookCard.appendChild(title);
    // Add number of pages to card
    const numPage = document.createElement("div");
    return bookCard;
}

function displayBooks() {
    for (const book of myLibrary) {
        const bookCard = createBookCard(book);
        booksDisplayDiv.appendChild(bookCard);
    }
}

createFakeData();
// displayBooks();
