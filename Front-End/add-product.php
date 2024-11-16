<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Producto - Supermercado Seguro</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Agregar Producto</h1>
        <img class="header-img-index" src="assets/img/add-product.png" alt="add-product">
    </header>

    <main>
        <section id="add-product">
            <h2 class="page-title">Agregar Nuevo Producto</h2>
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

                <button type="submit">Agregar</button>
                <button type="button" onclick="window.location.href='edit-catalog.php'">Cancelar</button>
            </form>
        </section>
    </main>
</body>
</html>
