const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const library = document.getElementById('library');
  library.textContent = '';
  
  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    
    const bookInfo = document.createElement('p');
    bookInfo.textContent = `"${book.title}" by ${book.author}, ${book.pages} pages, ${book.read ? 'read' : 'not read yet'}`;
    bookDiv.appendChild(bookInfo);
    
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Reading Status';
    toggleButton.addEventListener('click', () => {
      book.toggleRead();
      displayBooks();
    });
    bookDiv.appendChild(toggleButton);
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Book';
    removeButton.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });
    bookDiv.appendChild(removeButton);
    
    library.appendChild(bookDiv);
  });
}

document.getElementById('newBookBtn').addEventListener('click', () => {
  const form = document.getElementById('bookForm');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('addBookForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  
  addBookToLibrary(title, author, pages, read);
  
  document.getElementById('addBookForm').reset();
  document.getElementById('bookForm').style.display = 'none';
});


//addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
//addBookToLibrary('1984', 'George Orwell', 328, false);
