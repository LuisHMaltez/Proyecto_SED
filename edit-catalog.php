<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Catálogo - Supermercado Seguro</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Editar Catálogo</h1>
        <img class="header-img" src="assets/img/edit-catalog.png" alt="edit-catalog">
        <button class="menu-button" onclick="toggleMenu()">☰ Menú</button>
        <nav>
            <ul class="menu">
                <li><a href="products.php">Productos</a></li>
                <li><a href="profile.php">Perfil</a></li>
                <li><a href="cart.php">Carrito</a></li>
                <li><a href="index.php">Cerrar Sesión</a></li>
                <li><a href="edit-users.php">Editar Usuarios</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="edit-catalog">
            <h2 class="page-title" id="page-title-special">Editar Catálogo de Productos</h2>
        <div class="product-inner-list" id="p-i-l-ec">
            <div class="product">
                <img src="assets/img/Products.png" alt="Producto 1">
                <h3>Producto 1</h3>
                <p>Descripción del producto 1.</p>
                <p>Precio: $10.00</p>
                <p>Stock: 20</p>
                <button onclick="window.location.href='edit-product.php'">Editar</button>
            </div>
            <div class="product">
                <img src="assets/img/Products.png" alt="Producto 2">
                <h3>Producto 2</h3>
                <p>Descripción del producto 2.</p>
                <p>Precio: $20.00</p>
                <p>Stock: 15</p>
                <button onclick="window.location.href='edit-product.php'">Editar</button>
            </div>
            <div class="product">
                <img src="assets/img/Products.png" alt="Producto 3">
                <h3>Producto 3</h3>
                <p>Descripción del producto 3.</p>
                <p>Precio: $20.00</p>
                <p>Stock: 15</p>
                <button onclick="window.location.href='edit-product.php'">Editar</button>
            </div>
            <div class="product">
                <img src="assets/img/Products.png" alt="Producto 4">
                <h3>Producto 4</h3>
                <p>Descripción del producto 4.</p>
                <p>Precio: $20.00</p>
                <p>Stock: 15</p>
                <button onclick="window.location.href='edit-product.php'">Editar</button>
            </div>
            <div class="product">
                <img src="assets/img/Products.png" alt="Producto 5">
                <h3>Producto 5</h3>
                <p>Descripción del producto 5.</p>
                <p>Precio: $20.00</p>
                <p>Stock: 15</p>
                <button onclick="window.location.href='edit-product.php'">Editar</button>
            </div>
            <div class="product">
                <img src="assets/img/Products.png" alt="Producto 6">
                <h3>Producto 6</h3>
                <p>Descripción del producto 6.</p>
                <p>Precio: $20.00</p>
                <p>Stock: 15</p>
                <button onclick="window.location.href='edit-product.php'">Editar</button>
            </div>
            <div class="product">
                <img src="assets/img/Products.png" alt="Producto 7">
                <h3>Producto 7</h3>
                <p>Descripción del producto 7.</p>
                <p>Precio: $20.00</p>
                <p>Stock: 15</p>
                <button onclick="window.location.href='edit-product.php'">Editar</button>
            </div>
        
            <button id="add-product-btn" onclick="window.location.href='add-product.php'">Agregar Producto</button>
        </div>
        </section>
    </main>

    <script>
        function toggleMenu() {
            const menu = document.querySelector('.menu');
            menu.classList.toggle('active');
        }
    </script>
</body>
</html>
