<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - Supermercado Seguro</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Registro</h1>
        <img class="header-img-index" src="assets/img/register.png" alt="register">
    </header>

    <main>
        <section id="register">
            <h2 class="page-title">Crear una nueva cuenta</h2>
            <form action="login.php" method="POST">
                <label for="full-name">Nombre Completo:</label>
                <input type="text" id="full-name" name="full-name" required>

                <label for="username">Nombre de Usuario:</label>
                <input type="text" id="username" name="username" required>

                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required>

                <label for="phone">Teléfono:</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{8}" required>

                <label for="birthdate">Fecha de Nacimiento:</label>
                <input type="date" id="birthdate" name="birthdate" required>

                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required>

                <button type="submit">Registrar</button>
            </form>
            <p>¿Ya tienes una cuenta? <a class="change-option" href="login.php">Iniciar sesión</a></p>
        </section>
    </main>
</body>
</html>
