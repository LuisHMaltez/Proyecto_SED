<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Productos - Supermercado Seguro</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    
    <header>
        <h1>Productos</h1>
        <div class="header-inner">
            <img class="header-img" src="assets/img/product-list.png" alt="product-list"> 
            <button class="menu-button" onclick="toggleMenu()">Menú ☰</button>
        </div>
        <nav>
            <ul class="menu">
                <li><a href="profile.php">Perfil</a></li>
                <li><a href="cart.php">Carrito</a></li>
                <li><a href="index.php">Cerrar Sesión</a></li>
                <li><a href="edit-catalog.php">Editar Catálogo</a></li>
                <li><a href="edit-users.php">Editar Usuarios</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="product-list">
            <h2 class="page-title">Lista de Productos</h2>
            
            <!-- Botón de Filtro -->
            <button class="filter-button" onclick="toggleFilter()">☰ Filtro</button>
            
            <!-- Formulario de Filtro -->
            <form method="GET" action="products.php" class="filter-form" id="filterForm" style="display: none;">
                <input type="text" name="name" placeholder="Nombre del Producto">
                <input type="number" name="min_price" placeholder="Precio Mínimo">
                <input type="number" name="max_price" placeholder="Precio Máximo">
                <input type="text" name="provider" placeholder="Proveedor">
                <button type="submit">Filtrar</button>
            </form>

            <div class="product-inner-list">
                <?php
                // Obtener los filtros de la URL
                $name = isset($_GET['name']) ? $_GET['name'] : '';
                $min_price = isset($_GET['min_price']) ? $_GET['min_price'] : '';
                $max_price = isset($_GET['max_price']) ? $_GET['max_price'] : '';
                $provider = isset($_GET['provider']) ? $_GET['provider'] : '';

                // Lógica para obtener productos desde la base de datos
                // Aquí deberías usar una conexión a la base de datos real y consultas SQL
                // Estoy utilizando productos de ejemplo para ilustrar

                $products = [
                    ["name" => "Producto 1", "description" => "Descripción del producto 1", "price" => 10, "provider" => "Proveedor 1"],
                    ["name" => "Producto 2", "description" => "Descripción del producto 2", "price" => 20, "provider" => "Proveedor 2"],
                    ["name" => "Producto 3", "description" => "Descripción del producto 3", "price" => 30, "provider" => "Proveedor 3"],
                    ["name" => "Producto 4", "description" => "Descripción del producto 4", "price" => 40, "provider" => "Proveedor 4"],
                    ["name" => "Producto 5", "description" => "Descripción del producto 5", "price" => 50, "provider" => "Proveedor 5"],
                    ["name" => "Producto 6", "description" => "Descripción del producto 6", "price" => 60, "provider" => "Proveedor 1"],
                    ["name" => "Producto 7", "description" => "Descripción del producto 7", "price" => 70, "provider" => "Proveedor 2"],
                    ["name" => "Producto 8", "description" => "Descripción del producto 8", "price" => 80, "provider" => "Proveedor 3"],
                    ["name" => "Producto 9", "description" => "Descripción del producto 9", "price" => 90, "provider" => "Proveedor 4"],
                    ["name" => "Producto 10", "description" => "Descripción del producto 10", "price" => 100, "provider" => "Proveedor 5"],
                    
                ];

                // Filtrar productos según los criterios ingresados
                $filtered_products = array_filter($products, function ($product) use ($name, $min_price, $max_price, $provider) {
                    return ($name === '' || stripos($product['name'], $name) !== false) &&
                           ($min_price === '' || $product['price'] >= $min_price) &&
                           ($max_price === '' || $product['price'] <= $max_price) &&
                           ($provider === '' || stripos($product['provider'], $provider) !== false);
                });

                // Mostrar productos filtrados
                foreach ($filtered_products as $product) {
                    echo '<div class="product">';
                    echo '<img src="assets/img/Products.png" alt="' . htmlspecialchars($product['name']) . '">';
                    echo '<h3>' . htmlspecialchars($product['name']) . '</h3>';
                    echo '<p>' . htmlspecialchars($product['description']) . '</p>';
                    echo '<p>Precio: $' . htmlspecialchars($product['price']) . '</p>';
                    echo '<p>Proveedor: ' . htmlspecialchars($product['provider']) . '</p>';
                    echo '<button>Agregar al Carrito</button>';
                    echo '</div>';
                }
                ?>
            </div>
        </section>
    </main>

    <script>
        function toggleMenu() {
            const menu = document.querySelector('.menu');
            menu.classList.toggle('active');
        }

        function toggleFilter() {
            const filterForm = document.getElementById('filterForm');
            filterForm.style.display = filterForm.style.display === 'none' ? 'block' : 'none';
        }
    </script>
</body>
</html>
