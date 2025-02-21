<?php
require_once __DIR__ . '/../config/Database.php';

class ProductoGrupo
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function asignarProductoAGrupo($producto_id, $grupo_id)
    {
        $stmt = $this->conn->prepare("INSERT INTO producto_grupo (producto_id, grupo_id) VALUES (?, ?)");
        $stmt->bind_param("ii", $producto_id, $grupo_id);

        if ($stmt->execute()) {
            return ["message" => "Producto asignado al grupo exitosamente"];
        } else {
            return ["error" => "Error al asignar producto al grupo: " . $stmt->error];
        }
    }

    public function removerProductoDeGrupo($producto_id, $grupo_id)
    {
        $stmt = $this->conn->prepare("DELETE FROM producto_grupo WHERE producto_id=? AND grupo_id=?");
        $stmt->bind_param("ii", $producto_id, $grupo_id);

        if ($stmt->execute()) {
            return ["message" => "Producto removido del grupo exitosamente"];
        } else {
            return ["error" => "Error al remover producto del grupo: " . $stmt->error];
        }
    }

    public function getProductosPorGrupo($grupo_id)
    {
        $stmt = $this->conn->prepare("SELECT p.* FROM productos p INNER JOIN producto_grupo pg ON p.id = pg.producto_id WHERE pg.grupo_id = ?");
        $stmt->bind_param("i", $grupo_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
