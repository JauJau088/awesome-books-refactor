//=== 0. Imports
import isStorageAvailable from "./modules/local-storage-checker.js";
import Bookshelf from "./modules/class-bookshelf.js";

//=== 1. Book add and remove
const title = document.querySelector('#book-title');
const author = document.querySelector('#book-author');
const form = document.querySelector('#form-add-book');
const bookList = document.querySelector('.book-list');

// Create a variable to contain local data
let books = [];
// If there's local data available,
if (isStorageAvailable('localStorage')) {
  const data = JSON.parse(localStorage.getItem('bookList'));
  // and if it's not empty, update it
  if (data) {
    books = JSON.parse(localStorage.getItem('bookList'));
  }
}

// Instantiate the class
const newbook = new Bookshelf(books);
// On submit
form.onsubmit = () => {
  // Add the book
  newbook.addBook(title, author);
  // Update the html
  newbook.updateBookList(bookList);
  // Reset form
  form.reset();
};
// Remove
const removeBook = (id) => {
  newbook.remove(id, bookList);
};
// It has to be a global variable so that it's accessible from the html
window.removeBook = removeBook;
// Don't forget to update book list on page load as well
newbook.updateBookList(bookList);

//=== 2. Single page navigation
const allBooks = document.querySelector('.all-books');
const addBook = document.querySelector('.add-book');
const contact = document.querySelector('.contact');
const navList = document.querySelector('#list');
const navAdd = document.querySelector('#add');
const navContact = document.querySelector('#contact');

navList.onclick = () => {
  navList.style.color = 'darkblue';
  navAdd.style.removeProperty('color');
  navContact.style.removeProperty('color');
  allBooks.classList.remove('hide');
  addBook.classList.add('hide');
  contact.classList.add('hide');
};

navAdd.onclick = () => {
  navAdd.style.color = 'darkblue';
  navList.style.removeProperty('color');
  navContact.style.removeProperty('color');
  addBook.classList.remove('hide');
  allBooks.classList.add('hide');
  contact.classList.add('hide');
};

navContact.onclick = () => {
  navContact.style.color = 'darkblue';
  navList.style.removeProperty('color');
  navAdd.style.removeProperty('color');
  contact.classList.remove('hide');
  addBook.classList.add('hide');
  allBooks.classList.add('hide');
};

// Date time with Luxon
const dateLuxon = document.querySelector('#date-luxon');

dateLuxon.textContent = DateTime.now();