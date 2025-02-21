<?php
require_once __DIR__ . '/../config/Database.php';

class Producto
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function createProducto($nombre, $descripcion, $precio, $stock, $estado)
    {
        $stmt = $this->conn->prepare("INSERT INTO productos (nombre, descripcion, precio, stock, estado) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdii", $nombre, $descripcion, $precio, $stock, $estado);

        if ($stmt->execute()) {
            return ["message" => "Producto creado exitosamente"];
        } else {
            return ["error" => "Error al crear producto: " . $stmt->error];
        }
    }

    public function getProductos()
    {
        $result = $this->conn->query("SELECT * FROM productos");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getProductoById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM productos WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function updateProducto($id, $nombre, $descripcion, $precio, $stock, $estado)
    {
        $stmt = $this->conn->prepare("UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, estado=? WHERE id=?");
        $stmt->bind_param("ssdiii", $nombre, $descripcion, $precio, $stock, $estado, $id);

        if ($stmt->execute()) {
            return ["message" => "Producto actualizado exitosamente"];
        } else {
            return ["error" => "Error al actualizar producto: " . $stmt->error];
        }
    }

    public function deleteProducto($id)
    {
        $stmt = $this->conn->prepare("DELETE FROM productos WHERE id=?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            return ["message" => "Producto eliminado exitosamente"];
        } else {
            return ["error" => "Error al eliminar producto: " . $stmt->error];
        }
    }
}
