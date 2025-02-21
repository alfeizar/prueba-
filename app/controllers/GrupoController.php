<?php
require_once __DIR__ . '/../models/Grupo.php';

class GrupoController
{
    private $grupoModel;

    public function __construct()
    {
        $this->grupoModel = new Grupo();
    }

    public function create($data)
    {
        return $this->grupoModel->createGrupo($data['nombre'], $data['descripcion']);
    }

    public function readAll()
    {
        return $this->grupoModel->getGrupos();
    }

    public function readOne($id)
    {
        return $this->grupoModel->getGrupoById($id);
    }

    public function update($data)
    {
        return $this->grupoModel->updateGrupo($data['id'], $data['nombre'], $data['descripcion']);
    }

    public function delete($id)
    {
        return $this->grupoModel->deleteGrupo($id);
    }
}
