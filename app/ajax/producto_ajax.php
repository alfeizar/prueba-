<?php
require_once __DIR__ . '/../controllers/ProductoController.php';

$productoController = new ProductoController();

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'create':
        echo json_encode($productoController->create($_POST));
        break;
    case 'readAll':
        echo json_encode($productoController->readAll());
        break;
    case 'readOne':
        echo json_encode($productoController->readOne($_GET['id'] ?? ''));
        break;
    case 'update':
        echo json_encode($productoController->update($_POST));
        break;
    case 'delete':
        echo json_encode($productoController->delete($_POST['id'] ?? ''));
        break;
    default:
        echo json_encode(["error" => "Acción no válida"]);
}
