// products.js

// Función para cargar productos con filtros
function loadProducts(filters = {}) {
    // Construir la URL con los parámetros de filtro
    let url = 'http://localhost:3000/products/search'; // Ajustar la URL aquí
    
    // Debug para ver los filtros
    console.log('Filtros aplicados:', filters);
    
    if (Object.keys(filters).length > 0) {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                params.append(key, value);
            }
        }
        const queryString = params.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
    }
    
    // Debug para ver la URL final
    console.log('URL de búsqueda:', url);

    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(products => {
        const container = document.getElementById('productsContainer');
        container.innerHTML = '';
        
        if (products.length === 0) {
            container.innerHTML = '<p>No se encontraron productos con los filtros seleccionados</p>';
            return;
        }

        // Debug para ver los productos recibidos
        console.log('Productos recibidos:', products);

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="../assets/img/Products.png" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <p>Proveedor: ${product.supplier_name}</p> <!-- Mostrar proveedor -->
                <p>Categoría: ${product.category_name}</p> <!-- Mostrar categoría -->
                <button>Agregar al Carrito</button>
            `;
            container.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
        const container = document.getElementById('productsContainer');
        container.innerHTML = '<p>Error al cargar los productos. Por favor, intenta nuevamente.</p>';
    });
}

// Función para cargar opciones en los selectores
function loadSelectOptions(url, selectElementId) {
    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(items => {
        const selectElement = document.getElementById(selectElementId);
        if (!selectElement) {
            console.error(`Elemento select con id ${selectElementId} no encontrado`);
            return;
        }
        selectElement.innerHTML = '<option value="">Selecciona una opción</option>';
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item._id;
            option.textContent = item.name;
            selectElement.appendChild(option);
        });
    })
    .catch(error => console.error(`Error al cargar ${selectElementId}:`, error));
}

// Función para manejar los filtros
function handleFilters(event) {
    // Prevenir el comportamiento por defecto si es un evento de formulario
    if (event) {
        event.preventDefault();
    }

    // Obtener los valores de los filtros
    const nameFilter = document.getElementById('productName')?.value || '';
    const minPriceFilter = document.getElementById('minPrice')?.value || '';
    const maxPriceFilter = document.getElementById('maxPrice')?.value || '';
    const supplierFilter = document.getElementById('providerSelect')?.value || '';
    const categoryFilter = document.getElementById('categorySelect')?.value || '';
    
    // Debug para ver los valores capturados
    console.log('Valores de filtros:', {
        name: nameFilter,
        minPrice: minPriceFilter,
        maxPrice: maxPriceFilter,
        supplier: supplierFilter,
        category: categoryFilter
    });

    const filters = {};
    
    if (nameFilter.trim()) filters.name = nameFilter.trim();
    if (minPriceFilter) filters.minPrice = minPriceFilter;
    if (maxPriceFilter) filters.maxPrice = maxPriceFilter;
    if (supplierFilter) filters.supplier = supplierFilter;
    if (categoryFilter) filters.category = categoryFilter;
    
    // Cargar productos con los filtros
    loadProducts(filters);
}

// Función para mostrar/ocultar el formulario de filtros
function toggleFilter() {
    const filterForm = document.getElementById('filterForm');
    if (filterForm) {
        filterForm.style.display = filterForm.style.display === 'none' ? 'block' : 'none';
    }
}

// Inicialización cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar productos iniciales sin filtros
    loadProducts();
    
    // Cargar las opciones de los selectores
    loadSelectOptions('http://localhost:3000/suppliers', 'providerSelect');
    loadSelectOptions('http://localhost:3000/category', 'categorySelect');
    
    // Agregar event listener al botón de filtrar
    const filterButton = document.getElementById('filterButton');
    if (filterButton) {
        filterButton.addEventListener('click', handleFilters);
    }
    
    // Agregar event listeners para los filtros
    const inputs = ['productName', 'minPrice', 'maxPrice', 'providerSelect', 'categorySelect'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', handleFilters);
        }
    });
});
