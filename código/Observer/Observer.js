class MrBeastNotificaciones {
  constructor(nombre) {
    this.nombre = nombre;
    this.suscriptores = [];
  }

  suscribir(observador) {
    this.suscriptores.push(observador);
  }

  desuscribir(observador) {
    this.suscriptores = this.suscriptores.filter((obs) => obs !== observador);
  }

  publicarContenido(titulo) {
    console.log(`[${this.nombre}] Nuevo contenido publicado: "${titulo}"`);
    this.notificar(titulo);
  }

  notificar(titulo) {
    this.suscriptores.forEach((suscriptor) => {
      suscriptor.actualizar(this.nombre, titulo);
    });
  }
}

// El Observador: Reacciona cuando el Sujeto le avisa de un cambio
class Usuario {
  constructor(nombre) {
    this.nombre = nombre;
  }

  // El método que el Sujeto ejecutará
  actualizar(canal, contenido) {
    console.log(
      `Hola ${this.nombre}, ¡${canal} tiene una actualización para ti: ${contenido}!`,
    );
  }
}

// --- Uso del Patrón ---

// 1. Creamos el sujeto
const sistemaAlertas = new CanalNotificaciones("Sistema Principal");

// 2. Creamos los observadores
const brandon = new Usuario("Brandon");
const mari = new Usuario("Mari");
const kevin = new Usuario("Kevin");

// 3. Los observadores se suscriben al sujeto
sistemaAlertas.suscribir(brandon);
sistemaAlertas.suscribir(mari);
sistemaAlertas.suscribir(kevin);
sistemaAlertas.desuscribir(mari);

// 4. El sujeto cambia de estado y notifica a todos mágicamente
sistemaAlertas.publicarContenido("Actualización de base de datos completada");
