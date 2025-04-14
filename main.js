let listBooks = [
  {name: "HarryPoter", author: "JK Rowling", publication: 1995, category: "Fiction"},
  {name: "The Hobbit", author: "J.R.R. Tolkien", publication: 1937, category: "Fantasy"},
  {name: "To Kill a Mockingbird", author: "Harper Lee", publication: 1960, category: "Classic"},
  {name: "1984", author: "George Orwell", publication: 1949, category: "Dystopian"},
  {name: "The Great Gatsby", author: "F. Scott Fitzgerald", publication: 1925, category: "Classic"},
  {name: "The Catcher in the Rye", author: "J.D. Salinger", publication: 1951, category: "Classic"},
  {name: "Moby Dick", author: "Herman Melville", publication: 1851, category: "Adventure"},
  {name: "Pride and Prejudice", author: "Jane Austen", publication: 1813, category: "Romance"},
  {name: "The Alchemist", author: "Paulo Coelho", publication: 1988, category: "Philosophy"},
  {name: "The Da Vinci Code", author: "Dan Brown", publication: 2003, category: "Thriller"},
];

let tableEl = document.querySelector("tbody");

function renderBooks(books = listBooks) {
  tableEl.innerHTML = "";
  books.forEach((book, index) => {
    tableEl.innerHTML += `
        <tr>
          <th>${book.name}</th>
          <th>${book.author}</th>
          <th>${book.publication}</th>
          <th>${book.category}</th>
          <th>
            <button class="btn btn-primary" onclick="editBook(${index})">Sửa</button>
            <button class="btn btn-primary" onclick="deleteBook(${index})">Xóa</button>
          </th>
        </tr>
      `;
  });
}

renderBooks();

// Hàm kiểm tra năm hợp lệ
function isValidYear(year) {
  switch (typeof year) {
    case "number":
      return Number.isInteger(year) ? (year >= 1000 && year <= 9999 ? true : false) : false;
    default:
      return false;
  }
}

// Hàm thêm hoặc cập nhật sách
function addBook(e) {
  e.preventDefault();

  const form = e.target;
  let name = form.name.value;
  let author = form.author.value;
  let publication = form.publication.value;
  let category = form.category.value;

  document.getElementById("errorName").innerText = "";
  document.getElementById("errorAuthor").innerText = "";
  document.getElementById("errorPublication").innerText = "";
  document.getElementById("errorCategory").innerText = "";

  let hasError = false;
  if (!name || name.trim() === "") {
    document.getElementById("errorName").innerText = "Tên sách không được để trống";
    hasError = true;
  }
  if (!author || author.trim() === "") {
    document.getElementById("errorAuthor").innerText = "Tác giả không được để trống";
    hasError = true;
  }
  if (!category || category.trim() === "") {
    document.getElementById("errorCategory").innerText = "Thể loại không được để trống";
    hasError = true;
  }
  if (!isValidYear(publication)) {
    document.getElementById("errorPublication").innerText = "Năm không hợp lệ (1000 - 9999)";
    hasError = true;
  }
  if (hasError) return;

  let newBook = {
    name: name.trim(),
    author: author.trim(),
    publication: Number(publication),
    category: category.trim(),
  };

  if (editingIndex !== null) {
    listBooks[editingIndex] = newBook;
    alert("Đã cập nhật sách!");
    editingIndex = null;
  } else {
    listBooks.push(newBook);
    alert("Đã thêm sách mới!");
  }

  form.reset();
  renderBooks();
}

let editingIndex = null;

// Hàm sửa sách
function editBook(index) {
  const book = listBooks[index];
  let bookForm = document.getElementById("bookForm");

  bookForm.elements["name"].value = book.name;
  bookForm.elements["author"].value = book.author;
  bookForm.elements["publication"].value = book.publication;
  bookForm.elements["category"].value = book.category;

  editingIndex = index;
}

// Hàm xóa sách
function deleteBook(index) {
  if (confirm("Bạn có chắc muốn xóa sách này không?")) {
    listBooks.splice(index, 1);
    renderBooks();
  }
}

// Hàm lọc sách theo tên
function filterBooks(keyword) {
  const filtered = listBooks.filter((book) => book.name.toLowerCase().includes(keyword.toLowerCase()));
  renderBooks(filtered);
}

document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value;
  filterBooks(keyword);
});
