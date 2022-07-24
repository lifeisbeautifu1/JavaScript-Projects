class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Storage.getBooks();
    books.forEach((book, index) => {
      if (book.isbn == isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

class UI {
  static addBook(book) {
    const table = document.querySelector(".table");
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><span class="btn danger delete">X</span></td>
        `;
    table.appendChild(tr);
  }

  static removeBook(el) {
    if (el.className.indexOf("delete") != -1) {
      el.parentNode.parentNode.remove();
    }
  }

  static clearFields() {
    document.querySelector(".title").value = "";
    document.querySelector(".author").value = "";
    document.querySelector(".isbn").value = "";
  }

  static displayAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.querySelector(".form");

    container.insertBefore(div, form);

    setTimeout(function () {
      div.remove();
    }, 3000);
  }

  static loadTable() {
    const books = Storage.getBooks();

    books.forEach(function (book) {
      UI.addBook(book);
    });
  }
}

document.querySelector(".btn-submit").addEventListener("click", function (e) {
  e.preventDefault();

  const title = document.querySelector(".title").value;
  const author = document.querySelector(".author").value;
  const isbn = document.querySelector(".isbn").value;

  if (title != "" && author != "" && isbn != "") {
    const book = new Book(title, author, isbn);

    UI.addBook(book);

    Storage.addBook(book);

    UI.clearFields();

    UI.displayAlert("Book added!", "success");
  } else {
    UI.displayAlert("Please fill out the forms", "danger");
  }
});

document.querySelector(".table").addEventListener("click", function (e) {
  isbn = e.target.parentElement.previousElementSibling.textContent;

  Storage.removeBook(isbn);

  UI.removeBook(e.target);

  UI.displayAlert("Book removed!", "success");
});

document.addEventListener("DOMContentLoaded", UI.loadTable());
