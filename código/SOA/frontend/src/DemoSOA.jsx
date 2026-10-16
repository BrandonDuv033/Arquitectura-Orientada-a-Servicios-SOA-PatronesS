import { useState } from "react";
import "./DemoSOA.css";

const DemoSOA = () => {
  const [productoId, setProductoId] = useState(1);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState({ texto: "", error: false });

  const vender = async () => {
    try {
      const respuesta = await fetch("http://localhost:3002/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productoId, cantidad }),
      });
      const datos = await respuesta.json();
      setMensaje(
        respuesta.ok
          ? {
              texto: `Venta registrada: ${datos.cantidad}x ${datos.producto}`,
              error: false,
            }
          : { texto: `Error: ${datos.error}`, error: true },
      );
    } catch {
      setMensaje({
        texto: "Error: no se pudo conectar con el servicio de ventas",
        error: true,
      });
    }
  };

  return (
    <div className="soa-container">
      <h2>Demo SOA</h2>

      <div className="input-group">
        <label>Producto:</label>
        <select
          value={productoId}
          onChange={(e) => setProductoId(Number(e.target.value))}
        >
          <option value={1}>Cuaderno Argollado</option>
          <option value={2}>Resma de Papel</option>
        </select>
      </div>

      <div className="input-group">
        <label>Cantidad:</label>
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
        />
      </div>

      <button className="btn-primario" onClick={vender}>
        Vender
      </button>

      {mensaje.texto && (
        <p
          className={`mensaje ${mensaje.error ? "mensaje-error" : "mensaje-exito"}`}
        >
          {mensaje.texto}
        </p>
      )}
    </div>
  );
};

export default DemoSOA;
