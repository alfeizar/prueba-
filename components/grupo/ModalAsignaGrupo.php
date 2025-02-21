<div id="asignarProductoModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div id="asignarProductoModalContent" class="bg-white rounded-lg shadow-xl w-full max-w-4xl transform scale-95 opacity-0 transition-all duration-300">
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 id="asignarProductoModalTitle" class="text-2xl font-bold text-gray-800">
                    Asignar/Remover Productos
                </h2>
                <button
                    data-close-asignar-modal
                    class="text-gray-400 hover:text-gray-600 transition-colors">
                    ✕
                </button>
            </div>

            <form id="asignarProductoForm" class="space-y-6">
                <input type="hidden" id="grupoAsignarId" />

                <div class="flex gap-4">
                    <!-- Productos Disponibles -->
                    <div class="flex-1">
                        <label
                            for="productosDisponibles"
                            class="block text-sm font-medium text-gray-700 mb-2">
                            Productos Disponibles
                        </label>
                        <select
                            id="productosDisponibles"
                            class="w-full h-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                            multiple>

                        </select>
                        <p class="mt-2 text-sm text-gray-500">
                            Doble clic para mover un producto
                        </p>
                    </div>

                    <!-- Control Buttons -->
                    <div class="flex flex-col items-center justify-center space-y-4">
                        <button
                            type="button"
                            id="moveRight"
                            class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-gray-600">
                                <path d="M5 12h14"></path>
                                <path d="m13 18 6-6"></path>
                                <path d="m13 6 6 6"></path>
                            </svg>
                        </button>
                        <button
                            type="button"
                            id="moveLeft"
                            class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-gray-600">
                                <path d="M19 12H5"></path>
                                <path d="m11 18-6-6"></path>
                                <path d="m11 6-6 6"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Productos Asignados -->
                    <div class="flex-1">
                        <label
                            for="productosAsignados"
                            class="block text-sm font-medium text-gray-700 mb-2">
                            Productos Asignados
                        </label>
                        <select
                            id="productosAsignados"
                            class="w-full h-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                            multiple>

                        </select>
                        <p class="mt-2 text-sm text-gray-500">
                            Doble clic para remover un producto
                        </p>
                    </div>
                </div>

                <div class="flex justify-end space-x-3 pt-4 border-t">
                    <button
                        type="button"
                        data-close-asignar-modal
                        class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>