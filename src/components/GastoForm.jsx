import { useEffect, useState } from 'react'

// Componente encargado del formulario para registrar o editar gastos.
function GastoForm({ onGuardar, gastoSeleccionado, onCancelarEdicion }) {
    const [gasto, setGasto] = useState({
        descripcion: '',
        categoria: '',
        valor: '',
        fecha: ''
    })

    // Si el usuario selecciona un gasto para editar,
    // sus datos se cargan automáticamente en el formulario.
    useEffect(() => {
        if (gastoSeleccionado) {
            setGasto({
                descripcion: gastoSeleccionado.descripcion,
                categoria: gastoSeleccionado.categoria,
                valor: gastoSeleccionado.valor,
                fecha: gastoSeleccionado.fecha
            })
        }
    }, [gastoSeleccionado])

    // Actualiza los datos del formulario cada vez que el usuario escribe.
    function manejarCambio(evento) {
        const { name, value } = evento.target

        setGasto({
            ...gasto,
            [name]: value
        })
    }

    // Envía la información del formulario al componente principal App.
    function manejarEnvio(evento) {
        evento.preventDefault()

        if (!gasto.descripcion || !gasto.categoria || !gasto.valor || !gasto.fecha) {
            alert('Todos los campos son obligatorios')
            return
        }

        onGuardar({
            ...gasto,
            valor: Number(gasto.valor)
        })

        setGasto({
            descripcion: '',
            categoria: '',
            valor: '',
            fecha: ''
        })
    }

    return (
        <section className="card">
            <h2>{gastoSeleccionado ? 'Editar gasto' : 'Registrar gasto'}</h2>

            <form onSubmit={manejarEnvio} className="formulario">
                <label>
                    Descripción
                    <input
                        type="text"
                        name="descripcion"
                        value={gasto.descripcion}
                        onChange={manejarCambio}
                        placeholder="Ejemplo: Almuerzo"
                    />
                </label>

                <label>
                    Categoría
                    <input
                        type="text"
                        name="categoria"
                        value={gasto.categoria}
                        onChange={manejarCambio}
                        placeholder="Ejemplo: Alimentación"
                    />
                </label>

                <label>
                    Valor
                    <input
                        type="number"
                        name="valor"
                        value={gasto.valor}
                        onChange={manejarCambio}
                        placeholder="Ejemplo: 18000"
                        min="0"
                    />
                </label>

                <label>
                    Fecha
                    <input
                        type="date"
                        name="fecha"
                        value={gasto.fecha}
                        onChange={manejarCambio}
                    />
                </label>

                <div className="botones">
                    <button type="submit">
                        {gastoSeleccionado ? 'Actualizar gasto' : 'Guardar gasto'}
                    </button>

                    {gastoSeleccionado && (
                        <button type="button" className="secundario" onClick={onCancelarEdicion}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </section>
    )
}

export default GastoForm