var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// Function to add items to the cart
function addToCart(button) {
  const productCard = button.parentElement;
  const product = {
    id: productCard.getAttribute("data-id"),
    name: productCard.getAttribute("data-name"),
    price: parseFloat(productCard.getAttribute("data-price")),
    image: productCard.getAttribute("data-image"),
    quantity: 1,
  };

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  alert("Item added to cart!");
  renderCart();
}

// Function to render cart items on the cart page
function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  let subtotal = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    cartItemsContainer.innerHTML += `
          <tr>
              <td><button onclick="removeFromCart(${index})">Remove</button></td>
              <td><img src="${item.image}" alt="${item.name}" width="50"></td>
              <td>${item.name}</td>
              <td>${item.price}</td>
              <td><input type="number" value="${
                item.quantity
              }" min="1" onchange="updateQuantity(${index}, this.value)"></td>
              <td>${itemTotal.toFixed(2)}</td>
          </tr>
      `;
  });

  document.getElementById("subtotal-amount").textContent = `₹${subtotal.toFixed(
    2
  )}`;
  document.getElementById("total-amount").textContent = `₹${subtotal.toFixed(
    2
  )}`;
}

// Function to remove items from the cart
function removeFromCart(index) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

// Function to update item quantity in the cart
function updateQuantity(index, quantity) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems[index].quantity = parseInt(quantity);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

// Initial render of the cart
renderCart();

document.getElementById('checkout-button').addEventListener('click', function() {
  alert('Checkout process simulated. In a real application, this would proceed to payment.');
});
document.getElementById('email').addEventListener('click', function() {
  alert('Email recorded.');
});