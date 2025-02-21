<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Modal</title>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
    <link href="./dist/styles.css" rel="stylesheet">
</head>

<body class="bg-gray-100">
    <div class="container mx-auto p-4">
        <!-- tabla de Productos -->
        <?php include __DIR__ . '/components/producto/ProductTable.php'; ?>
        <!-- tabla de Grupos -->
        <?php include __DIR__ . '/components/grupo/GrupoTable.php'; ?>
    </div>


    <!-- Modal producto -->
    <?php include __DIR__ . '/components/producto/ModalActionsProducto.php'; ?>
    <!-- modal de grupos -->
    <?php include __DIR__ . '/components/grupo/ModalActionsGrupo.php'; ?>
    <!-- Modal para Asignar/Remover Productos a Grupos -->
    <?php include __DIR__ . '/components/grupo/ModalAsignaGrupo.php'; ?>


    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="module" src="assets/js/script.js"></script>
</body>

</html>