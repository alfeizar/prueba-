import { ProductoService } from "./ProductoService.js";
import { GrupoService } from "./GrupoService.js";
import { ProductoGrupoService } from "./ProductoGrupoService.js";
import "./toastrConfig.js";

class UIHandler {
  constructor(productoService, grupoService, productoGrupoService) {
    this.productoService = productoService;
    this.grupoService = grupoService;
    this.productoGrupoService = productoGrupoService;
    this.$modal = $("#userModal");
    this.$modalContent = $("#modalContent");
    this.$grupoModal = $("#grupoModal");
    this.$grupoModalContent = $("#grupoModalContent");
    this.$asignarProductoModal = $("#asignarProductoModal");
    this.$asignarProductoModalContent = $("#asignarProductoModalContent");
    this.initEventListeners();
  }

  // Métodos de inicialización
  async initialize() {
    await this.loadProductos();
    await this.loadGrupos();
  }

  initEventListeners() {
    // Eventos de modales
    $(document).on("click", "[data-open-producto-modal ]", () =>
      this.openModal()
    );
    $(document).on("click", "[data-close-producto-modal]", () =>
      this.closeModal()
    );
    $(document).on("click", "[data-open-grupo-modal]", () =>
      this.openGrupoModal()
    );
    $(document).on("click", "[data-close-grupo-modal]", () =>
      this.closeGrupoModal()
    );
    $(document).on("click", "[data-open-asignar-modal]", async (e) => {
      const grupoId = $(e.currentTarget).data("id");
      await this.openAsignarProductoModal(grupoId);
    });
    $(document).on("click", "[data-close-asignar-modal]", () =>
      this.closeAsignarProductoModal()
    );

    // Eventos de formularios
    $(document).on("submit", "#productoForm", async (e) => {
      e.preventDefault();
      await this.formActions();
    });
    $(document).on("submit", "#grupoForm", async (e) => {
      e.preventDefault();
      await this.grupoFormActions();
    });
    $(document).on("submit", "#asignarProductoForm", async (e) => {
      e.preventDefault();
      await this.asignarProductoFormActions();
    });

    // Eventos de movimientos de productos
    $("#moveRight").on("click", function () {
      $("#productosDisponibles option:selected").each(function () {
        $(this).remove().appendTo("#productosAsignados");
      });
    });
    $("#moveLeft").on("click", function () {
      $("#productosAsignados option:selected").each(function () {
        $(this).remove().appendTo("#productosDisponibles");
      });
    });
    $("#productosDisponibles").on("dblclick", "option", function () {
      $(this).remove().appendTo("#productosAsignados");
    });
    $("#productosAsignados").on("dblclick", "option", function () {
      $(this).remove().appendTo("#productosDisponibles");
    });

    // Eventos de botones de editar y eliminar
    $(document).on("click", ".edit-btn", async (e) => {
      const productoId = $(e.currentTarget).data("id");
      const producto = await this.productoService.getProductoById(productoId);
      $("#productoId").val(producto.id);
      $("#nombre").val(producto.nombre);
      $("#descripcion").val(producto.descripcion);
      $("#precio").val(producto.precio);
      $("#stock").val(producto.stock);
      $("#estado").val(producto.estado);
      $("#modalTitle").text("Editar Producto");
      this.openModal();
    });
    $(document).on("click", ".delete-btn", async (e) => {
      const productoId = $(e.currentTarget).data("id");
      const result = await Swal.fire({
        title: "¿Estás seguro de eliminar este producto?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        this.deleteProducto(productoId);
      }
    });
    $(document).on("click", ".edit-grupo-btn", async (e) => {
      const grupoId = $(e.currentTarget).data("id");
      const grupo = await this.grupoService.getGrupoById(grupoId);
      $("#grupoId").val(grupo.id);
      $("#grupoNombre").val(grupo.nombre);
      $("#grupoDescripcion").val(grupo.descripcion);
      $("#grupoModalTitle").text("Editar Grupo");
      this.openGrupoModal();
    });
    $(document).on("click", ".delete-grupo-btn", async (e) => {
      const grupoId = $(e.currentTarget).data("id");
      const result = await Swal.fire({
        title: "¿Estás seguro de eliminar este grupo?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        this.deleteGrupo(grupoId);
      }
    });

    // Evento para eliminar un producto del grupo
    $(document).on("click", ".remove-product", async function () {
      const productoId = $(this).data("id");
      const grupoId = $("#grupoAsignarId").val();

      try {
        await this.productoGrupoService.removerProductoDeGrupo(
          productoId,
          grupoId
        );
        toastr.success("Producto removido correctamente");
        $(this).parent().remove();
      } catch (error) {
        toastr.error("Error al remover producto");
        console.error("Error al remover producto:", error);
      }
    });
  }

  // Métodos para abrir y cerrar modales
  openModal() {
    this.$modal.removeClass("hidden").addClass("flex");
    setTimeout(() => {
      this.$modalContent
        .removeClass("scale-95 opacity-0")
        .addClass("scale-100 opacity-100");
      $("#nombre").focus();
    }, 10);
  }

  closeModal() {
    this.$modalContent
      .removeClass("scale-100 opacity-100")
      .addClass("scale-95 opacity-0");
    setTimeout(() => {
      this.$modal.removeClass("flex").addClass("hidden");
    }, 300);
    $("#productoForm")[0].reset();
    $("#productoId").val("");
    $("#modalTitle").text("Nuevo Producto");
  }

  openGrupoModal() {
    this.$grupoModal.removeClass("hidden").addClass("flex");
    setTimeout(() => {
      this.$grupoModalContent
        .removeClass("scale-95 opacity-0")
        .addClass("scale-100 opacity-100");
      $("#grupoNombre").focus();
    }, 10);
  }

  closeGrupoModal() {
    this.$grupoModalContent
      .removeClass("scale-100 opacity-100")
      .addClass("scale-95 opacity-0");
    setTimeout(() => {
      this.$grupoModal.removeClass("flex").addClass("hidden");
    }, 300);
    $("#grupoForm")[0].reset();
    $("#grupoId").val("");
    $("#grupoModalTitle").text("Nuevo Grupo");
  }

  async openAsignarProductoModal(grupoId) {
    this.$asignarProductoModal.removeClass("hidden").addClass("flex");
    setTimeout(() => {
      this.$asignarProductoModalContent
        .removeClass("scale-95 opacity-0")
        .addClass("scale-100 opacity-100");
    }, 10);

    // Obtener productos disponibles y asignados
    const productosDisponibles = await this.productoService.getAllProductos();
    const productosAsignados =
      await this.productoGrupoService.getProductosPorGrupo(grupoId);

    // Limpiar selects
    $("#productosDisponibles").empty();
    $("#productosAsignados").empty();

    // Llenar productos disponibles (excluyendo los ya asignados)
    productosDisponibles.forEach((producto) => {
      const productoId = String(producto.id);
      const productoYaAsignado = productosAsignados.some(
        (p) => String(p.id) === productoId
      );

      // Solo mostrar productos disponibles que estén activos
      if (!productoYaAsignado && producto.estado == 1) {
        $("#productosDisponibles").append(
          `<option value="${producto.id}">${producto.nombre}</option>`
        );
      }
    });

    // Llenar productos asignados
    productosAsignados.forEach((producto) => {
      $("#productosAsignados").append(
        `<option value="${producto.id}">${producto.nombre}</option>`
      );
    });

    $("#grupoAsignarId").val(grupoId);
  }

  closeAsignarProductoModal() {
    this.$asignarProductoModalContent
      .removeClass("scale-100 opacity-100")
      .addClass("scale-95 opacity-0");
    setTimeout(() => {
      this.$asignarProductoModal.removeClass("flex").addClass("hidden");
    }, 300);
    $("#asignarProductoForm")[0].reset();
  }

  // Métodos para manejar formularios
  async formActions() {
    try {
      const productoId = $("#productoId").val();
      const productoData = this.getFormData();

      // Validar los datos antes de enviarlos
      if (!this.validarProducto(productoData)) {
        return; // Detener el proceso si la validación falla
      }

      const response = productoId
        ? await this.productoService.updateProducto({
            id: productoId,
            ...productoData,
          })
        : await this.productoService.createProducto(productoData);

      this.handleFormResponseProducto(response);
    } catch (error) {
      toastr.error("Error al procesar el formulario");
      console.error("Error en el formulario:", error);
    }
  }

  async grupoFormActions() {
    try {
      const grupoId = $("#grupoId").val();
      const grupoData = {
        nombre: $("#grupoNombre").val(),
        descripcion: $("#grupoDescripcion").val(),
      };

      // Validar los datos antes de enviarlos
      if (!this.validarGrupo(grupoData)) {
        return; // Detener el proceso si la validación falla
      }

      const response = grupoId
        ? await this.grupoService.updateGrupo({ id: grupoId, ...grupoData })
        : await this.grupoService.createGrupo(grupoData);

      this.handleFormResponseGrupo(response);
    } catch (error) {
      toastr.error("Error al procesar el formulario");
      console.error("Error en el formulario:", error);
    }
  }

  async asignarProductoFormActions() {
    try {
      const grupoId = $("#grupoAsignarId").val();

      // Obtener productos actuales en la lista asignada
      const productosAsignadosNuevos = $("#productosAsignados option")
        .map(function () {
          return $(this).val();
        })
        .get();

      // Obtener productos que ya estaban asignados al abrir el modal
      const productosAsignadosInicialmente =
        await this.productoGrupoService.getProductosPorGrupo(grupoId);
      const productosAsignadosInicialmenteIds =
        productosAsignadosInicialmente.map((p) => String(p.id));

      // Obtener productos que fueron removidos (los que estaban antes y ahora ya no están)
      const productosRemovidos = productosAsignadosInicialmenteIds.filter(
        (id) => !productosAsignadosNuevos.includes(id)
      );

      // Obtener productos nuevos (los que no estaban antes y ahora sí están)
      const productosNuevos = productosAsignadosNuevos.filter(
        (id) => !productosAsignadosInicialmenteIds.includes(id)
      );

      // Asignar solo los productos nuevos
      for (const productoId of productosNuevos) {
        await this.productoGrupoService.asignarProductoAGrupo(
          productoId,
          grupoId
        );
      }

      // Remover solo los productos que fueron desasignados
      for (const productoId of productosRemovidos) {
        await this.productoGrupoService.removerProductoDeGrupo(
          productoId,
          grupoId
        );
      }

      toastr.success("Cambios guardados correctamente");
      this.closeAsignarProductoModal();
    } catch (error) {
      toastr.error("Error al asignar productos");
      console.error("Error en el formulario:", error);
    }
  }

  // Métodos para renderizar datos
  renderProductos(productos) {
    const tbody = $("#productoTable tbody");
    tbody.empty();

    if (productos.length === 0) {
      tbody.append(
        `<tr>
          <td colspan="6" class="px-6 py-4 text-center text-gray-500">
            No hay productos registrados.
          </td>
        </tr>`
      );
      return;
    }

    productos.forEach((producto) => {
      const row = `
        <tr class="hover:bg-gray-50 transition-colors duration-200">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="h-10 w-10 flex-shrink-0">
                <span class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600">
                  <i class="fas fa-box"></i>
                </span>
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">${
                  producto.nombre
                }</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-500">${
              producto.descripcion ? producto.descripcion : "Sin descripción"
            }</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${producto.precio}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${producto.stock}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${
              producto.estado == 1 ? "Activo" : "Inactivo"
            }</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
            <button class="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all duration-200 group edit-btn" data-id="${
              producto.id
            }">
              <i class="fas fa-edit mr-1.5 group-hover:scale-110 transition-transform duration-200"></i>
              <span>Editar</span>
            </button>
            <button class="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all duration-200 group delete-btn" data-id="${
              producto.id
            }">
              <i class="fas fa-trash-alt mr-1.5 group-hover:scale-110 transition-transform duration-200"></i>
              <span>Eliminar</span>
            </button>
          </td>
        </tr>
      `;
      tbody.append(row);
    });
  }

  renderizarProductosAsignados(productos) {
    const lista = $("#productosAsignadosLista");
    lista.empty();

    productos.forEach((producto) => {
      lista.append(`
            <li class="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                <span>${producto.nombre}</span>
                <button class="remove-product bg-red-500 text-white px-2 py-1 rounded-md text-xs" data-id="${producto.id}">
                    Remover
                </button>
            </li>
        `);
    });
  }

  renderGrupos(grupos) {
    const tbody = $("#grupoTable tbody");
    tbody.empty();

    if (grupos.length === 0) {
      tbody.append(
        `<tr>
          <td colspan="4" class="px-6 py-4 text-center text-gray-500">
            No hay grupos registrados.
          </td>
        </tr>`
      );
      return;
    }

    grupos.forEach((grupo) => {
      const row = `
        <tr class="hover:bg-gray-50 transition-colors duration-200">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="h-10 w-10 flex-shrink-0">
                <span class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600">
                  <i class="fas fa-layer-group"></i>
                </span>
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">${
                  grupo.nombre
                }</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-500">${
              grupo.descripcion ? grupo.descripcion : "Sin descripción"
            }</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
            <button class="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all duration-200 group edit-grupo-btn" data-id="${
              grupo.id
            }">
              <i class="fas fa-edit mr-1.5 group-hover:scale-110 transition-transform duration-200"></i>
              <span>Editar</span>
            </button>
            <button class="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all duration-200 group delete-grupo-btn" data-id="${
              grupo.id
            }">
              <i class="fas fa-trash-alt mr-1.5 group-hover:scale-110 transition-transform duration-200"></i>
              <span>Eliminar</span>
            </button>
            <button class="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200 group" data-open-asignar-modal data-id="${
              grupo.id
            }">
              <i class="fas fa-link mr-1.5 group-hover:scale-110 transition-transform duration-200"></i>
              <span>Asignar Productos</span>
            </button>
          </td>
        </tr>
      `;
      tbody.append(row);
    });
  }

  // Métodos para eliminar registros
  async deleteProducto(id) {
    try {
      const response = await this.productoService.deleteProducto(id);
      if (response.error) {
        toastr.error(response.error);
      } else {
        toastr.success(response.message);
        this.loadProductos();
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  }

  async deleteGrupo(id) {
    try {
      const response = await this.grupoService.deleteGrupo(id);
      if (response.error) {
        toastr.error(response.error);
      } else {
        toastr.success(response.message);
        this.loadGrupos();
      }
    } catch (error) {
      console.error("Error al eliminar grupo:", error);
    }
  }

  // Métodos para cargar datos
  async loadProductos() {
    try {
      const response = await this.productoService.getAllProductos();
      this.renderProductos(response);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  async loadGrupos() {
    try {
      const response = await this.grupoService.getAllGrupos();
      this.renderGrupos(response);
    } catch (error) {
      console.error("Error al cargar grupos:", error);
    }
  }

  // Métodos auxiliares
  getFormData() {
    return {
      nombre: $("#nombre").val(),
      descripcion: $("#descripcion").val(),
      precio: $("#precio").val(),
      stock: $("#stock").val(),
      estado: $("#estado").val(),
    };
  }

  handleFormResponseProducto(response) {
    if (response.error) {
      toastr.error(response.error);
    } else {
      toastr.success(response.message);
      this.closeModal();
      this.loadProductos();
    }
  }

  handleFormResponseGrupo(response) {
    if (response.error) {
      toastr.error(response.error);
    } else {
      toastr.success(response.message);
      this.closeGrupoModal();
      this.loadGrupos();
    }
  }

  // Métodos de validación
  validarProducto(productoData) {
    const { nombre, precio, stock, estado } = productoData;

    // Validar que el nombre no esté vacío
    if (!nombre || nombre.trim() === "") {
      toastr.error("El nombre del producto es obligatorio.");
      return false;
    }

    // Validar que el precio sea un número mayor a 0
    if (isNaN(precio) || parseFloat(precio) <= 0) {
      toastr.error("El precio debe ser un número mayor a 0.");
      return false;
    }

    // Validar que el stock sea un número mayor o igual a 0
    if (isNaN(stock) || parseInt(stock) < 0) {
      toastr.error("El stock debe ser un número mayor o igual a 0.");
      return false;
    }

    // Validar que el estado sea un valor válido (0 o 1)
    if (estado !== "0" && estado !== "1") {
      toastr.error("El estado del producto no es válido.");
      return false;
    }

    return true; // Si todas las validaciones pasan
  }

  validarGrupo(grupoData) {
    const { nombre } = grupoData;

    // Validar que el nombre no esté vacío
    if (!nombre || nombre.trim() === "") {
      toastr.error("El nombre del grupo es obligatorio.");
      return false;
    }

    return true; // Si todas las validaciones pasan
  }
}

$(document).ready(() => {
  const productoService = new ProductoService(
    "/proyectos/prueba/app/ajax/producto_ajax.php"
  );
  const grupoService = new GrupoService(
    "/proyectos/prueba/app/ajax/grupo_ajax.php"
  );
  const productoGrupoService = new ProductoGrupoService(
    "/proyectos/prueba/app/ajax/producto_grupo_ajax.php"
  );
  const uiHandler = new UIHandler(
    productoService,
    grupoService,
    productoGrupoService
  );
  uiHandler.initialize();
});
