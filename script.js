function select(elem) {
    return document.querySelector(elem);
}

const productInput = select('.product-input');
const priceInput = select('.price-input');
const button = select('.submit-btn');
const clearBtn = select('.reset-btn');
const totalAmount = select(".total-amount");
const productContainer = select(".product-container");

let total = 0;

// Function to load data from local storage when the page loads
const loadFromLocalStorage = () => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    total = Number(localStorage.getItem('total')) || 0;

    storedProducts.forEach(product => {
        let div = document.createElement("div");
        div.classList.add("mydiv");

        let p1 = document.createElement("p");
        let p2 = document.createElement("p");

        p1.textContent = product.name;
        p2.textContent = `₹ ${product.price}`;

        div.appendChild(p1);
        div.appendChild(p2);
        productContainer.appendChild(div);
    });

    totalAmount.textContent = `₹ ${total}`;
};

const showDetails = (e) => {
    e.preventDefault();

    if (!priceInput.value || !productInput.value) {
        alert('Please enter data');
        return;
    }

    let div = document.createElement("div");
    div.classList.add("mydiv");

    let p1 = document.createElement("p");
    let p2 = document.createElement("p");

    p1.textContent = `${productInput.value}`;
    p2.textContent = `₹ ${priceInput.value}`;
    div.appendChild(p1);
    div.appendChild(p2);
    productContainer.appendChild(div);

    // Update total
    total += Number(priceInput.value);
    totalAmount.textContent = `₹ ${total}`;

    // Save the data to local storage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    storedProducts.push({
        name: productInput.value,
        price: Number(priceInput.value)
    });
    localStorage.setItem('products', JSON.stringify(storedProducts));
    localStorage.setItem('total', total);

    // Reset the input fields
    productInput.value = '';
    priceInput.value = '';
};

const clearData = () => {
    productContainer.innerHTML = '';
    total = 0;
    totalAmount.textContent = `₹ ${total}`;

    // Clear the data from local storage
    localStorage.removeItem('products');
    localStorage.removeItem('total');
};

// Event listeners
button.addEventListener("click", showDetails);
clearBtn.addEventListener("click", clearData);

// Load data from local storage when the page loads
window.onload = loadFromLocalStorage;
