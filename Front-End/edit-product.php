<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Producto - Supermercado Seguro</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Editar Producto</h1>
        <img class="header-img-index" src="assets/img/edit-product.png" alt="edit-product">
    </header>

    <main>
        <section id="edit-product">
            <h2 class="page-title">Editar Información del Producto</h2>
            <form method="POST" action="edit-catalog.php" enctype="multipart/form-data">
                <label for="product-name">Nombre del Producto:</label>
                <input type="text" id="product-name" name="product-name" required>

                <label for="description">Descripción:</label>
                <textarea id="description" name="description" required></textarea>

                <label for="price">Precio:</label>
                <input type="number" id="price" name="price" required>

                <label for="stock">Stock:</label>
                <input type="number" id="stock" name="stock" required>

                <label for="product-pic">Imagen del Producto:</label>
                <input type="file" id="product-pic" name="product-pic">

                <button type="submit">Guardar</button>
                <button type="button" onclick="window.location.href='edit-catalog.php'">Cancelar</button>
                <button type="button" class="delete-btn" onclick="confirmDelete()">Borrar Producto</button>
            </form>
        </section>
    </main>

    <script>
        function confirmDelete() {
            if (confirm("¿Estás seguro que quieres borrar este producto?")) {
                if (confirm("Esta acción no se puede deshacer. ¿Deseas continuar?")) {
                    // Lógica para borrar el producto
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
