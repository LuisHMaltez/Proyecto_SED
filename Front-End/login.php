<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio de Sesión - Supermercado Seguro</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Inicio de Sesión</h1>
        <img class="header-img-index" src="assets/img/login.png" alt="login">
    </header>

    <main>
        <section id="login">
            <h2 class="page-title">Iniciar Sesión</h2>
            <form action="products.php" method="POST">
                <label for="username-login">Nombre de Usuario:</label>
                <input type="text" id="username-login" name="username-login" required>

                <label for="password-login">Contraseña:</label>
                <input type="password" id="password-login" name="password-login" required>

                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>¿No tienes una cuenta? <a class="change-option" href="register.php">Regístrate</a></p>
        </section>
    </main>

</body>
</html>
