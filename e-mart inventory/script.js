// Predefined home page products
let sales = JSON.parse(localStorage.getItem('sales')) || [];
let inventoryProducts = JSON.parse(localStorage.getItem('inventoryProducts')) || [];

// Predefined home products with images
let homeProducts = [
    { id: 1, name: 'Fruits & Vegetables', stock: 'Available', image: 'images/veg.jpg' },
    { id: 2, name: 'Food Staples', stock: 'Available', image: 'images/pulse.jpg' },
    { id: 3, name: 'Dairy', stock: 'Available', image: 'images/dairy.jpg' },
    { id: 4, name: 'Spices', stock: 'Available', image: 'images/spicy.jpg' },
    { id: 5, name: 'Baby Product', stock: 'Available', image: 'images/baby.jpg' },
    { id: 6, name: 'Beverages', stock: 'Available', image: 'images/beva.jpg' },
    { id: 7, name: 'Snacks Items', stock: 'Available', image: 'images/snacks.jpg' },
    { id: 8, name: 'Household Items', stock: 'Available', image: 'images/home.jpg' },
    { id: 9, name: 'Cooking Oil', stock: 'Available', image: 'images/cook.jpg' },
    { id: 10, name: 'personal care', stock: 'Available', image: 'images/personal.png' },
    { id: 11, name: 'Pet Food', stock: 'Available', image: 'images/petfood.png' },
    { id: 11, name: 'Baking Supplies', stock: 'Available', image: 'images/bake.png' }
    
  
  
];

// Function to load products on the home page
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    homeProducts.forEach(product => {
        productsGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Stock: ${product.stock}</p>
            </div>
        `;
    });
}
// Function to load products on the home page
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    homeProducts.forEach(product => {
        productsGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Stock: ${product.stock}</p>
            </div>
        `;
    });
}

// Load User Profile Information
function loadProfile() {
    const currentUser = JSON.parse(localStorage.getItem('users')).find(user => user.username === JSON.parse(localStorage.getItem('currentUser')).username);
    if (currentUser) {
        document.getElementById('profileUsername').innerText = currentUser.username;
        document.getElementById('profileEmail').innerText = "Email: " + currentUser.email;
        document.getElementById('profileAge').innerText = "Age: " + currentUser.age;
        document.getElementById('profileImage').src = currentUser.profileImage || 'images/default-profile.png';
    } else {
        alert('No user logged in!');
        window.location.href = 'login.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = 'login.html';
}

// Call the loadProfile function when the profile page loads
if (document.querySelector('.profile-section')) {
    loadProfile();
}

// Function to save user information during signup
// Function to save user information during signup
function saveUserInfo() {
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const age = document.getElementById("signupAge").value;
    const profileImage = document.getElementById("signupProfileImage").files[0]; // Get the uploaded image

    const reader = new FileReader();
    reader.onload = function(e) {
        const userInfo = {
            username: username,
            email: email,
            age: age,
            profileImage: e.target.result // Store the image data
        };

        // Save user information in localStorage
        localStorage.setItem('currentUser', JSON.stringify(userInfo));

        // Redirect to profile page after signup
        window.location.href = 'profile.html'; 
    };
    reader.readAsDataURL(profileImage); // Read the image as a data URL
}

// Load User Profile Information
function loadProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        document.getElementById('profileUsername').innerText = currentUser.username;
        document.getElementById('profileEmail').innerText = "Email: " + currentUser.email;
        document.getElementById('profileAge').innerText = "Age: " + currentUser.age; // Load Age
        document.getElementById('profileImage').src = currentUser.profileImage || 'images/me.jpg'; // Default image if none is uploaded
    } else {
        alert('No user logged in!');
        window.location.href = 'login.html';
    }
}

