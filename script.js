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
    // Add book info
    const info = document.createElement("div");
    info.className = "book-info";
    const author = document.createElement("div");
    author.textContent = `By: ${book.author}`;
    info.appendChild(author);
    const length = document.createElement("div");
    length.textContent = `Length: ${book.numPage} pages`;
    info.appendChild(length);
    bookCard.appendChild(info);
    // Add toggle switch
    const readToggle = document.createElement("div");
    readToggle.className = "read-toggle";
    const switchWrapper = document.createElement("div");
    switchWrapper.className = "switch-wrapper";
    const _switch = document.createElement("div");
    _switch.className = "switch";
    const toggleSwitch = document.createElement("input");
    toggleSwitch.className = "toggle-switch";
    toggleSwitch.type = "checkbox";
    const slider = document.createElement("span");
    slider.className = "slider round";
    _switch.appendChild(toggleSwitch);
    _switch.appendChild(slider);
    switchWrapper.appendChild(_switch);
    readToggle.appendChild(switchWrapper);
    bookCard.appendChild(readToggle);
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

