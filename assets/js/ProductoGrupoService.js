export class ProductoGrupoService {
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

  async asignarProductoAGrupo(productoId, grupoId) {
    return await this.makeRequest("asignar", "POST", {
      producto_id: productoId,
      grupo_id: grupoId,
    });
  }

  async removerProductoDeGrupo(productoId, grupoId) {
    return await this.makeRequest("remover", "POST", {
      producto_id: productoId,
      grupo_id: grupoId,
    });
  }

  async getProductosPorGrupo(grupoId) {
    return await this.makeRequest("getProductosPorGrupo", "GET", {
      grupo_id: grupoId,
    });
  }
}
