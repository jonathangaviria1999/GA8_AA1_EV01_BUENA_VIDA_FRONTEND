// Servicio encargado de comunicarse con la API backend BuenaVidaAPI.
// Centraliza las peticiones HTTP del módulo de gestión de gastos.

const API_URL = 'https://ga8-aa1-ev01-buena-vida-backend.onrender.com/api/gastos'

// Consulta todos los gastos registrados.
export async function obtenerGastos() {
    const respuesta = await fetch(API_URL)

    if (!respuesta.ok) {
        throw new Error('Error al consultar los gastos')
    }

    return await respuesta.json()
}

// Registra un nuevo gasto.
export async function crearGasto(gasto) {
    const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gasto)
    })

    if (!respuesta.ok) {
        throw new Error('Error al registrar el gasto')
    }

    return await respuesta.json()
}

// Actualiza un gasto existente.
export async function actualizarGasto(id, gasto) {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gasto)
    })

    if (!respuesta.ok) {
        throw new Error('Error al actualizar el gasto')
    }

    return await respuesta.json()
}

// Elimina un gasto por su identificador.
export async function eliminarGasto(id) {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })

    if (!respuesta.ok) {
        throw new Error('Error al eliminar el gasto')
    }
}