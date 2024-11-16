<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuario - Supermercado Seguro</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Editar Usuario</h1>
        <img class="header-img-index" src="assets/img/edit-user.png" alt="edit-user">
    </header>

    <main>
        <section id="edit-user">
            <h2 class="page-title">Editar Información del Usuario</h2>
            <form method="POST" action="edit-users.php" enctype="multipart/form-data">
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

                <label for="role">Rol:</label>
                <select id="role" name="role">
                    <option value="superadmin">Super Administrador</option>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                </select>

                <label for="profile-pic">Foto de Perfil:</label>
                <input type="file" id="profile-pic" name="profile-pic">

                <button type="submit">Guardar</button>
                <button type="button" onclick="window.location.href='edit-users.php'">Cancelar</button>
                <button type="button" class="delete-btn" onclick="confirmDelete()">Borrar Usuario</button>
            </form>
        </section>
    </main>

    <script>
        function confirmDelete() {
            if (confirm("¿Estás seguro que quieres borrar este usuario?")) {
                if (confirm("Esta acción no se puede deshacer. ¿Deseas continuar?")) {
                    // Lógica para borrar el usuario
                }
            }
        }

        function toggleMenu() {
            const menu = document.querySelector('.menu');
            menu.classList.toggle('active');
        }
    </script>
</body>
</html>
