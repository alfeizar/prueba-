<div id="grupoModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div id="grupoModalContent" class="bg-white rounded-lg shadow-lg w-full max-w-md transform scale-95 opacity-0 transition-all duration-300">
        <div class="p-6">
            <h2 id="grupoModalTitle" class="text-xl font-bold mb-4">Nuevo Grupo</h2>
            <form id="grupoForm">
                <input type="hidden" id="grupoId">
                <div class="mb-4">
                    <label for="grupoNombre" class="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="text" id="grupoNombre" name="grupoNombre" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="mb-4">
                    <label for="grupoDescripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea id="grupoDescripcion" name="grupoDescripcion" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <div class="flex justify-end space-x-2">
                    <button type="button" data-close-grupo-modal class="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancelar</button>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>