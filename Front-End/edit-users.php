<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuarios - Supermercado Seguro</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Editar Usuarios</h1>
        <div class="header-inner">
            <img class="header-img" src="assets/img/edit-users.png" alt="product-list"> 
            <button class="menu-button" onclick="toggleMenu()">Menú ☰</button>
        </div>
        <nav>
            <ul class="menu">
                <li><a href="products.php">Productos</a></li>
                <li><a href="profile.php">Perfil</a></li>
                <li><a href="cart.php">Carrito</a></li>
                <li><a href="index.php">Cerrar Sesión</a></li>
                <li><a href="edit-catalog.php">Editar Catálogo</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="edit-users">
            <h2 class="page-title">Editar Usuarios</h2>
        <div class="product-inner-list">
            <div class="user">
                <img src="assets/img/profile.png" alt="Usuario 1">
                <h3>Usuario 1</h3>
                <p>Nombre de Usuario: Usuario1</p>
                <p>Correo Electrónico: Us1@example.com</p>
                <p>Teléfono: 1234567890</p>
                <p>Rol: Administrador</p>
                <button onclick="window.location.href='edit-user.php'">Editar</button>
            </div>
            <div class="user">
                <img src="assets/img/profile.png" alt="Usuario 2">
                <h3>Usuario 2</h3>
                <p>Nombre de Usuario: Usuario2</p>
                <p>Correo Electrónico: Us2@example.com</p>
                <p>Teléfono: 0123456789</p>
                <p>Rol: Super Administrador</p>
                <button onclick="window.location.href='edit-user.php'">Editar</button>
            </div>
            <div class="user">
                <img src="assets/img/profile.png" alt="Usuario 3">
                <h3>Usuario 3</h3>
                <p>Nombre de Usuario: Usuario3</p>
                <p>Correo Electrónico: Us3@example.com</p>
                <p>Teléfono: 9012345678</p>
                <p>Rol: Usuario</p>
                <button onclick="window.location.href='edit-user.php'">Editar</button>
            </div>
            <div class="user">
                <img src="assets/img/profile.png" alt="Usuario 4">
                <h3>Usuario 4</h3>
                <p>Nombre de Usuario: Usuario4</p>
                <p>Correo Electrónico: Us4@example.com</p>
                <p>Teléfono: 8901234567</p>
                <p>Rol: Super Administrador</p>
                <button onclick="window.location.href='edit-user.php'">Editar</button>
            </div>
            <div class="user">
                <img src="assets/img/profile.png" alt="Usuario 5">
                <h3>Usuario 5</h3>
                <p>Nombre de Usuario: Usuario5</p>
                <p>Correo Electrónico: Us5@example.com</p>
                <p>Teléfono: 7890123456</p>
                <p>Rol: Administrador</p>
                <button onclick="window.location.href='edit-user.php'">Editar</button>
            </div>
            <div class="user">
                <img src="assets/img/profile.png" alt="Usuario 6">
                <h3>Usuario 6</h3>
                <p>Nombre de Usuario: Usuario6</p>
                <p>Correo Electrónico: Us6@example.com</p>
                <p>Teléfono: 6789012345</p>
                <p>Rol: Usuario</p>
                <button onclick="window.location.href='edit-user.php'">Editar</button>
            </div>
            <div class="user">
                <img src="assets/img/profile.png" alt="Usuario 7">
                <h3>Usuario 7</h3>
                <p>Nombre de Usuario: Usuario7</p>
                <p>Correo Electrónico: Us7@example.com</p>
                <p>Teléfono: 5678901234</p>
                <p>Rol: Administrador</p>
                <button onclick="window.location.href='edit-user.php'">Editar</button>
            </div>
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
