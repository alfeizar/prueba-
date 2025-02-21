export class GrupoService {
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
  
    async createGrupo(grupoData) {
      return await this.makeRequest("create", "POST", grupoData);
    }
  
    async getAllGrupos() {
      return await this.makeRequest("readAll", "GET");
    }
  
    async getGrupoById(id) {
      return await this.makeRequest("readOne", "GET", { id });
    }
  
    async updateGrupo(grupoData) {
      return await this.makeRequest("update", "POST", grupoData);
    }
  
    async deleteGrupo(id) {
      return await this.makeRequest("delete", "POST", { id });
    }
  }