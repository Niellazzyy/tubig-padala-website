// =================================
// PRODUCT PRICES
// =================================

// Sample prices. You can change these anytime.
const prices = {
    mineral: 45,
    purified: 40
};

// Product names
const productNames = {
    mineral: "Mineral Water",
    purified: "Purified Water"
};

// Initial quantity of each product
let cart = {
    mineral: 0,
    purified: 0
};


// =================================
// GET HTML ELEMENTS
// =================================

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const orderMessage = document.getElementById("orderMessage");


// =================================
// ADD TO ORDER BUTTONS
// =================================

const addButtons = document.querySelectorAll(".add-button");

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Get the selected product
        const product = button.getAttribute("data-product");

        // Add one to its quantity
        cart[product]++;

        // Refresh the order summary
        updateCart();

        // Show the order summary
        document.getElementById("order").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// =================================
// UPDATE SHOPPING CART
// =================================

function updateCart() {

    // Clear the previous cart display
    cartItems.innerHTML = "";

    let total = 0;
    let hasItems = false;

    // Check every product in the cart
    for (let product in cart) {

        const quantity = cart[product];

        // Display products with a quantity greater than zero
        if (quantity > 0) {

            hasItems = true;

            const subtotal = quantity * prices[product];

            total += subtotal;

            // Create a new cart row
            const row = document.createElement("div");

            row.className = "cart-row";

            row.innerHTML = `
                <span class="cart-row-name">
                    ${productNames[product]}<br>
                    ₱${prices[product].toFixed(2)} each
                </span>

                <div class="quantity-controls">

                    <button
                        type="button"
                        data-action="minus"
                        data-product="${product}">
                        −
                    </button>

                    <span>${quantity}</span>

                    <button
                        type="button"
                        data-action="plus"
                        data-product="${product}">
                        +
                    </button>

                </div>

                <strong>₱${subtotal.toFixed(2)}</strong>
            `;

            cartItems.appendChild(row);

        }

    }

    // Show a message when the cart is empty
    if (!hasItems) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                No items added yet. Choose a product first.
            </p>
        `;

    }

    // Display the total price
    cartTotal.textContent = "₱" + total.toFixed(2);

}


// =================================
// PLUS AND MINUS BUTTONS
// =================================

cartItems.addEventListener("click", function(event) {

    // Check if a button was clicked
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const product = button.getAttribute("data-product");

    const action = button.getAttribute("data-action");

    // Increase quantity
    if (action === "plus") {

        cart[product]++;

    }

    // Decrease quantity
    else if (action === "minus" && cart[product] > 0) {

        cart[product]--;

    }

    // Update the cart after the change
    updateCart();

});


// =================================
// CUSTOMER ORDER FORM
// =================================

const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get customer information
    const name = document.getElementById("customerName").value.trim();

    const phone = document.getElementById("customerPhone").value.trim();

    const address = document.getElementById("customerAddress").value.trim();

    // Count all ordered gallons
    const totalItems = cart.mineral + cart.purified;


    // Check if the cart is empty
    if (totalItems === 0) {

        orderMessage.textContent =
            "Please add at least one water gallon before placing your order.";

        orderMessage.style.color = "#b33b3b";

        return;

    }


    // Check if customer information is complete
    if (name === "" || phone === "" || address === "") {

        orderMessage.textContent =
            "Please complete all customer details.";

        orderMessage.style.color = "#b33b3b";

        return;

    }


    // Calculate the total price
    const total =
        (cart.mineral * prices.mineral) +
        (cart.purified * prices.purified);


    // Prepare the order confirmation
    let summary = "Order received! ";

    summary += "Mineral Water: " + cart.mineral + " gallon(s). ";

    summary += "Purified Water: " + cart.purified + " gallon(s). ";

    summary += "Total: ₱" + total.toFixed(2) + ". ";

    summary += "Thank you, " + name + "!";


    // Display confirmation
    orderMessage.textContent = summary;

    orderMessage.style.color = "#147b5b";


    // Reset cart quantities
    cart.mineral = 0;

    cart.purified = 0;

    updateCart();

    // Clear the customer form
    orderForm.reset();

});


// =================================
// MOBILE NAVIGATION
// =================================

const menuToggle = document.getElementById("menuToggle");

const mainNav = document.getElementById("mainNav");


// Open and close the mobile menu
menuToggle.addEventListener("click", function() {

    const isOpen = mainNav.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);

});


// Close the menu after clicking a navigation link
const navLinks = document.querySelectorAll(".main-nav a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        mainNav.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// Display the initial empty cart
updateCart();