import { useState } from "react";
import "./index.css";

const PanelControlMediator = () => {
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const procesarOrden = () => {
    alert(`Orden confirmada: ${cantidad}x ${producto}`);
  };

  const esFormularioValido = producto !== "" && cantidad > 0;

  return (
    <div className="mediador-container">
      <h2>Demo Mediator</h2>

      <SelectorProducto
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
      />

      <SelectorCantidad
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}
      />

      <BotonAccion activo={esFormularioValido} onClick={procesarOrden} />
    </div>
  );
};

// --- LOS COMPONENTES HIJOS ---

const SelectorProducto = ({ value, onChange }) => (
  <div className="input-group">
    <label>Producto:</label>
    <select value={value} onChange={onChange}>
      <option value="">Seleccione un ítem...</option>
      <option value="Pan Francés">Pan Francés</option>
      <option value="Croissant Relleno">Croissant Relleno</option>
      <option value="Resma de Papel">Resma de Papel</option>
      <option value="Cuaderno Argollado">Cuaderno Argollado</option>
    </select>
  </div>
);

const SelectorCantidad = ({ value, onChange }) => (
  <div className="input-group">
    <label>Cantidad:</label>
    <input type="number" min="1" value={value} onChange={onChange} />
  </div>
);

const BotonAccion = ({ activo, onClick }) => (
  <button
    className={`btn-primario ${!activo ? "btn-deshabilitado" : ""}`}
    disabled={!activo}
    onClick={onClick}
  >
    Procesar Orden
  </button>
);

export default PanelControlMediator;
