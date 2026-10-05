// Servicio encargado de comunicarse con la API backend BuenaVidaAPI.
// Centraliza las peticiones HTTP del modulo de gestion de gastos.

const API_URL = 'https://ga8-aa1-ev01-buena-vida-backend.onrender.com/api/gastos'

// Convierte el _id de MongoDB en id para que el frontend lo pueda usar.
function normalizarGasto(gasto) {
    return {
        ...gasto,
        id: gasto.id || gasto._id
    }
}

// Consulta todos los gastos registrados.
export async function obtenerGastos() {
    const respuesta = await fetch(API_URL)

    if (!respuesta.ok) {
        throw new Error('Error al consultar los gastos')
    }

    const data = await respuesta.json()
    const listaGastos = Array.isArray(data) ? data : data.gastos || []

    return listaGastos.map(normalizarGasto)
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

    const data = await respuesta.json()
    const gastoCreado = data.gasto || data

    return normalizarGasto(gastoCreado)
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

    const data = await respuesta.json()
    const gastoActualizado = data.gasto || data

    return normalizarGasto(gastoActualizado)
}

// Elimina un gasto por su identificador.
export async function eliminarGasto(id) {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })

    if (!respuesta.ok) {
        throw new Error('Error al eliminar el gasto')
    }

    return true
}