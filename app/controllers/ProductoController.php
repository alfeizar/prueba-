<?php
require_once __DIR__ . '/../models/Producto.php';

class ProductoController
{
    private $productoModel;

    public function __construct()
    {
        $this->productoModel = new Producto();
    }

    public function create($data)
    {
        return $this->productoModel->createProducto($data['nombre'], $data['descripcion'], $data['precio'], $data['stock'], $data['estado']);
    }

    public function readAll()
    {
        return $this->productoModel->getProductos();
    }

    public function readOne($id)
    {
        return $this->productoModel->getProductoById($id);
    }

    public function update($data)
    {
        return $this->productoModel->updateProducto($data['id'], $data['nombre'], $data['descripcion'], $data['precio'], $data['stock'], $data['estado']);
    }

    public function delete($id)
    {
        return $this->productoModel->deleteProducto($id);
    }
}
