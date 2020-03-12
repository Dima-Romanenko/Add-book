// book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor

function UI() {}

UI.prototype.addBookToList = function(book) {
  const row = document.createElement("tr");
  const list = document.querySelector("#book-list");

  row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="btn-close">X</button></td>
    `;

  list.appendChild(row);
};

UI.prototype.showAlert = function(msg, className) {
  var div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));

  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");

  container.insertBefore(div, form);

  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.clearFields = function() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

UI.prototype.removeBook = function(target) {
  target.parentElement.parentElement.remove();
};

// Event Listener

document.querySelector("#book-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  const ui = new UI();

  if (title == "" || author == "" || isbn == "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    const book = new Book(title, author, isbn);

    ui.addBookToList(book);

    ui.showAlert("Book added", "success");

    ui.clearFields();
  }
});

// remove

document.querySelector(".book-list").addEventListener("click", function(e) {
  if (e.target.className == "btn-close") {
    const ui = new UI();
    ui.removeBook(e.target);
    ui.showAlert("Book removed", "success");
  }
});
