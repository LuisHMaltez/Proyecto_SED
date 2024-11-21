<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Perfil</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <h1>Editar Perfil</h1>
    </header>
    <main>
        <section id="editProfile">
            <form id="editProfileForm">
                <label for="username">Nombre de usuario:</label>
                <input type="text" id="username" name="nombre_usuario" required>

                <label for="name">Nombre:</label>
                <input type="text" id="name" name="nombre" required>

                <label for="email">Correo electrónico:</label>
                <input type="email" id="email" name="email" required>

                <label for="phone">Teléfono:</label>
                <input type="text" id="phone" name="telefono" required>

                <label for="birthdate">Fecha de nacimiento:</label>
                <input type="date" id="birthdate" name="fecha_nacimiento" required>

                <button type="submit">Guardar cambios</button>
                <button type="button" onclick="window.location.href='profile.php'">Cancelar</button>
            </form>

        </section>
    </main>
    <script src="../js/auth.js"></script>
    <script src="../js/edit-profile.js"></script>
</body>
</html>
