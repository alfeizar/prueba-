<?php
require_once __DIR__ . '/../config/Database.php';

class Grupo
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function createGrupo($nombre, $descripcion)
    {
        $stmt = $this->conn->prepare("INSERT INTO grupos (nombre, descripcion) VALUES (?, ?)");
        $stmt->bind_param("ss", $nombre, $descripcion);

        if ($stmt->execute()) {
            return ["message" => "Grupo creado exitosamente"];
        } else {
            return ["error" => "Error al crear grupo: " . $stmt->error];
        }
    }

    public function getGrupos()
    {
        $result = $this->conn->query("SELECT * FROM grupos");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getGrupoById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM grupos WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function updateGrupo($id, $nombre, $descripcion)
    {
        $stmt = $this->conn->prepare("UPDATE grupos SET nombre=?, descripcion=? WHERE id=?");
        $stmt->bind_param("ssi", $nombre, $descripcion, $id);

        if ($stmt->execute()) {
            return ["message" => "Grupo actualizado exitosamente"];
        } else {
            return ["error" => "Error al actualizar grupo: " . $stmt->error];
        }
    }

    public function deleteGrupo($id)
    {
        $stmt = $this->conn->prepare("DELETE FROM grupos WHERE id=?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            return ["message" => "Grupo eliminado exitosamente"];
        } else {
            return ["error" => "Error al eliminar grupo: " . $stmt->error];
        }
    }
}
