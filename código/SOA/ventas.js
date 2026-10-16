// SERVICIO DE VENTAS (puerto 3002) hecho con json-server + una ruta personalizada.
// json-server solo da CRUD; la regla de negocio la agregamos nosotros en POST /ventas.
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db-ventas.json");
const INVENTARIO_URL = "http://localhost:3001";

server.use(jsonServer.defaults()); // incluye CORS
server.use(jsonServer.bodyParser);

// Esta ruta se registra ANTES del router para reemplazar el POST por defecto
server.post("/ventas", async (req, res) => {
  const { productoId, cantidad } = req.body;

  try {
    // 1. Consumir el servicio de Inventario
    const respuesta = await fetch(`${INVENTARIO_URL}/productos/${productoId}`);
    if (!respuesta.ok)
      return res.status(404).json({ error: "Producto no existe" });
    const producto = await respuesta.json();

    // 2. Regla de negocio
    if (producto.stock < cantidad) {
      return res
        .status(409)
        .json({ error: `Stock insuficiente (hay ${producto.stock})` });
    }

    // 3. Descontar stock en el servicio de Inventario
    await fetch(`${INVENTARIO_URL}/productos/${productoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: producto.stock - cantidad }),
    });

    // 4. Guardar la venta en la base de este servicio
    const venta = router.db
      .get("ventas")
      .insert({ producto: producto.nombre, cantidad })
      .write();

    res.status(201).json(venta);
  } catch (error) {
    res.status(503).json({ error: "Servicio de inventario no disponible" });
  }
});

server.use(router); // el resto de rutas (GET /ventas, etc.) las resuelve json-server
server.listen(3002, () => console.log("Ventas en http://localhost:3002"));
