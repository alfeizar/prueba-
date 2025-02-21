<?php
require_once __DIR__ . '/../controllers/GrupoController.php';

$grupoController = new GrupoController();

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'create':
        echo json_encode($grupoController->create($_POST));
        break;
    case 'readAll':
        echo json_encode($grupoController->readAll());
        break;
    case 'readOne':
        echo json_encode($grupoController->readOne($_GET['id'] ?? ''));
        break;
    case 'update':
        echo json_encode($grupoController->update($_POST));
        break;
    case 'delete':
        echo json_encode($grupoController->delete($_POST['id'] ?? ''));
        break;
    default:
        echo json_encode(["error" => "Acción no válida"]);
}