// Function to make a sale
function makeSale() {
    const saleProductName = document.getElementById("saleProductName").value;
    const saleQuantity = parseInt(document.getElementById("saleQuantity").value);
    const saleMessage = document.getElementById("saleMessage");

    // Find the product in the inventory
    const product = inventoryProducts.find(product => product.name === saleProductName);
    
    if (product) {
        if (saleQuantity > 0 && saleQuantity <= product.stock) {
            // Update stock
            product.stock -= saleQuantity;

            // Log the sale
            sales.push({ productName: saleProductName, quantity: saleQuantity, date: new Date() });
            localStorage.setItem('sales', JSON.stringify(sales));
            localStorage.setItem('inventoryProducts', JSON.stringify(inventoryProducts));

            // Display success message
            saleMessage.innerText = "Sale successful!";
            saleMessage.style.color = "green";  // Green success message
        } else {
            saleMessage.innerText = "Invalid quantity or insufficient stock.";
            saleMessage.style.color = "red";  // Red error message
        }
    } else {
        saleMessage.innerText = "Product not found.";
        saleMessage.style.color = "red";  // Red error message
    }
}

// Add or Update Product
function addOrUpdateProduct() {
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productStock = document.getElementById("productStock").value;
    const editId = document.getElementById("editId").value;
    const productMessage = document.getElementById("productMessage");

    if (editId) {
        // Update existing product
        const productIndex = inventoryProducts.findIndex(product => product.id == editId);
        if (productIndex !== -1) {
            inventoryProducts[productIndex] = { id: editId, name: productName, price: productPrice, stock: productStock, image: inventoryProducts[productIndex].image };
            productMessage.innerText = "Product updated successfully!";
        }
    } else {
        // Add new product
        const newProduct = {
            id: inventoryProducts.length + 1,
            name: productName,
            price: productPrice,
            stock: productStock,
             // Set a default image or allow image upload
        };
        inventoryProducts.push(newProduct);
        productMessage.innerText = "Product added successfully!";
        productMessage.style.color = "green";  // Green success messages
    }

    // Save updated inventory to localStorage
    localStorage.setItem('inventoryProducts', JSON.stringify(inventoryProducts));

    // Reload inventory display
    displayProducts();

    // Clear form fields after saving
    clearForm();
}

// Display Products in the Inventory Page
function displayProducts() {
    const productTable = document.getElementById("productTable");
    productTable.innerHTML = "";

    inventoryProducts.forEach(product => {
        productTable.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
       
                <td>
                    <button onclick="editProduct(${product.id})">Edit</button>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Edit Product
function editProduct(id) {
    const product = inventoryProducts.find(product => product.id == id);
    if (product) {
        document.getElementById("editId").value = product.id;
        document.getElementById("productName").value = product.name;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productStock").value = product.stock;
    }
}

// Delete Product
function deleteProduct(id) {
    inventoryProducts = inventoryProducts.filter(product => product.id !== id);
    localStorage.setItem('inventoryProducts', JSON.stringify(inventoryProducts));
    displayProducts();
}

// Clear form fields after saving
function clearForm() {
    document.getElementById("editId").value = '';
    document.getElementById("productName").value = '';
    document.getElementById("productPrice").value = '';
    document.getElementById("productStock").value = '';
}

// Call the loadProducts function when the home page loads
if (document.getElementById('productsGrid')) {
    loadProducts();
}

// Call displayProducts function if on inventory page
if (document.getElementById("productTable")) {
    displayProducts();
}
//Function to generate stock report
function generateReport() {
    const report = document.getElementById("report");
    const inventoryProducts = JSON.parse(localStorage.getItem('inventoryProducts')) || [];
    const sales = JSON.parse(localStorage.getItem('sales')) || [];

    if (inventoryProducts.length === 0) {
        report.innerText = "No products found in inventory.";
        return;
    }

    let reportContent = "Stock Report:\n";
    inventoryProducts.forEach(product => {
        reportContent += `${product.name}: ${product.stock} in stock\n`;
    });

    reportContent += "\nSales Report:\n";
    if (sales.length === 0) {
        reportContent += "No sales records available.";
    } else {
        sales.forEach(sale => {
            const saleDate = new Date(sale.date);
            reportContent += `Sold ${sale.quantity} of ${sale.productName} on ${saleDate.toLocaleDateString()} at ${saleDate.toLocaleTimeString()}\n`;
        });
    }

    report.innerText = reportContent;
}

// Initial call to load products
loadProducts();