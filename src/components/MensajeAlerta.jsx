// Componente reutilizable para mostrar mensajes de éxito o error al usuario.

function MensajeAlerta({ mensaje, tipo }) {
    if (!mensaje) {
        return null
    }

    return (
        <div className={`alerta ${tipo}`}>
            {mensaje}
        </div>
    )
}

export default MensajeAlerta