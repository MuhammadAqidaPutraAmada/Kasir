document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const addButton = document.getElementById("addButton");
  const deleteAllButton = document.getElementById("deleteAll");
  const tableBody = document.getElementById("tBody");
  const totalElement = document.getElementById("total");

  let productsList = [];

  function updateLocalStorage() {
    localStorage.setItem("products", JSON.stringify(productsList));
  }

  function drawProducts() {
    tableBody.innerHTML = "";
    productsList.forEach((product, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.total}</td>
          <td>${product.category}</td>
          <td>${product.description}</td>
          <td>
            <button class="btn btn-dark increment" data-index="${index}">+</button>
            ${product.count}
            <button class="btn btn-info decrement" data-index="${index}">-</button>
          </td>
          <td><button class="btn btn-danger delete" data-index="${index}">Delete</button></td>
          <td><button class="btn btn-warning update" data-index="${index}">Update</button></td>
        </tr>`;
      tableBody.innerHTML += row;
    });

    getProductsTotal();
  }

  function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const price = +document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;
    const description = document.getElementById("productDesc").value;
    const count = +document.getElementById("productCount").value;

    if (!name || !price || !category || !description || !count) {
      alert("All fields are required!");
      return;
    }

    const product = {
      id: Date.now(),
      name,
      price,
      category,
      description,
      count,
      total: price * count,
    };

    productsList.push(product);
    updateLocalStorage();
    drawProducts();
    form.reset();
  }

  function deleteProduct(index) {
    productsList.splice(index, 1);
    updateLocalStorage();
    drawProducts();
  }

  function deleteAllProducts() {
    productsList = [];
    updateLocalStorage();
    drawProducts();
  }

  function incrementCount(index) {
    productsList[index].count++;
    productsList[index].total = productsList[index].price * productsList[index].count;
    updateLocalStorage();
    drawProducts();
  }

  function decrementCount(index) {
    if (productsList[index].count > 0) {
      productsList[index].count--;
      productsList[index].total = productsList[index].price * productsList[index].count;
      updateLocalStorage();
      drawProducts();
    }
  }

  function getProductsTotal() {
    const total = productsList.reduce((acc, product) => acc + product.total, 0);
    totalElement.textContent = `${total} $`;
  }

  function init() {
    const productsFromLocalStorage = JSON.parse(localStorage.getItem("products"));
    if (productsFromLocalStorage) {
      productsList = productsFromLocalStorage;
      drawProducts();
    }
  }

  form.addEventListener("submit", addProduct);
  deleteAllButton.addEventListener("click", deleteAllProducts);
  tableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
      deleteProduct(event.target.dataset.index);
    } else if (event.target.classList.contains("increment")) {
      incrementCount(event.target.dataset.index);
    } else if (event.target.classList.contains("decrement")) {
      decrementCount(event.target.dataset.index);
    } else if (event.target.classList.contains("update")) {
      // You can add update functionality here if needed
    }
  });

  init();
});
