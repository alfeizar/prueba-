export class ProductoService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async makeRequest(action, method, data = {}) {
    data.action = action;
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.baseUrl,
        type: method,
        data: data,
        dataType: "json",
        success: (response) => resolve(response),
        error: (xhr, status, error) => reject(error),
      });
    });
  }

  async createProducto(productoData) {
    return await this.makeRequest("create", "POST", productoData);
  }

  async getAllProductos() {
    return await this.makeRequest("readAll", "GET");
  }

  async getProductoById(id) {
    return await this.makeRequest("readOne", "GET", { id });
  }

  async updateProducto(productoData) {
    return await this.makeRequest("update", "POST", productoData);
  }

  async deleteProducto(id) {
    return await this.makeRequest("delete", "POST", { id });
  }
}
