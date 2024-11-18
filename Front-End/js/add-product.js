// add-product.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.php'; // Redirigir al inicio de sesión si no hay token
    }

    document.getElementById('addProductForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Producto añadido:', result);
            window.location.href = 'edit-catalog.php'; // Redirige de vuelta al catálogo
        })
        .catch(error => console.error('Error al añadir el producto:', error));
    });
});

function cancelAdd() {
    window.location.href = 'edit-catalog.php'; // Redirige de vuelta al catálogo
}
