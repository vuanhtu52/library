let myLibrary = [];
let bookTitleToUpdate = "";
let bookTitleToDelete = "";

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

function updateBookToLibrary() {
    // Get the new book's information
    const author = document.querySelector("#author-edit");
    const title = document.querySelector("#title-edit");
    const length = document.querySelector("#length-edit");
    const yesInput = document.querySelector("#yes-edit");
    // Update book
    myLibrary = myLibrary.map(book => {
        if (book.title === bookTitleToUpdate) {
            return new Book(author.value, title.value, length.value, yesInput.checked);
        } else {
            return book;
        }
    });
}

function deleteBookFromLibrary() {
    myLibrary = myLibrary.filter(book => book.title !== bookTitleToDelete);
}

function createFakeData() {
    for (let i = 0; i < 3; i++) {
        const book = new Book(`Author ${i}`, `Title ${i}`, 100, false);
        myLibrary.push(book);
    }
}

function setUpEditButton(bookCard) {
    // When user clicks on edit button on a bookcard
    const editButton = bookCard.querySelector(".edit");
    editButton.addEventListener("click", () => {
        const editBookPopup = document.querySelector("#edit-book-popup");
        editBookPopup.showModal();
        // Prevent scrolling when popup is open
        const body = document.querySelector("body");
        body.style.overflow = "hidden";
        // Populate form with book's information
        resetForm("edit");
        populateForm(bookCard);
        // Save the current book's title for later updates
        bookTitleToUpdate = bookCard.querySelector(".book-title").textContent;
    });
}

function setUpToggle(bookCard) {
    // When user clicks on the toggle on book card
    const toggle = bookCard.querySelector(".toggle-switch");
    toggle.addEventListener("change", () => {
        // Get the title of the current book
        const bookCard = toggle.parentNode.parentNode.parentNode.parentNode;
        const title = bookCard.querySelector(".book-title").textContent;
        // Update read status for the current book
        myLibrary = myLibrary.map(book => {
            if (book.title === title) {
                return {...book, read: toggle.checked};
            } else {
                return book;
            }
        });
        updateSummary();
    });
}

