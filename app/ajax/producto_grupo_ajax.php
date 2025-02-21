<?php
require_once __DIR__ . '/../controllers/ProductoGrupoController.php';

$productoGrupoController = new ProductoGrupoController();

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'asignar':
        echo json_encode($productoGrupoController->asignarProductoAGrupo($_POST));
        break;
    case 'remover':
        echo json_encode($productoGrupoController->removerProductoDeGrupo($_POST));
        break;
    case 'getProductosPorGrupo':
        echo json_encode($productoGrupoController->getProductosPorGrupo($_GET['grupo_id'] ?? ''));
        break;
    default:
        echo json_encode(["error" => "Acción no válida"]);
}
