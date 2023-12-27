// Read JSON-file

window.onload = init;
let productList = [];

async function init() {
    productList = await loadProducts();

    // Check if the ID #product-list exists
    if (document.querySelector('#product-list')) {
        listProducts(productList);
    }

    // Read the URL parameter
    const urlParams = new URLSearchParams(window.location.search);

    // Get the product id from the URL parameter
    const productId = urlParams.get('id');

    if (productId) {
        showProduct(productId);
    }
}

// Load products
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// List products
function listProducts(productList) {
    // Get the element #product-list
    const productListElement = document.querySelector('#product-list ul');

    // Loop through the products
    productList.forEach(product => {
        // Create a new list item element
        const li = document.createElement('li');

        // Set array index as id attribute
        product.id = productList.indexOf(product);

        // Set the innerHTML of the list item element
        li.innerHTML = `<a class='button' href="product.html?id=${product.id}">${product.title}</a>`;

        // Add the list item element to the #product-list element
        productListElement.appendChild(li);
    });
}

// Show product
function showProduct(productId) {
    let product = null;

    if (productId > 0 && productId < productList.length) {
        product = productList[parseInt(productId)];
    } else {
        // Default values
        product = {
            title: 'Product not found',
            image: 'https://via.placeholder.com/300x200?text=Product+not+found',
            description: 'Product not found',
            price: '0'
        }
    }
    // Get the element #product
    const productElement = document.querySelector('#product-info');

    // Set the innerHTML of the #product element
    productElement.innerHTML = `<h1>${product.title}</h1>
                                <img src="${product.image}">
                                <p>${product.description}</p>
                                <p>Pris: ${product.price}:-</p>`;
}