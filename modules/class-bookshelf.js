import isStorageAvailable from './local-storage-checker.js';

// Book shelf class
export default class Bookshelf {
  constructor(books) {
    this.books = books;
  }

  addBook(title, author) {
    const book = {
      id: Math.floor(Math.random() * 1000000),
      title: title.value,
      author: author.value,
    };

    this.books.push(book);

    if (isStorageAvailable('localStorage')) {
      localStorage.setItem('bookList', JSON.stringify(this.books));
    }
  }

  remove(id, containerElement) {
    this.books = this.books.filter((book) => book.id !== parseInt(id, 10));
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.updateBookList(containerElement);
  }

  updateBookList(targetElement) {
    targetElement.innerHTML = '';

    this.books.forEach((el) => {
      targetElement.innerHTML += `<div>
      <p>"<span class="title">${el.title}</span>" by <span class="author">${el.author}</span></p>
      <button onclick="removeBook('${el.id}')" class="remove">Remove</button>
      </div>`;
    });
  }
}
