// Componente encargado de mostrar los gastos registrados en una tabla.
function GastoTable({ gastos, onEditar, onEliminar }) {
    if (gastos.length === 0) {
        return (
            <section className="card">
                <h2>Gastos registrados</h2>
                <p>No hay gastos registrados.</p>
            </section>
        )
    }

    return (
        <section className="card">
            <h2>Gastos registrados</h2>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Valor</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
                </thead>

                <tbody>
                {gastos.map((gasto) => (
                    <tr key={gasto.id}>
                        <td>{gasto.id}</td>
                        <td>{gasto.descripcion}</td>
                        <td>{gasto.categoria}</td>
                        <td>${Number(gasto.valor).toLocaleString('es-CO')}</td>
                        <td>{gasto.fecha}</td>
                        <td>
                            <button className="editar" onClick={() => onEditar(gasto)}>
                                Editar
                            </button>

                            <button className="eliminar" onClick={() => onEliminar(gasto.id)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )
}

export default GastoTable