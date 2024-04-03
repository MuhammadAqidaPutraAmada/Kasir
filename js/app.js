document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("productForm");
  const inputName = document.getElementById("productName");
  const inputPrice = document.getElementById("productPrice");
  const inputCategory = document.getElementById("productCategory");
  const inputDescription = document.getElementById("productDesc");
  const inputCount = document.getElementById("productCount");
  const inputSearch = document.getElementById("productSearch");
  const addButton = document.getElementById("addButton");
  const deleteAllButton = document.getElementById("deleteAll");
  const tableBody = document.getElementById("productTableBody");
  const totalElement = document.getElementById("total");

  let productsList = JSON.parse(localStorage.getItem("products")) || [];

  function updateLocalStorage() {
    localStorage.setItem("products", JSON.stringify(productsList));
  }

  function drawProducts() {
    tableBody.innerHTML = "";
    let total = 0;
    productsList.forEach((product, index) => {
      total += product.price * product.count;
      const row = `<tr>
                    <td>${index + 1}</td>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.price * product.count}</td>
                    <td>${product.category}</td>
                    <td>${product.description}</td>
                    <td class="d-flex justify-content-between align-items-center gap-3">
                      <button class="btn btn-dark increment" data-index="${index}">+</button>
                      ${product.count}
                      <button class="btn btn-info decrement" data-index="${index}">-</button>
                    </td>
                    <td>
                      <button class="btn btn-danger delete" data-index="${index}">Delete</button>
                    </td>
                    <td>
                      <button class="btn btn-warning update" data-index="${index}">Update</button>
                    </td>
                  </tr>`;
      tableBody.innerHTML += row;
    });
    totalElement.textContent = total;
  }

  function addProduct(event) {
    event.preventDefault();
    const name = inputName.value.trim();
    const price = parseFloat(inputPrice.value);
    const category = inputCategory.value.trim();
    const description = inputDescription.value.trim();
    const count = parseInt(inputCount.value);

    if (!name || isNaN(price) || !category || !description || isNaN(count)) {
      alert("Semua data harus diisi!");
      return;
    }

    const product = {
      id: Date.now(),
      name,
      price,
      category,
      description,
      count
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
    updateLocalStorage();
    drawProducts();
  }

  function decrementCount(index) {
    if (productsList[index].count > 0) {
      productsList[index].count--;
      updateLocalStorage();
      drawProducts();
    }
  }

  function init() {
    drawProducts();
    form.addEventListener("submit", addProduct);
    deleteAllButton.addEventListener("click", deleteAllProducts);
    tableBody.addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("delete")) {
        const index = parseInt(target.dataset.index);
        deleteProduct(index);
      } else if (target.classList.contains("increment")) {
        const index = parseInt(target.dataset.index);
        incrementCount(index);
      } else if (target.classList.contains("decrement")) {
        const index = parseInt(target.dataset.index);
        decrementCount(index);
      }
    });
  }

  init();
});
