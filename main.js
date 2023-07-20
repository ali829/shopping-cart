let cart = [
  {
    productTitle: "Nike Shoe",
    qty: 1,
    priceUnitary: 20,
    priceTotal: 20,
    imgSrc: "./Images/nike-shoe.jpg",
  },
  {
    productTitle: "White Nike Shoe",
    qty: 2,
    priceUnitary: 25,
    priceTotal: 50,
    imgSrc: "./Images/white-nike-shoe.jpg",
  },
];
const productsContainer = document.querySelector(".product-item-container");
const productItems = document.querySelectorAll(".product-item");

// rendering products from cart array
const renderDom = (cart) => {
  let htmlElement = "";
  cart.forEach((product, index) => {
    htmlElement += `<div class="product-item" data-index-item="${index}">
    <div class="product-image">
      <img src="${product.imgSrc}" alt="" />
    </div>
    <div class="product-detail">
      <p class="product-Title">${product.productTitle}</p>
      <p>$<span class="product-unit-price">${product.priceUnitary}</span></p>
      <p>$ <span class="product-total-price">${product.priceTotal}</span></p>
    </div>
    <div class="product-counter">
      <button class="minus-btn" onClick="decrement(this)">-</button>
      <span class="qty">${product.qty}</span>
      <button class="plus-btn" onClick="increment(this)">+</button>
    </div>
    <button class="btn-delete" onClick="deleteProduct(this)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
        />
      </svg>
    </button>
  </div>`;
  });
  productsContainer.innerHTML = htmlElement;
  console.log(cart);
};
renderDom(cart);

// incrementation  of qty function
let increment = (btn) => {
  let itemIndex = btn.closest(".product-item").dataset.indexItem;
  let qtyElem = btn.previousElementSibling;
  let calcVal = parseInt(qtyElem.textContent);
  calcVal += 1;
  cart[itemIndex].qty = calcVal;
  qtyElem.textContent = calcVal;
  updateProductTotalPrice(itemIndex, calcVal);
  cartTotalAmount();
};

// decrementation  of qty function
let decrement = (btn) => {
  let itemIndex = btn.closest(".product-item").dataset.indexItem;
  if (cart[itemIndex].qty > 0) {
    let qtyElem = btn.nextElementSibling;
    let calcVal = parseInt(qtyElem.textContent);
    calcVal -= 1;
    cart[itemIndex].qty = calcVal;
    qtyElem.textContent = calcVal;
    updateProductTotalPrice(itemIndex, calcVal);
    cartTotalAmount();
  }
};

let updateProductTotalPrice = (index, qty) => {
  cart[index].priceTotal = cart[index].priceUnitary * qty;
  document.querySelectorAll(".product-total-price")[index].textContent =
    cart[index].priceTotal;
};

let cartTotalAmount = () => {
  let totalAmount = 0;
  cart.forEach((product) => {
    totalAmount += product.priceTotal;
  });
  document.querySelector(".total-amount").textContent = totalAmount;
  return totalAmount;
};

const deleteProduct = (btn) => {
  let itemIndex = btn.closest(".product-item").dataset.indexItem;
  cart.splice(itemIndex, 1);
  renderDom(cart);
  cartTotalAmount();
};

document.querySelector(".total-amount").textContent = cartTotalAmount();
