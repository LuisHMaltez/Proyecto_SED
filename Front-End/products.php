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
                <li><a href="suppliers.php">Proveedores</a></li>
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
                
                <!-- Lista desplegable de Proveedores -->
                <select name="provider" id="providerSelect">
                    <!-- Proveedores se cargarán aquí dinámicamente -->
                </select>

                <!-- Lista desplegable de Categorías -->
                <select name="name" id="categorySelect">
                    <!-- Categorías se cargarán aquí dinámicamente -->
                </select>

                <button type="submit">Filtrar</button>
            </form>

            <div class="product-inner-list" id="productsContainer">
                <!-- Los productos se cargarán aquí dinámicamente -->
            </div>
        </section>
    </main>

    <script src="js/auth.js"></script>
    <script src="js/products.js"></script>
    <script src="js/filter.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
