const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.getElementById('close-modal');
const cartItemsContainer = document.getElementById('cart-items');

let username;
username = window.prompt("Enter username: ");
if (username === "rayyan") {
    let password;
    password = window.prompt("Enter password: ");
    if (password === "1234") {
        console.log("Login successful!!");
    } else {
        console.log("Incorrect password or username");
    }
} else {
    console.log("Incorrect password or username");
}

let cart = [];
const product = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Football", price: 1000, image: "images/image 1.jpg" },
                { id: 2, name: "Basketball", price: 2000, image: "images/image 2.jpg" },
                { id: 3, name: "Cap", price: 3000, image: "images/image 3.jpg" },
                { id: 4, name: "Joggers", price: 4000, image: "images/image 4.jpg" },
            ]);
        }, 1000);
    });
};

product()
    .then(products => {
        products.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            productDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Add to Cart</button>
            `;

            productList.appendChild(productDiv);
        });
    })
    .catch(err => console.error('Error fetching products:', err));

function addToCart(id, name, price) {
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartCount();
}

function updateCartCount() {
    const totalCount = cart.reduce((res, item) => res + item.quantity, 0);
    cartCount.textContent = totalCount;
}

document.getElementById('cart-button').onclick = function() {
    if (cart.length === 0) { 
        alert("Your cart is empty!");
        return;
    }
    displayCart();
    cartModal.style.display = "block";
};

closeModal.onclick = function() {
    cartModal.style.display = "none";
};

function displayCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0; 

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        const itemTotal = item.price * item.quantity; 

        itemDiv.innerHTML = `
            ${item.name} (x${item.quantity}) = $${itemTotal}
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
        `;
        
        cartItemsContainer.appendChild(itemDiv);
        total += itemTotal; 
    });
    
    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total: $${total}`; 
    cartItemsContainer.appendChild(totalDiv);
}

function changeQuantity(id, num) {
    const existingProduct = cart.find(item => item.id === id);
    
    if (existingProduct) {
        existingProduct.quantity += num;
        
        if (existingProduct.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
        
        updateCartCount();
        displayCart();
    }
}
