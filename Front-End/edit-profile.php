<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Perfil - Supermercado Seguro</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Editar Perfil</h1>
        <img class="header-img-index" src="assets/img/edit-profile.png" alt="edit-profile">
    </header>

    <main>
        <section id="edit-profile">
            <h2 class="page-title">Editar tu Información</h2>
            <form method="POST" action="procesar_perfil.php" enctype="multipart/form-data">
                <label for="full-name">Nombre Completo:</label>
                <input type="text" id="full-name" name="full-name" required>

                <label for="username">Nombre de Usuario:</label>
                <input type="text" id="username" name="username" required>

                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required>

                <label for="phone">Teléfono:</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>

                <label for="birthdate">Fecha de Nacimiento:</label>
                <input type="date" id="birthdate" name="birthdate" required>

                <label for="profile-pic">Foto de Perfil:</label>
                <input type="file" id="profile-pic" name="profile-pic">

                <button type="submit">Guardar</button>
                <button type="button" onclick="window.location.href='profile.php'">Cancelar</button>
                <button type="button" class="delete-btn" onclick="confirmDelete()">Borrar Perfil</button>
            </form>
        </section>
    </main>

    <script>
        function confirmDelete() {
            if (confirm("¿Estás seguro que quieres borrar tu perfil?")) {
                if (confirm("Esta acción no se puede deshacer. ¿Deseas continuar?")) {
                    // Lógica para borrar el perfil
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
