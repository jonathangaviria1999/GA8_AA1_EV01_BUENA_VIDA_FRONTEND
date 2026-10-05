import { useEffect, useState } from 'react'
import './App.css'

import Header from './components/Header.jsx'
import GastoForm from './components/GastoForm.jsx'
import GastoTable from './components/GastoTable.jsx'
import MensajeAlerta from './components/MensajeAlerta.jsx'

import {
  obtenerGastos,
  crearGasto,
  actualizarGasto,
  eliminarGasto
} from './services/GastoService.js'

// Componente principal de la aplicación.
// Organiza el formulario, la tabla, los mensajes y la comunicación con la API.
function App() {
  const [gastos, setGastos] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('exito')
  const [gastoSeleccionado, setGastoSeleccionado] = useState(null)

  // Al cargar la aplicación se consultan los gastos registrados en el backend.
  useEffect(() => {
    cargarGastos()
  }, [])

  // Consulta la lista de gastos desde BuenaVidaAPI.
  async function cargarGastos() {
    try {
      const datos = await obtenerGastos()
      setGastos(datos)
    } catch (error) {
      mostrarMensaje(error.message, 'error')
    }
  }

  // Guarda un gasto nuevo o actualiza uno existente.
  async function guardarGasto(gasto) {
    try {
      if (gastoSeleccionado) {
        await actualizarGasto(gastoSeleccionado.id, gasto)
        mostrarMensaje('Gasto actualizado correctamente.', 'exito')
        setGastoSeleccionado(null)
      } else {
        await crearGasto(gasto)
        mostrarMensaje('Gasto registrado correctamente.', 'exito')
      }

      await cargarGastos()
    } catch (error) {
      mostrarMensaje(error.message, 'error')
    }
  }

  // Carga un gasto en el formulario para editarlo.
  function editarGasto(gasto) {
    setGastoSeleccionado(gasto)
  }

  // Elimina un gasto después de confirmar la acción.
  async function borrarGasto(id) {
    const confirmar = window.confirm('¿Deseas eliminar este gasto?')

    if (!confirmar) {
      return
    }

    try {
      await eliminarGasto(id)
      mostrarMensaje('Gasto eliminado correctamente.', 'exito')
      await cargarGastos()
    } catch (error) {
      mostrarMensaje(error.message, 'error')
    }
  }

  // Cancela la edición del gasto seleccionado.
  function cancelarEdicion() {
    setGastoSeleccionado(null)
  }

  // Muestra un mensaje temporal de éxito o error.
  function mostrarMensaje(texto, tipo) {
    setMensaje(texto)
    setTipoMensaje(tipo)

    setTimeout(() => {
      setMensaje('')
    }, 3000)
  }

  return (
      <div className="app">
        <Header />

        <main className="contenedor">
          <MensajeAlerta mensaje={mensaje} tipo={tipoMensaje} />

          <GastoForm
              onGuardar={guardarGasto}
              gastoSeleccionado={gastoSeleccionado}
              onCancelarEdicion={cancelarEdicion}
          />

          <GastoTable
              gastos={gastos}
              onEditar={editarGasto}
              onEliminar={borrarGasto}
          />
        </main>
      </div>
  )
}

export default App