function setUpDeleteButton(bookCard) {
    // When user clicks on delete button
    const deleteButton = bookCard.querySelector(".delete");
    deleteButton.addEventListener("click", () => {
        const deleteBookPopup = document.querySelector("#delete-book-popup");
        deleteBookPopup.showModal();
        // Save the current book's title to delete later
        bookTitleToDelete = bookCard.querySelector(".book-title").textContent;
        // Show the book's title in the popup
        const titleDiv = document.querySelector("#delete-book-popup > :nth-child(2)");
        titleDiv.textContent = bookTitleToDelete;
    });
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
    // Set up edit button
    setUpEditButton(bookCard.lastElementChild);
    // Set up toggle
    setUpToggle(bookCard.lastElementChild);
    // Set up delete button
    setUpDeleteButton(bookCard.lastElementChild);

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

function resetForm(formType) {
    // Reset title
    let titleInput;
    if (formType === "add") {
        titleInput = document.querySelector("#title");
    } else if (formType === "edit") {
        titleInput = document.querySelector("#title-edit");
    }
    titleInput.className = "";
    titleInput.value = "";
    const titleInputError = document.querySelector(`#${titleInput.id} + span.error`);
    titleInputError.textContent = "";

    // Reset author
    // const authorInput = document.querySelector("#author");
    let authorInput;
    if (formType === "add") {
        authorInput = document.querySelector("#author");
    } else if (formType === "edit") {
        authorInput = document.querySelector("#author-edit");
    }
    authorInput.className = "";
    authorInput.value = "";
    const authorInputError = document.querySelector(`#${authorInput.id} + span.error`);
    authorInputError.textContent = "";

    // Reset length
    // const lengthInput = document.querySelector("#length");
    let lengthInput;
    if (formType === "add") {
        lengthInput = document.querySelector("#length");
    } else if (formType === "edit") {
        lengthInput = document.querySelector("#length-edit");
    }
    lengthInput.className = "";
    lengthInput.value = "";
    const lengthInputError = document.querySelector(`#${lengthInput.id} + span.error`);
    lengthInputError.textContent = "";

    // Reset read status question
    const yesInput = document.querySelector("#yes");
    yesInput.checked = false;
    const noInput = document.querySelector("#no");
    noInput.checked = false;
    const readStatusInputError = document.querySelector("#new-book-form > .form-field:nth-child(4) > span");
    readStatusInputError.textContent = "";
}

function validateForm(formType) {
    let validForm = true;
    // Check if title is empty
    let titleInput;
    if (formType === "add") {
        titleInput = document.querySelector("#title");
    } else if (formType === "edit") {
        titleInput = document.querySelector("#title-edit");
    }
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
    let authorInput;
    if (formType === "add") {
        authorInput = document.querySelector("#author");
    } else if (formType === "edit") {
        authorInput = document.querySelector("#author-edit");
    }
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
    let lengthInput;
    if (formType === "add") {
        lengthInput = document.querySelector("#length");
    } else if (formType === "edit") {
        lengthInput = document.querySelector("#length-edit");
    }
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
    let yesInput;
    if (formType === "add") {
        yesInput = document.querySelector("#yes");
    } else if (formType === "edit") {
        yesInput = document.querySelector("#yes-edit");
    }
    let noInput;
    if (formType === "add") {
        noInput = document.querySelector("#no");
    } else if (formType === "edit") {
        noInput = document.querySelector("#no-edit");
    }
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

function populateForm(bookCard) {
    // Get the current book's title
    const currentTitle = bookCard.querySelector(".book-title").textContent;
    // Get the corresponding book object with the title
    const currentBook = myLibrary.filter(book => book.title === currentTitle)[0];
    // Populate title
    const title = document.querySelector("#title-edit");
    title.value = currentBook.title;
    // Populate author
    const author = document.querySelector("#author-edit");
    author.value = currentBook.author;
    // Populate length
    const length = document.querySelector("#length-edit");
    length.value = currentBook.numPage.toString();
    // Select read status
    const yesInput = document.querySelector("#yes-edit");
    const noInput = document.querySelector("#no-edit");
    if (currentBook.read) {
        yesInput.checked = true;
    } else {
        noInput.checked = true;
    }
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
    // Reset the fields and error messages
    resetForm("add");
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
    let isValidForm = validateForm("add");
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
const titleInputs = document.querySelectorAll("#title, #title-edit");
titleInputs.forEach(titleInput => {
    titleInput.addEventListener("input", () => {
        validateTitle(titleInput);
    });
});

// Validate author when user is typing
const authorInputs = document.querySelectorAll("#author, #author-edit");
authorInputs.forEach(authorInput => {
    authorInput.addEventListener("input", () => {
        validateAuthor(authorInput);
    });
});

// Validate length when user is typing
const lengthInputs = document.querySelectorAll("#length, #length-edit");
lengthInputs.forEach(lengthInput => {
    lengthInput.addEventListener("input", () => {
        validateLength(lengthInput);
    });
});

// Detect when user clicks the radio buttons
const radios = document.querySelectorAll("#yes, #no");
radios.forEach(radio => {
    radio.addEventListener("click", () => {
        validateReadStatus();
    });
});

// When user clicks update button in edit book form
const updateButton = document.querySelector("#edit-book-form .update");
updateButton.addEventListener("click", event => {
    event.preventDefault();
    let isValidForm = validateForm("edit");
    if (isValidForm) {
        // Update book
        updateBookToLibrary();
        const editBookPopup = document.querySelector("#edit-book-popup");
        editBookPopup.close();
        displayBooks(myLibrary);
        updateSummary();
    }
})

// When user clicks cancel button in edit book form
const cancelUpdateButton = document.querySelector("#edit-book-form .cancel");
cancelUpdateButton.addEventListener("click", event => {
    event.preventDefault();
    const editBookPopup = document.querySelector("#edit-book-popup");
    editBookPopup.close();
})

// When user clicks delete button in delete popup
const deleteButton = document.querySelector("#delete-book-popup .delete");
deleteButton.addEventListener("click", () => {
    deleteBookFromLibrary();
    const deleteBookPopup = document.querySelector("#delete-book-popup");
    deleteBookPopup.close();
    displayBooks(myLibrary);
    updateSummary();
});

// When user clicks cancel button in delete popup
const cancelDeleteButton = document.querySelector("#delete-book-popup .cancel");
cancelDeleteButton.addEventListener("click", () => {
    const deleteBookPopup = document.querySelector("#delete-book-popup");
    deleteBookPopup.close();
});




