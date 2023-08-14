let myLibrary = [];

function Book(author, title, numPage, read) {
    // the constructor...
    this.author = author;
    this.title = title;
    this.numPage = numPage;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createFakeData() {
    for (let i = 0; i < 3; i++) {
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
    //Remove all current books first
    const booksDisplayDiv = document.querySelector(".books-display");
    while (booksDisplayDiv.lastElementChild && booksDisplayDiv.lastElementChild.className !== "book-card") {
        booksDisplayDiv.removeChild(booksDisplayDiv.lastElementChild);
    }
    //Display books
    for (const book of myLibrary) {
        const bookCard = createBookCard(book);
        booksDisplayDiv.appendChild(bookCard);
    }
}

function resetNewBookForm() {
    // Reset title
    const titleInput = document.querySelector("#title");
    titleInput.className = "";
    titleInput.value = "";
    const titleInputError = document.querySelector(`#${titleInput.id} + span.error`);
    titleInputError.textContent = "";
    // Reset author
    const authorInput = document.querySelector("#author");
    authorInput.className = "";
    authorInput.value = "";
    const authorInputError = document.querySelector(`#${authorInput.id} + span.error`);
    authorInputError.textContent = "";
    // Reset length
    const lengthInput = document.querySelector("#length");
    lengthInput.className = "";
    lengthInput.value = "";
    const lengthInputError = document.querySelector(`#${lengthInput.id} + span.error`);
    lengthInputError.textContent = "";
    // Reset read status question
    const yesInput = document.querySelector("#yes");
    yesInput.checked = false;
    const noInput = document.querySelector("#no");
    noInput.checked = false;
}

function validateForm() {
    let validForm = true;
    // Check if title is empty
    const titleInput = document.querySelector("#title");
    if (titleInput.value === "") {
        titleInput.className = "invalid";
        const titleInputError = document.querySelector(`#${titleInput.id} + span.error`);
        titleInputError.textContent = "Please fill out this field";
    }
    // Check if title has invalid value
    if (titleInput.className === "invalid") {
        validForm = false;
    }

    // Check if author is empty
    const authorInput = document.querySelector("#author");
    if (authorInput.value === "") {
        authorInput.className = "invalid";
        const authorInputError = document.querySelector(`#${authorInput.id} + span.error`);
        authorInputError.textContent = "Please fill out this field";
    }
    // Check if author has invalid value
    if (authorInput.className === "invalid") {
        validForm = false;
    }

    // Check if length is empty
    const lengthInput = document.querySelector("#length");
    if (lengthInput.value === "") {
        lengthInput.className = "invalid";
        const lengthInputError = document.querySelector(`#${lengthInput.id} + span.error`);
        lengthInputError.textContent = "Please provide a positive number.";
    }
    // Check if length is an invalid number
    if (lengthInput.className === "invalid") {
        validForm = false;
    }

    // Check if user picked an option for read status
    const yesInput = document.querySelector("#yes");
    const noInput = document.querySelector("#no");
    if (!yesInput.checked && !noInput.checked) {
        const readStatusInputError = document.querySelector("#new-book-form > .form-field:nth-child(4) > span");
        readStatusInputError.textContent = "Please pick an option.";
        validForm = false;
    }

    return validForm;
}

function validateTitle(titleInput) {
    const allTitles = myLibrary.map(book => book.title);
    const titleInputError = document.querySelector(`#${titleInput.id} + span.error`);
    if (allTitles.includes(titleInput.value)) {
        titleInput.className = "invalid";
        titleInputError.textContent = "This book already exists.";
    } else if (titleInput.value === "") {
        titleInput.className = "invalid";
        titleInputError.textContent = "Please fill out this field.";
    } else {
        titleInput.className = "valid";
        titleInputError.textContent = "";
    }
}

function validateAuthor(authorInput) {
    const authorInputError = document.querySelector(`#${authorInput.id} + span.error`);
    if (authorInput.value === "") {
        authorInput.className = "invalid";
        authorInputError.textContent = "Please fill out this field.";
    } else {
        authorInput.className = "valid";
        authorInputError.textContent = "";
    }
}

function isValidLength(text) {
    for (let i = 0; i < text.length; i++) {
        if (!/\d/.test(text.charAt(i))) {
            return false;
        }
    }
    return true;
}

function validateLength(lengthInput) {
    const lengthInputError = document.querySelector(`#${lengthInput.id} + span.error`);
    if (lengthInput.value === "" || !isValidLength(lengthInput.value)) {
        lengthInput.className = "invalid";
        lengthInputError.textContent = "Please provide a positive number.";
    }
    else {
        lengthInput.className = "valid";
        lengthInputError.textContent = "";
    }
}

function validateReadStatus() {
    const readStatusInputError = document.querySelector("#new-book-form > .form-field:nth-child(4) > span");
    readStatusInputError.textContent = "";
}

function updateSummary() {
    // Display the summary section
    const totalBooks = document.querySelector(".summary-board > :nth-child(2)");
    totalBooks.textContent = `${myLibrary.length}`;

    const readBooks = document.querySelector(".summary-board > :nth-child(4)");
    const readBooksCount = myLibrary.filter(book => book.read).length;
    readBooks.textContent = `${readBooksCount}`;

    const unreadBooks = document.querySelector(".summary-board > :nth-child(6)");
    const unreadBooksCount = myLibrary.filter(book => !book.read).length;
    unreadBooks.textContent = `${unreadBooksCount}`;
}


createFakeData();
displayBooks();
updateSummary();

// Open a popup to add new book
const addBookButton = document.querySelector("#add-book");
addBookButton.addEventListener("click", () => {
    const newBookPopup = document.querySelector("#new-book-popup");
    newBookPopup.showModal();
    // Prevent scrolling when popup is open
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    // Reset the fields
    resetNewBookForm();
});

// Detect when popup is closed
const newBookPopup = document.querySelector("#new-book-popup");
newBookPopup.addEventListener("close", () => {
    // Enable scrolling again
    const body = document.querySelector("body");
    body.style.overflow = "auto";
});


// When user clicks add button in new book form
const addButton = document.querySelector("#new-book-form .add");
addButton.addEventListener("click", event => {
    event.preventDefault();
    let isValidForm = validateForm();
    if (isValidForm) {
        // Add new book
        const authorInput = document.querySelector("#author");
        const titleInput = document.querySelector("#title");
        const lengthInput = document.querySelector("#length");
        const yesInput = document.querySelector("#yes");
        const book = new Book(authorInput.value, titleInput.value, parseInt(lengthInput.value), yesInput.checked);
        addBookToLibrary(book);
        const newBookPopup = document.querySelector("#new-book-popup");
        newBookPopup.close();
        displayBooks(myLibrary);
        updateSummary();
    }
})

// When user clicks cancel button in new book form
const cancelNewBookButton = document.querySelector("#new-book-form .cancel");
cancelNewBookButton.addEventListener("click", event => {
    event.preventDefault();
    const newBookPopup = document.querySelector("#new-book-popup");
    newBookPopup.close();
})

// Validate title when user is typing
const titleInput = document.querySelector("#title");
titleInput.addEventListener("input", () => {
    validateTitle(titleInput);
});

// Validate author when user is typing
const authorInput = document.querySelector("#author");
authorInput.addEventListener("input", () => {
    validateAuthor(authorInput);
});

// Validate length when user is typing
const lengthInput = document.querySelector("#length");
lengthInput.addEventListener("input", () => {
    validateLength(lengthInput);
});

// Detect when user clicks the radio buttons
const radios = document.querySelectorAll("#yes, #no");
radios.forEach(radio => {
    radio.addEventListener("click", () => {
        validateReadStatus();
    });
});



