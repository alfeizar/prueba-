<?php
require_once __DIR__ . '/../models/ProductoGrupo.php';

class ProductoGrupoController
{
    private $productoGrupoModel;

    public function __construct()
    {
        $this->productoGrupoModel = new ProductoGrupo();
    }

    public function asignarProductoAGrupo($data)
    {
        return $this->productoGrupoModel->asignarProductoAGrupo($data['producto_id'], $data['grupo_id']);
    }

    public function removerProductoDeGrupo($data)
    {
        return $this->productoGrupoModel->removerProductoDeGrupo($data['producto_id'], $data['grupo_id']);
    }

    public function getProductosPorGrupo($grupo_id)
    {
        return $this->productoGrupoModel->getProductosPorGrupo($grupo_id);
    }
}
