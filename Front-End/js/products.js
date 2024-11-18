// products.js

function loadProducts() {
    fetch('http://localhost:3000/products', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(products => {
        const container = document.getElementById('productsContainer');
        container.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="assets/img/Products.png" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <p>Proveedor: ${product.supplier_name}</p>
                <p>Categoria: ${product.category_name}</p>
                <button>Agregar al Carrito</button>
            `;
            container.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error));
}

function loadSelectOptions(url, selectElementId) {
    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(items => {
        const selectElement = document.getElementById(selectElementId);
        selectElement.innerHTML = '<option value="">Selecciona una opción</option>';
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item._id;
            option.textContent = item.name; // Ajusta según el campo de nombre en tu base de datos
            selectElement.appendChild(option);
        });
    })
    .catch(error => console.error(`Error al cargar ${selectElementId}:`, error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadSelectOptions('http://localhost:3000/suppliers', 'providerSelect');
    loadSelectOptions('http://localhost:3000/category', 'categorySelect');
});
