const CATALOGO_DATA = {
  secciones: [
    {
      id: "bazar",
      nombre: "Bazar",
      orden: 1,
      productos: [
        {
          id: "molde-sorrentino",
          nombre: "Molde para Sorrentinos",
          descripcion: "Molde 3D para preparar sorrentinos artesanales con corte y sellado.",
          imagen: "images/molde-sorrentino.png",
          gramos: 2770.4,
          tiempoImpresion: { horas: 3, minutos: 20 },
          costo: 3200,
          precioMayorista: 6400,
          precioMinorista: 9600,
          destacado: false
        },
        {
          id: "molde-ravioles",
          nombre: "Molde para Ravioles",
          descripcion: "Molde 3D para ravioles artesanales con corte y sellado en una sola operación.",
          imagen: "images/molde-ravioles.png",
          gramos: 2623.97,
          tiempoImpresion: { horas: 3, minutos: 55 },
          costo: 4000,
          precioMayorista: 8000,
          precioMinorista: 12000,
          destacado: false
        },
        {
          id: "bandeja-nube",
          nombre: "Bandeja Forma de Nube",
          descripcion: "Bandeja decorativa con forma de nube para servir dulces y snacks.",
          imagen: "images/bandeja-nube.png",
          filamento: [],
          destacado: false
        },
        {
          id: "bandeja-circular",
          nombre: "Bandeja Circular Organizadora",
          descripcion: "Bandeja redonda con compartimentos para servir tapas, aderezos o picadas.",
          imagen: "images/bandeja-circular.png",
          filamento: [],
          destacado: false
        },
        {
          id: "basurero-escritorio",
          nombre: "Basurero de Escritorio",
          descripcion: "Mini contenedor para residuos pequeños con tapa abatible.",
          imagen: "images/basurero-escritorio.png",
          filamento: [],
          destacado: false
        },
        {
          id: "basurero-escritorio-mini",
          nombre: "Basurero de Escritorio Mini",
          descripcion: "Versión compacta del basurero de escritorio para espacios reducidos.",
          imagen: "images/basurero-escritorio-mini.png",
          filamento: [],
          destacado: false
        },
        {
          id: "basurero-auto",
          nombre: "Basurero Portátil para Auto",
          descripcion: "Contenedor colgante para auto con cierre hermético anti-olores.",
          imagen: "images/basurero-auto.png",
          gramos: 6819.88,
          tiempoImpresion: { horas: 7, minutos: 20 },
          costo: 7200,
          precioMayorista: 14400,
          precioMinorista: 21600,
          destacado: false
        },
        {
          id: "basurero-auto2",
          nombre: "Basurero Portátil para Auto Premium",
          descripcion: "Basurero auto premium con cierre hermético, asa de transporte y mayor capacidad.",
          imagen: "images/basurero-auto2.png",
          gramos: 3651.01,
          tiempoImpresion: { horas: 4, minutos: 10 },
          costo: 4100,
          precioMayorista: 8200,
          precioMinorista: 12300,
          destacado: false
        },
        {
          id: "organizador-escritorio",
          nombre: "Organizador de Escritorio Multi-compartimento",
          descripcion: "Caja organizadora con múltiples compartimentos para lápices, clips y accesorios.",
          imagen: "images/organizador-escritorio.png",
          gramos: 4472.95,
          tiempoImpresion: { horas: 3, minutos: 45 },
          costo: 4500,
          precioMayorista: 9000,
          precioMinorista: 13500,
          destacado: false
        },
        {
          id: "organizador-maquillaje",
          nombre: "Organizador de Maquillaje Giratorio",
          descripcion: "Torre giratoria con múltiples niveles para cosméticos y pinceles.",
          imagen: "images/organizador-maquillaje.png",
          gramos: 3669.89,
          tiempoImpresion: { horas: 3, minutos: 15 },
          costo: 3700,
          precioMayorista: 7400,
          precioMinorista: 11100,
          destacado: false
        },
        {
          id: "jabonera-desague",
          nombre: "Jabonera con Desagüe",
          descripcion: "Jabonera auto-drenante con superficie elevada y canaleta de escurrimiento.",
          imagen: "images/jabonera-desague.png",
          gramos: 811.22,
          tiempoImpresion: { horas: 1, minutos: 50 },
          costo: 2000,
          precioMayorista: 4000,
          precioMinorista: 6000,
          destacado: false
        },
        {
          id: "escurre-verduras",
          nombre: "Escurre Verduras y Frutas",
          descripcion: "Colador/escurridor para lavar verduras y frutas con asas ergonómicas.",
          imagen: "images/escurre-verdura-fruta.png",
          filamento: [],
          destacado: false
        },
        {
          id: "divisor-platos",
          nombre: "Divisor de Platos / Organizador de Vajilla",
          descripcion: "Separador vertical para organizar platos y bandejas en alacenas.",
          imagen: "images/divisor-platos.png",
          filamento: [],
          destacado: false
        },
        {
          id: "compartimiento-huevos",
          nombre: "Compartimiento para Huevos",
          descripcion: "Bandejita organizadora para guardar huevos en la heladera de forma segura.",
          imagen: "images/compartimiento-huevos.png",
          gramos: 6735.7,
          tiempoImpresion: { horas: 5, minutos: 50 },
          costo: 6750,
          precioMayorista: 13500,
          precioMinorista: 20250,
          destacado: false
        },
        {
          id: "compartimiento-huevos2",
          nombre: "Compartimiento para Huevos Versión 2",
          descripcion: "Organizador de huevos con capacidad ampliada y cierre superior.",
          imagen: "images/compartimiento-huevos2.png",
          gramos: 6735.7,
          tiempoImpresion: { horas: 5, minutos: 50 },
          costo: 6750,
          precioMayorista: 13500,
          precioMinorista: 20250,
          destacado: false
        },
        {
          id: "lavajilla-comida",
          nombre: "Lavajilla Tipo Comida / Desperdicios",
          descripcion: "Colador de desechos para lavabo con filtro retenedor de residuos.",
          imagen: "images/lavajilla-comida-desperdicios.png",
          filamento: [],
          destacado: false
        },
        {
          id: "cerradura-paquetes",
          nombre: "Cerradura para Paquetes / buzón seguro",
          descripcion: "Mecanismo de cierre seguro para buzones o cajas de paquetes.",
          imagen: "images/cerradura-paquetes.png",
          filamento: [],
          destacado: false
        },
        {
          id: "lampara-escritorio",
          nombre: "Lámpara de Escritorio 3D",
          descripcion: "Lámpara decorativa con pantalla impresa en 3D que proyecta patrones de luz.",
          imagen: "images/lampara.png",
          gramos: 5330.6,
          tiempoImpresion: { horas: 5, minutos: 0 },
          costo: 5500,
          precioMayorista: 11000,
          precioMinorista: 16500,
          destacado: false
        },
        {
          id: "lampara-luna",
          nombre: "Lámpara Luna 3D",
          descripcion: "Réplica de la luna con textura realista impresa en 3D e iluminación cálida.",
          imagen: "images/lampara-luna.png",
          gramos: 2983.14,
          tiempoImpresion: { horas: 9, minutos: 30 },
          costo: 9500,
          precioMayorista: 19000,
          precioMinorista: 28500,
          destacado: false
        },
        {
          id: "lampara-variedad",
          nombre: "Lámpara Decorativa Variedad",
          descripcion: "Colección de lámparas decorativas con diseños variados y modernos.",
          imagen: "images/lampara-variedad.png",
          filamento: [],
          destacado: false
        },
        {
          id: "maceta-funcional",
          nombre: "Maceta Funcional 3D",
          descripcion: "Maceta con sistema de drenaje integrado y diseño moderno.",
          imagen: "images/maceta1.png",
          gramos: 4201.52,
          tiempoImpresion: { horas: 4, minutos: 20 },
          costo: 4200,
          precioMayorista: 8400,
          precioMinorista: 12600,
          destacado: false
        },
        {
          id: "maceta-cuadrada",
          nombre: "Maceta Cuadrada Decorativa",
          descripcion: "Maceta cuadrada con texturas geométricas y sistema de riego por reserva.",
          imagen: "images/maceta2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "maceta-colgante",
          nombre: "Maceta Colgante 3D",
          descripcion: "Maceta colgante con soporte integrado para paredes o techos.",
          imagen: "images/maceta3.png",
          gramos: 1812.24,
          tiempoImpresion: { horas: 2, minutos: 0 },
          costo: 2000,
          precioMayorista: 4000,
          precioMinorista: 6000,
          destacado: false
        },
        {
          id: "maceta-moderna",
          nombre: "Maceta Estilo Moderno",
          descripcion: "Maceta con diseño contemporáneo, acabado mate y base para drenaje.",
          imagen: "images/maceta4.png",
          filamento: [],
          destacado: false
        },
        {
          id: "maceta-tierna",
          nombre: "Maceta Tierna",
          descripcion: "Maceta tierna impresa en 3D con detalles delicados.",
          imagen: "",
          gramos: 1964.79,
          tiempoImpresion: { horas: 2, minutos: 25 },
          costo: 2500,
          precioMayorista: 5000,
          precioMinorista: 7500,
          destacado: false
        },
        {
          id: "porta-joyas",
          nombre: "Porta Joyas",
          descripcion: "Organizador decorativo para guardar y exhibir joyería.",
          imagen: "",
          gramos: 1005.51,
          tiempoImpresion: { horas: 0, minutos: 54 },
          costo: 2000,
          precioMayorista: 4000,
          precioMinorista: 6000,
          destacado: false
        },
        {
          id: "porta-joyas-mariposa",
          nombre: "Porta Joyas Mariposa",
          descripcion: "Porta joyas con diseño de mariposa.",
          imagen: "",
          gramos: 8336.2,
          tiempoImpresion: { horas: 9, minutos: 50 },
          costo: 9500,
          precioMayorista: 19000,
          precioMinorista: 28500,
          destacado: false
        },
        {
          id: "porta-joyas-gato",
          nombre: "Porta Joyas Gato",
          descripcion: "Porta joyas con diseño de gato.",
          imagen: "",
          gramos: 5916.31,
          tiempoImpresion: { horas: 6, minutos: 45 },
          costo: 6750,
          precioMayorista: 13500,
          precioMinorista: 20250,
          destacado: false
        },
        {
          id: "porta-joyas-dragon",
          nombre: "Porta Joyas Dragón",
          descripcion: "Porta joyas con diseño de dragón.",
          imagen: "",
          gramos: 8360.18,
          tiempoImpresion: { horas: 9, minutos: 50 },
          costo: 9500,
          precioMayorista: 19000,
          precioMinorista: 28500,
          destacado: false
        },
        {
          id: "porta-joyas-zorro",
          nombre: "Porta Joyas Zorro",
          descripcion: "Porta joyas con diseño de zorro.",
          imagen: "",
          gramos: 6419.88,
          tiempoImpresion: { horas: 7, minutos: 20 },
          costo: 7200,
          precioMayorista: 14400,
          precioMinorista: 21600,
          destacado: false
        },
        {
          id: "porta-joyas-murcielago",
          nombre: "Porta Joyas Murciélago",
          descripcion: "Porta joyas con diseño de murciélago.",
          imagen: "",
          gramos: 8823.44,
          tiempoImpresion: { horas: 12, minutos: 0 },
          costo: 12000,
          precioMayorista: 24000,
          precioMinorista: 36000,
          destacado: false
        },
        {
          id: "porta-joyas-perro",
          nombre: "Porta Joyas Perro",
          descripcion: "Porta joyas con diseño de perro.",
          imagen: "",
          gramos: 8417.84,
          tiempoImpresion: { horas: 7, minutos: 0 },
          costo: 8500,
          precioMayorista: 17000,
          precioMinorista: 25500,
          destacado: false
        },
        {
          id: "ordenador-platos-x10",
          nombre: "Ordenador de Platos Vertical x10",
          descripcion: "Organizador vertical para hasta 10 platos.",
          imagen: "",
          gramos: 3775,
          tiempoImpresion: { horas: 4, minutos: 5 },
          costo: 4000,
          precioMayorista: 8000,
          precioMinorista: 12000,
          destacado: false
        },
        {
          id: "ordenador-platos-x8",
          nombre: "Ordenador de Platos Vertical x8",
          descripcion: "Organizador vertical para hasta 8 platos.",
          imagen: "",
          gramos: 3100,
          tiempoImpresion: { horas: 3, minutos: 10 },
          costo: 3100,
          precioMayorista: 6200,
          precioMinorista: 9300,
          destacado: false
        },
        {
          id: "ordenador-platos-x6",
          nombre: "Ordenador de Platos Vertical x6",
          descripcion: "Organizador vertical para hasta 6 platos.",
          imagen: "",
          gramos: 2400,
          tiempoImpresion: { horas: 2, minutos: 35 },
          costo: 2400,
          precioMayorista: 4800,
          precioMinorista: 7200,
          destacado: false
        }
      ]
    },
    {
      id: "cajas-cestas",
      nombre: "Cajas y Cestas",
      orden: 2,
      productos: [
        {
          id: "cesta-regalo",
          nombre: "Cesta de Regalo Circular",
          descripcion: "Cesta redonda tejida en filamento con asa elevada y acabado rústico.",
          imagen: "images/cesta-regalo.png",
          filamento: [],
          destacado: false
        },
        {
          id: "cesta-regalo2",
          nombre: "Cesta de Regalo Cuadrada",
          descripcion: "Cesta cuadrada con borde reforzado y asa plegable.",
          imagen: "images/cesta-regalo2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-corazon",
          nombre: "Caja Regalo Corazón 3D",
          descripcion: "Caja con forma de corazón con tapa abatible y relieve tridimensional.",
          imagen: "images/caja-regalo-corazon.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-corazon2",
          nombre: "Caja Regalo Corazón Doble Capa",
          descripcion: "Caja corazón con doble pared decorativa y cierre magnético oculto.",
          imagen: "images/caja-regalo-corazon2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-minecraft",
          nombre: "Caja Regalo Corazón Minecraft",
          descripcion: "Caja corazón estilo pixel-art inspirada en Minecraft.",
          imagen: "images/caja-regalo-corazonminecraft.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-mini-regalo",
          nombre: "Caja Mini Regalo Corazón",
          descripcion: "Cajita compacta con forma de corazón para detalles pequeños.",
          imagen: "images/cajamini-regalo-corazon.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-pascuas",
          nombre: "Caja Sorpresa de Pascuas",
          descripcion: "Huevo gigante articulado que se abre para revelar un compartimento interior.",
          imagen: "images/caja-pascuas.png",
          filamento: [],
          destacado: false
        },
        {
          id: "portaplumas-calendario",
          nombre: "Portaplumas con Calendario",
          descripcion: "Portaplumas con calendario integrado para organizar tu escritorio.",
          imagen: "images/Portaplumas-calendario.png",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "comida",
      nombre: "Comida",
      orden: 3,
      productos: [
        {
          id: "fideos-sensorial",
          nombre: "Set Fideos, Salsa, Tomateflexible, Tenedor, Cuchillo, Albóndiga a Broch y Bowl Sensorial",
          descripcion: "Set de comida sensorial con fideos, salsa, tomate, tenedor, cuchillo, albóndiga y bowl.",
          imagen: "images/fideos-salsa-tomateflexible-tenedorcuchillo-albondigaabrojo-bowl-sensorial.png",
          filamento: [],
          destacado: true
        },
        {
          id: "choclo-sensorial",
          nombre: "Choclo / Mazorca Sensorial Flexible",
          descripcion: "Mazorca con granos articulados independientes que se mueven al deslizar los dedos.",
          imagen: "images/choclo-sensorial.png",
          filamento: [],
          destacado: false
        },
        {
          id: "papas-huevo-pollo",
          nombre: "Combo Papas, Huevo, Pollo y Sartén Sensorial",
          descripcion: "Set de comida sensorial con papas fritas, huevo, pollo y sartén.",
          imagen: "images/papas-huevo-pollo-sarten-sensorial.jpg",
          filamento: [],
          destacado: false
        },
        {
          id: "cade-medialuna",
          nombre: "Cade Medialuna Antiestrés",
          descripcion: "Medialuna artesanal en cade con efecto antiestrés.",
          imagen: "images/cade-medialuna-antiestres.jpg",
          filamento: [],
          destacado: false
        },
        {
          id: "armar-donas",
          nombre: "Armá tus Donas Sensorial",
          descripcion: "Kit para armar donas con piezas sensoriales de colores.",
          imagen: "images/armar-donas-sensorial.png",
          filamento: [],
          destacado: false
        },
        {
          id: "combo-cocina",
          nombre: "Combo Cocina y Utensilios",
          descripcion: "Set completo de utensilios de cocina para jugar y decorar.",
          imagen: "images/combo-cocinautencillos.jpg",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "fidget",
      nombre: "Fidget",
      orden: 4,
      productos: [
        {
          id: "estrella-espiral",
          nombre: "Estrella Geométrica Espiral",
          descripcion: "Anillos concéntricos en forma de estrella que se despliegan telescópicamente.",
          imagen: "images/estrella-espiral.jpg",
          filamento: [],
          destacado: false
        },
        {
          id: "engranaje-roller",
          nombre: "Engranaje Doble Rodillo (Gear Roller)",
          descripcion: "Dos cilindros dentados sincronizados que giran con fluidez entre los dedos.",
          imagen: "images/engranaje-roller.jpg",
          filamento: [],
          destacado: false
        },
        {
          id: "cubo-infinito",
          nombre: "Cubo Infinito Texturizado",
          descripcion: "Ocho cubos con bisagras que se pliegan y despliegan de forma continua.",
          imagen: "images/cubo-infinito.jpg",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "soportes",
      nombre: "Soportes",
      orden: 5,
      productos: [
        {
          id: "soporte-celular",
          nombre: "Soporte para Celular Ajustable",
          descripcion: "Base estable con soporte regulable en ángulo para smartphones.",
          imagen: "images/soporte-celular.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-celular2",
          nombre: "Soporte para Celular Ergonómico",
          descripcion: "Soporte inclinado ergonómico con ranura para cable de carga.",
          imagen: "images/soporte-celular2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-notebook",
          nombre: "Soporte para Notebook Elevado",
          descripcion: "Elevador ergonómico ajustable en altura y ángulo para notebooks.",
          imagen: "images/soporte-notebook.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-notebook2",
          nombre: "Soporte para Notebook Compacto",
          descripcion: "Soporte plegable ultra compacto para notebooks.",
          imagen: "images/soporte-notebook2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-monitor",
          nombre: "Elevador de Monitor / Pantalla",
          descripcion: "Base elevadora para monitores de escritorio con superficie antideslizante.",
          imagen: "images/soporte-monitor.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-auto-celular",
          nombre: "Soporte para Celular de Auto",
          descripcion: "Soporte con ventosa para auto, compatible con todos los smartphones.",
          imagen: "images/soporte-auto-celular.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-celular-inferior",
          nombre: "Soporte Celular Compartimiento Inferior",
          descripcion: "Soporte de celular con compartimiento oculto en la base.",
          imagen: "images/soporte-celuar-compartimientoinferior.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-lentes",
          nombre: "Soporte para Lentes",
          descripcion: "Soporte para lentes de sol o lectura con base estable.",
          imagen: "images/soporte-lentes.jpeg",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-lentes-cara",
          nombre: "Soporte para Lentes Forma de Cara",
          descripcion: "Soporte decorativo para lentes con forma de cara.",
          imagen: "images/soporte-cara-lente.jpeg",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-lentes-pie",
          nombre: "Soporte para Lentes de Pie",
          descripcion: "Soporte de pie para lentes con base estable y diseño elegante.",
          imagen: "images/soporte-pie-lentes.jpeg",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "juegos-mesa",
      nombre: "Juegos de Mesa",
      orden: 6,
      productos: [
        {
          id: "tetris-balance",
          nombre: "Tetris Balance 3D",
          descripcion: "Juego de equilibrio con piezas estilo Tetris y base oscilante. Se coloca una pieza por turno y se mantiene el balance.",
          imagen: "images/equilibrio-tetris.png",
          filamento: [],
          destacado: false
        },
        {
          id: "arbol-monos",
          nombre: "Árbol de Monos en Equilibrio",
          descripcion: "Juego de equilibrio donde se cuelgan monos de un árbol sin que caiga la base.",
          imagen: "images/equilibrio-monos.png",
          filamento: [],
          destacado: false
        },
        {
          id: "torre-pagoda",
          nombre: "Torre Pagoda Jinja",
          descripcion: "Juego de extracción de piezas de una torre pagoda sin que se caiga.",
          imagen: "images/equilibrio-jinja.png",
          filamento: [],
          destacado: false
        },
        {
          id: "memotest-bananas",
          nombre: "Memotest Isla Banana",
          descripcion: "Juego de memoria con bananas de colores y dado para combinar.",
          imagen: "images/memoria-bananas.png",
          filamento: [],
          destacado: false
        },
        {
          id: "huerta-memoria",
          nombre: "Huerta de Memoria (Carrot Pop)",
          descripcion: "Juego de memoria con zanahorias que ocultan colores en una base.",
          imagen: "images/memoria-zanahoria.png",
          filamento: [],
          destacado: false
        },
        {
          id: "batalla-naval",
          nombre: "Batalla Naval 3D",
          descripcion: "Batalla naval clásica en versión 3D con tablero elevado y piezas articuladas.",
          imagen: "images/batalla-naval.png",
          filamento: [],
          destacado: false
        },
        {
          id: "juego-logico",
          nombre: "Juego Lógico Sekrit Enigma",
          descripcion: "Set de piezas geométricas que se encastran en una base hexagonal con 20 niveles de dificultad.",
          imagen: "images/juego-logico.png",
          filamento: [],
          destacado: false
        },
        {
          id: "futbol-dedos",
          nombre: "Fútbol de Dedos 3D",
          descripcion: "Minicancha de fútbol con jugadores articulados que se controlan con los dedos.",
          imagen: "images/futbol-dedos.png",
          filamento: [],
          destacado: false
        },
        {
          id: "ajedrez-3d",
          nombre: "Ajedrez 3D Personalizado",
          descripcion: "Tablero de ajedrez con piezas impresas en 3D con diseño único.",
          imagen: "images/ajedrez.png",
          filamento: [],
          destacado: false
        },
        {
          id: "coincidencia-perfecta",
          nombre: "Juego Coincidencia Perfecta",
          descripcion: "Juego de rapidez visual donde se buscan coincidencias entre patrones de colores y formas.",
          imagen: "images/juego-Coincidencia-Perfecta.png",
          filamento: [],
          destacado: false
        },
        {
          id: "destornillar-motriz",
          nombre: "Juego Destornillar - Habilidad Motriz",
          descripcion: "Set de destornilladores y tornillos de colores para practicar habilidades motoras finas.",
          imagen: "images/destornillar-juegomotriz.png",
          filamento: [],
          destacado: false
        },
        {
          id: "barras-construccion",
          nombre: "Barras de Construcción 3D",
          descripcion: "Set de barras articuladas que se ensamblan de múltiples formas para crear estructuras.",
          imagen: "images/barras-construccion.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-tren",
          nombre: "Armado Tren con Tornillo",
          descripcion: "Kit de armado de tren articulado con tornillos reutilizables.",
          imagen: "images/armado-tren-tornillo.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-formula1",
          nombre: "Armado Auto Fórmula 1",
          descripcion: "Modelo armable de auto Fórmula 1 con piezas encastrables y ruedas giratorias.",
          imagen: "images/armado-formula1.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-excavadora",
          nombre: "Armado Excavadora",
          descripcion: "Maquinaria pesada armable con cucharón articulado y ruedas móviles.",
          imagen: "images/armado-excavadora.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-excavadora2",
          nombre: "Armado Excavadora Versión 2",
          descripcion: "Segunda versión de la excavadora armable con mejoras en el mecanismo.",
          imagen: "images/armado-excavadora2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-avion",
          nombre: "Armado Avión",
          descripcion: "Avión armable con alas articuladas y hélice giratoria.",
          imagen: "images/armado-avion.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-avion-tornillo",
          nombre: "Armado Avión con Tornillo",
          descripcion: "Avión armado con sistema de tornillos reutilizables para practicar motricidad fina.",
          imagen: "images/armado-avion-tornillo.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-auto",
          nombre: "Armado Auto Clásico",
          descripcion: "Auto clásico armable con carrocería articulada y ruedas giratorias.",
          imagen: "images/armado-auto.png",
          filamento: [],
          destacado: false
        },
        {
          id: "tejo-mesa",
          nombre: "Tejo de Mesa 3D",
          descripcion: "Juego de tejo en miniatura impreso en 3D con tablero y piezas móviles.",
          imagen: "images/juego-tejo-mesa.jpg",
          filamento: [],
          destacado: false
        },
        {
          id: "pinza-pesca",
          nombre: "Pesca Competitiva",
          descripcion: "Caña con mecanismo de resorte para atrapar peces con el objetivo de pescar el mas grande.",
          imagen: "images/juego-pesca.png",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "llaveros",
      nombre: "Llaveros",
      orden: 7,
      productos: [
        {
          id: "llavero-chocolate",
          nombre: "Barra de Chocolate Clicker",
          descripcion: "Llavero articulado con piezas que encajan y se desensamblan.",
          imagen: "images/llaverofidget-chocolate.png",
          filamento: [],
          destacado: false
        },
        {
          id: "llavero-tnt",
          nombre: "Llavero Caja TNT Clicker",
          descripcion: "Llavero estilo pixel-art con switch mecánico táctil.",
          imagen: "images/llaverofidget-minecraft2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "llaveros-dumpling",
          nombre: "Llaveros Dumpling Baozi Kawaii",
          descripcion: "Llavero con forma de dumpling con pulsador elástico y rebote suave.",
          imagen: "images/llaverofidget-dumpling.png",
          filamento: [],
          destacado: false
        },
        {
          id: "paleta-6-teclas",
          nombre: "Llavero Paleta 6 Teclas Clicker",
          descripcion: "Llavero con 6 interruptores mecánicos independientes en formato compacto.",
          imagen: "images/llaverofidget-teclado2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "patita-michi",
          nombre: "Llaveros Patita de Michi Clicker",
          descripcion: "Llavero en forma de huellita felina con switch mecánico.",
          imagen: "images/llaverofidget-patitas.png",
          filamento: [],
          destacado: false
        },
        {
          id: "llavero-teclado",
          nombre: "Llavero Teclado Clicker",
          descripcion: "Mini teclado portátil con interruptores mecánicos y cadena para llaves.",
          imagen: "images/llaverofidget-teclado.png",
          filamento: [],
          destacado: false
        },
        {
          id: "llavero-creeper",
          nombre: "Llavero Creeper Minecraft Clicker",
          descripcion: "Cabeza pixelada de Creeper con switch mecánico y cadena metálica.",
          imagen: "images/llaverofidget-minecraft.jpg",
          filamento: [],
          destacado: false
        },
        {
          id: "llavero-variedad",
          nombre: "Llavero Variedad Fidget Mix",
          descripcion: "Set de llaveros fidget variados con diferentes mecanismos táctiles.",
          imagen: "images/llaverofidget-variedad.png",
          filamento: [],
          destacado: false
        },
        {
          id: "llavero-articulado",
          nombre: "Llavero Articulado Flexible",
          descripcion: "Llavero con eslabones articulados que se flexionan y mueven.",
          imagen: "images/llavero-articulado.png",
          filamento: [],
          destacado: false
        },
        {
          id: "pad-fidget-9",
          nombre: "Fidget Teclas Mecánicas",
          descripcion: "Base con teclas activas en tono pastel para disfrutar la sensación de teclado mecánico.",
          imagen: "images/llaverofidget-teclado3.png",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "mascotas",
      nombre: "Mascotas",
      orden: 8,
      productos: [
        {
          id: "comedero-gato-automatico",
          nombre: "Comedero Automático para Gato",
          descripcion: "Comedero automático con dispensador programable para gatos.",
          imagen: "images/comedero-gato-automatico.jpeg",
          filamento: [],
          destacado: false
        },
        {
          id: "comedero-gato-perro",
          nombre: "Comedero para Gato y Perro",
          descripcion: "Comedero doble para gato y perro con compartimentos individuales.",
          imagen: "images/comedero-gato-perro.jpg",
          filamento: [],
          destacado: false
        },
        {
          id: "comedero-perro-automatico",
          nombre: "Comedero Automático para Perro",
          descripcion: "Comedero automático con dispensador para perros.",
          imagen: "images/comedero-perro-automatico.jpg",
          filamento: [],
          destacado: false
        },
        {
          id: "juego-gato-pelota",
          nombre: "Juego para Gato con Pelota",
          descripcion: "Juego interactivo con pelota para gatos.",
          imagen: "images/juego-gato-pelota.jpeg",
          filamento: [],
          destacado: false
        },
        {
          id: "juego-gato-doblepelota",
          nombre: "Juego para Gato Doble Pelota",
          descripcion: "Juego interactivo con doble pelota para gatos.",
          imagen: "images/juego-gato-doblepelota.jpeg",
          filamento: [],
          destacado: false
        },
        {
          id: "pala-excrementos",
          nombre: "Pala para Excrementos con Soporte de Bolsa",
          descripcion: "Pala para excrementos con soporte integrado para bolsa.",
          imagen: "images/pala-excrementos-soporte-bolsa.jpg",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-pared-comedero",
          nombre: "Soporte de Pared para Comedero / Bebedero Animal",
          descripcion: "Soporte de pared para comedero o bebedero de mascotas.",
          imagen: "images/soporte-pared-comedero-bebedero-animal.jpeg",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "pokemon",
      nombre: "Pokémon",
      orden: 9,
      productos: [
        {
          id: "caja-pokemon",
          nombre: "Caja Porta Cartas Pokémon (Deck Box)",
          descripcion: "Caja temática de alta resistencia con tapa en relieve de Pikachu y Pokébola.",
          imagen: "images/caja-pokemon.jpeg",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-pokemon2",
          nombre: "Caja Porta Cartas Pokémon Premium",
          descripcion: "Versión premium con Pokébola en relieve, interior forrado y cierre magnético.",
          imagen: "images/caja-pokemon2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-pokemon3",
          nombre: "Caja Porta Cartas Pokémon Edición Especial",
          descripcion: "Edición especial con diseño único en relieve 3D y separadores ajustables.",
          imagen: "images/caja-pokemon3.png",
          filamento: [],
          destacado: false
        }
      ]
    }
  ],
  version: "1.4.0",
  ultimaActualizacion: new Date().toISOString()
};
