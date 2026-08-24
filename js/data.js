const CATALOGO_DATA = {
  secciones: [
    {
      id: "juegos-mesa",
      nombre: "Juegos de Mesa",
      orden: 1,
      productos: [
        {
          id: "tetris-balance",
          nombre: "Tetris Balance 3D",
          descripcion: "Se tira el dado y se coloca la pieza correspondiente sobre la base oscilante. Si la estructura cae, se pierde la ronda. ¡Desafiante juego de pulso y visión espacial!",
          imagen: "images/equilibrio-tetris.png",
          filamento: [],
          destacado: false
        },
        {
          id: "arbol-monos",
          nombre: "Árbol de Monos en Equilibrio",
          descripcion: "Por turnos, se tira el dado y se colocan monitos según el número obtenido sin voltear la base hexagonal. Juego interactivo donde hay que calcular el peso con precisión.",
          imagen: "images/equilibrio-monos.png",
          filamento: [],
          destacado: false
        },
        {
          id: "torre-pagoda",
          nombre: "Torre Pagoda Jinja",
          descripcion: "El dado indica qué columna retirar por turno. Gana quien logre sacarlas con mayor pulso sin tirar la torre. Inspirada en la arquitectura tradicional oriental.",
          imagen: "images/equilibrio-jinja.png",
          filamento: [],
          destacado: false
        },
        {
          id: "memotest-bananas",
          nombre: "Memotest Isla Banana",
          descripcion: "Se tira el dado de color y se levanta una banana. Si coincide el color es punto; si no, se devuelve a la base. ¡Juego de memoria espacial con temática tropical!",
          imagen: "images/memoria-bananas.png",
          filamento: [],
          destacado: false
        },
        {
          id: "huerta-memoria",
          nombre: "Huerta de Memoria (Carrot Pop)",
          descripcion: "Cada zanahoria oculta un color en la base. El dado indica cuál cosechar. Gana quien acumule más aciertos. ¡Estimula la retención visual y el reconocimiento de patrones!",
          imagen: "images/memoria-zanahoria.png",
          filamento: [],
          destacado: false
        },
        {
          id: "batalla-naval",
          nombre: "Batalla Naval 3D",
          descripcion: "Clásico juego de estrategia en versión tridimensional con tablero elevado y piezas articuladas. Colocá tus barcos y hundí los del rival antes de que hundan los tuyos.",
          imagen: "images/batalla-naval.png",
          filamento: [],
          destacado: false
        },
        {
          id: "juego-logico",
          nombre: "Juego Lógico Sekrit Enigma",
          descripcion: "Set de piezas lógicas con diferentes figuras geométricas que se encastran en una base hexagonal. Resolvé desafíos de razonamiento espacial con 20 niveles de dificultad creciente.",
          imagen: "images/juego-logico.png",
          filamento: [],
          destacado: false
        },
        {
          id: "futbol-dedos",
          nombre: "Fútbol de Dedos 3D",
          descripcion: "Minicancha de fútbol con jugadores articulados que se controlan con los dedos. Partidos mano a mano con porterías reforzadas y pelota diminuta. ¡Divertido juego de pulso y estrategia!",
          imagen: "images/futbol-dedos.png",
          filamento: [],
          destacado: false
        },
        {
          id: "ajedrez-3d",
          nombre: "Ajedrez 3D Personalizado",
          descripcion: "Tablero de ajedrez con piezas impresas en 3D con diseño único. Piezas articuladas y detalladas, tablero estable con casilleros marcados. Ideal para regalar o coleccionar.",
          imagen: "images/ajedrez.png",
          filamento: [],
          destacado: false
        },
        {
          id: "coincidencia-perfecta",
          nombre: "Juego Coincidencia Perfecta",
          descripcion: "Juego de rapidez visual donde debés encontrar coincidencias entre tarjetas con patrones de colores y formas. Estimula la atención y el reconocimiento de patrones.",
          imagen: "images/juego-Coincidencia-Perfecta.png",
          filamento: [],
          destacado: false
        },
        {
          id: "destornillar-motriz",
          nombre: "Juego Destornillar - Habilidad Motriz",
          descripcion: "Set de destornilladores y tornillos de colores para practicar habilidades motoras finas. Actividad educativa donde se enroscan piezas de distintas formas y tamaños.",
          imagen: "images/destornillar-juegomotriz.png",
          filamento: [],
          destacado: false
        },
        {
          id: "barras-construccion",
          nombre: "Barras de Construcción 3D",
          descripcion: "Set de barras articuladas que se ensamblan de múltiples formas para crear estructuras. Juego educativo de ingeniería y creatividad para todas las edades.",
          imagen: "images/barras-construccion.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-tren",
          nombre: "Armado Tren con Tornillo",
          descripcion: "Kit de armado de tren articulado con tornillos reutilizables. Piezas encastrables que se arman y desarman, fomentando la motricidad y el razonamiento lógico.",
          imagen: "images/armado-tren-tornillo.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-formula1",
          nombre: "Armado Auto Fórmula 1",
          descripcion: "Modelo armable de auto Fórmula 1 con piezas encastrables. Diseño aerodinámico detallado con ruedas giratorias y acabado en colores racing.",
          imagen: "images/armado-formula1.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-excavadora",
          nombre: "Armado Excavadora",
          descripcion: "Maquinaria pesada armable con cucharón articulado y ruedas móviles. Piezas robustas que se ensamblan sin pegamento, ideal para los amantes de la maquinaria.",
          imagen: "images/armado-excavadora.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-excavadora2",
          nombre: "Armado Excavadora Versión 2",
          descripcion: "Segunda versión de la excavadora armable con mejoras en el mecanismo de la pala y diseño más detallado. Cucharón funcional y orugas articuladas.",
          imagen: "images/armado-excavadora2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-avion",
          nombre: "Armado Avión",
          descripcion: "Avión armable con alas articuladas y hélice giratoria. Modelo detallado con piezas encastrables que permite construir una aeronave completa sin herramientas.",
          imagen: "images/armado-avion.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-avion-tornillo",
          nombre: "Armado Avión con Tornillo",
          descripcion: "Avión armado con sistema de tornillos reutilizables para practicar motricidad fina. Alas móviles, hélice giratoria yDetalle mecánico visible.",
          imagen: "images/armado-avion-tornillo.png",
          filamento: [],
          destacado: false
        },
        {
          id: "armado-auto",
          nombre: "Armado Auto Clásico",
          descripcion: "Auto clásico armable con carrocería articulada y ruedas giratorias. Diseño retro con piezas encastrables coloridas, ideal para armar y jugar.",
          imagen: "images/armado-auto.png",
          filamento: [],
          destacado: false
        },
        {
          id: "tejo-mesa",
          nombre: "Tejo de Mesa 3D",
          descripcion: "Juego de tejo en miniatura impreso en 3D con tablero detallado y piezas móviles. Versión portátil del clásico juego argentino, ideal para llevar a cualquier lugar.",
          imagen: "images/juego-tejo-mesa.jpg",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "llaveros",
      nombre: "Llaveros",
      orden: 2,
      productos: [
        {
          id: "llavero-chocolate",
          nombre: "Llavero Puzzle Barra de Chocolate",
          descripcion: "Las piezas encajan entre sí y se desensamblan para desestresarse en cualquier lugar. Llavero articulado con acabado símil chocolate y herraje reforzado.",
          imagen: "images/llaverofidget-chocolate.png",
          filamento: [],
          destacado: false
        },
        {
          id: "llavero-tnt",
          nombre: "Llavero Caja TNT Clicker",
          descripcion: "Bloque cúbico pixel-art estilo dinamita con tapa removible que oculta un switch mecánico táctil ultra satisfactorio. Sonido click acústico y pulsación continua adictiva.",
          imagen: "images/llaverofidget-minecraft.png",
          filamento: [],
          destacado: false
        },
        {
          id: "llaveros-dumpling",
          nombre: "Llaveros Dumpling Baozi Kawaii",
          descripcion: "Bollitos al vapor dentro de su vaporera asiática, con pulsador interno elástico para un rebote suave al presionarlos. Gama en tonos pastel con caritas grabadas y cadena incluida.",
          imagen: "images/llaverofidget-dumpling.png",
          filamento: [],
          destacado: false
        },
        {
          id: "paleta-6-teclas",
          nombre: "Llavero Paleta 6 Teclas Clicker",
          descripcion: "Formato de bolsillo con 6 interruptores mecánicos independientes decorados con mini íconos en relieve. Pulsación ligera, cadenita metálica y acabado pastel multicolor.",
          imagen: "images/llaverofidget-teclado2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "patita-michi",
          nombre: "Llaveros Patita de Michi Clicker",
          descripcion: "Huellitas felinas 3D con almohadillas texturizadas y switch mecánico de alto rendimiento para cliquear sin parar. Diseño ergonómico, combinaciones bitono y argolla metálica.",
          imagen: "images/llaverofidget-patitas.png",
          filamento: [],
          destacado: false
        },
        {
          id: "llavero-teclado",
          nombre: "Llavero Teclado Clicker 4 Teclas",
          descripcion: "Mini teclado portátil con 4 interruptores mecánicos que imitan la sensación de un teclado real. Formato compacto con cadena para llaves, ideal para llevar en el bolsillo.",
          imagen: "images/llaverofidget-teclado.png",
          filamento: [],
          destacado: false
        },
        {
          id: "llavero-creeper",
          nombre: "Llavero Creeper Minecraft Clicker",
          descripcion: "Cabeza pixelada del Creeper en verde vibrante con switch mecánico oculto que al presionar genera un click satisfactorio. Acabado mate, cadena metálica y resorte de larga vida útil.",
          imagen: "images/llaverofidget-minecraft2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "llavero-variedad",
          nombre: "Llavero Variedad Fidget Mix",
          descripcion: "Set de llaveros fidget variados con diferentes mecanismos táctiles. Cada uno con función única: clickers, giratorios, articulados. Ideal para quien quiere probar distintas sensaciones.",
          imagen: "images/llaverofidget-variedad.png",
          filamento: [],
          destacado: false
        },
        {
          id: "llavero-articulado",
          nombre: "Llavero Articulado Flexible",
          descripcion: "Llavero con eslabones articulados que se flexionan y mueven con fluidez. Efecto satisfactorio al manipularlo, diseño ergonómico y cadena resistente incluida.",
          imagen: "images/llavero-articulado.png",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "fidget",
      nombre: "Fidget",
      orden: 3,
      productos: [
        {
          id: "pad-fidget-9",
          nombre: "Pad Fidget 9 Teclas Mecánicas",
          descripcion: "Base ergonómica con 9 teclas activas en tono pastel para disfrutar la sensación de un teclado mecánico. Keycaps suaves al tacto y formato compacto antiestrés.",
          imagen: "images/llaverofidget-teclado3.png",
          filamento: [],
          destacado: false
        },
        {
          id: "estrella-espiral",
          nombre: "Estrella Geométrica Espiral",
          descripcion: "Anillos concéntricos en forma de estrella que se despliegan telescópicamente creando un efecto visual hipnótico. Impreso en filamento bicromático tornasolado.",
          imagen: "images/estrella-espiral.png",
          filamento: [],
          destacado: false
        },
        {
          id: "engranaje-roller",
          nombre: "Engranaje Doble Rodillo (Gear Roller)",
          descripcion: "Dos cilindros dentados sincronizados que giran con fluidez entre los dedos. Masaje sensorial relajante y silencioso que ayuda a aliviar la ansiedad y la tensión en las manos.",
          imagen: "images/engranaje-roller.png",
          filamento: [],
          destacado: false
        },
        {
          id: "cubo-infinito",
          nombre: "Cubo Infinito Texturizado",
          descripcion: "Ocho cubos ensamblados con bisagras de precisión que se pliegan y despliegan de forma continua. Superficie antideslizante, giro silencioso apto para oficinas o clases.",
          imagen: "images/cubo-infinito.png",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "pokemon",
      nombre: "Pokémon",
      orden: 4,
      productos: [
        {
          id: "caja-pokemon",
          nombre: "Caja Porta Cartas Pokémon (Deck Box)",
          descripcion: "Contenedor temático de alta resistencia con tapa en relieve de Pikachu y Pokébola. Cierre con trabas reforzadas tipo clip, bisagras articuladas y capacidad óptima con o sin sleeves.",
          imagen: "images/caja-pokemon.jpeg",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-pokemon2",
          nombre: "Caja Porta Cartas Pokémon Premium",
          descripcion: "Versión premium con diseño diferente de la Pokébola en relieve, interior forrado y compartimentos organizadores. Cierre magnético reforzado, ideal para coleccionistas.",
          imagen: "images/caja-pokemon2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-pokemon3",
          nombre: "Caja Porta Cartas Pokémon Edición Especial",
          descripcion: "Edición especial con diseño único de Pokémon en relieve 3D. Interior amplio con separadores ajustables, cierre a presión reforzado y acabado premium para coleccionistas exigentes.",
          imagen: "images/caja-pokemon3.png",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "comida",
      nombre: "Comida",
      orden: 5,
      productos: [
        {
          id: "medialuna-flexible",
          nombre: "Medialuna / Croissant Flexible",
          descripcion: "Reproducción segmentada de una medialuna dorada que se ondula y flexiona de manera fluida gracias a sus uniones internas. Tono manteca tostado brillante con textura satisfactoria.",
          imagen: "images/medialunas.png",
          filamento: [],
          destacado: false
        },
        {
          id: "taza-magica",
          nombre: "Taza Mágica con Chorro de Café Flotante",
          descripcion: "Escultura suspendida que recrea el vertido dinámico de café líquido mediante una cascada articulada segmentada. Grabado lateral 'Relax', ideal para ambientar escritorios.",
          imagen: "images/cafe.png",
          filamento: [],
          destacado: false
        },
        {
          id: "set-gourmet",
          nombre: "Set Gourmet Sensorial: Pasta, Salsa & Tomates",
          descripcion: "Incluye bowl con pasta Rotini, fideos con salsa, tenedor, paquete, frasco con relieve y tomates antiestrés con mecanismo helicoidal de rosca giratoria ascendente.",
          imagen: "images/pasta1.png",
          filamento: [],
          destacado: true
        },
        {
          id: "huevo-frito",
          nombre: "Huevo Frito Flexible Articulado",
          descripcion: "Al levantarlo de la superficie se dobla y amolda como una lámina elástica. Clara blanca brillante con yema en relieve biselado y movimiento maleable relajante.",
          imagen: "images/huevo.png",
          filamento: [],
          destacado: false
        },
        {
          id: "pata-pollo",
          nombre: "Pata de Pollo con Escalera Desplegable",
          descripcion: "Al deslizar el hueso, despliega una escalera telescópica oculta en su interior. Mecanismo deslizante de ajuste preciso, acabado bitono y efecto sorpresa dinámico.",
          imagen: "images/pollo.png",
          filamento: [],
          destacado: false
        },
        {
          id: "choclo-sensorial",
          nombre: "Choclo / Mazorca Sensorial Flexible",
          descripcion: "Mazorca ergonómica con decenas de granos articulados independientes que se mueven al deslizar los dedos o apretar. Estimulación táctil estilo acupresión para relajar la palma.",
          imagen: "images/choclo.png",
          filamento: [],
          destacado: false
        },
        {
          id: "molde-sorrentino",
          nombre: "Molde para Sorrentinos",
          descripcion: "Molde impreso en 3D para preparar sorrentinos artesanales con corte perfecto. Forma redondeada con bordes selladores, resistente a la temperatura y fácil de limpiar.",
          imagen: "images/molde-sorrentino.png",
          filamento: [],
          destacado: false
        },
        {
          id: "molde-ravioles",
          nombre: "Molde para Ravioles",
          descripcion: "Molde de ravioles artesanales con corte y sellado en una sola operación. Material resistente apto para uso alimenticio, resultado profesional en casa.",
          imagen: "images/molde-ravioles.png",
          filamento: [],
          destacado: false
        },
        {
          id: "bandeja-nube",
          nombre: "Bandeja Forma de Nube",
          descripcion: "Bandeja decorativa con forma de nube para servir dulces, snacks o decorar mesas. Diseño kawaii con bordes suaves, ideal para fiestas infantiles y detalles creativos.",
          imagen: "images/bandeja-nube.png",
          filamento: [],
          destacado: false
        },
        {
          id: "bandeja-circular",
          nombre: "Bandeja Circular Organizadora",
          descripcion: "Bandeja redonda con compartimentos para servir tapas, aderezos o picadas. Diseño elegante con bordes elevados, perfecta para organizar y presentar comida con estilo.",
          imagen: "images/bandeja-circular.png",
          filamento: [],
          destacado: false
        },
        {
          id: "pinza-pesca",
          nombre: "Pinza de Pesca para Insectos",
          descripcion: "Herramienta de pinza extensible con mecanismo de resorte para atrapar insectos sin dañarlos. Ideal para niños curiosos, exploración educativa y observación de la naturaleza.",
          imagen: "images/pesca.png",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "hogar",
      nombre: "Hogar",
      orden: 6,
      productos: [
        {
          id: "basurero-escritorio",
          nombre: "Basurero de Escritorio",
          descripcion: "Mini contenedor para papelitos y residuos pequeños con tapa abatible. Diseño minimalista que se integra en cualquier escritorio de oficina o estudio.",
          imagen: "images/basurero-escritorio.png",
          filamento: [],
          destacado: false
        },
        {
          id: "basurero-escritorio-mini",
          nombre: "Basurero de Escritorio Mini",
          descripcion: "Versión compacta del basurero de escritorio para espacios reducidos. Tapa con bisagra, acabado mate y capacidad ideal para clips, residuos de papel y objetos pequeños.",
          imagen: "images/basurero-escritorio-mini.png",
          filamento: [],
          destacado: false
        },
        {
          id: "basurero-auto",
          nombre: "Basurero Portátil para Auto",
          descripcion: "Contenedor colgante que se engancha en la guantera o visera del auto. Tapa con cierre hermético anti-olores, Impermeable y fácil de limpiar. Ideal para viajes largos.",
          imagen: "images/basurero-auto.png",
          filamento: [],
          destacado: false
        },
        {
          id: "basurero-auto2",
          nombre: "Basurero Portátil para Auto Premium",
          descripcion: "Versión premium con cierre hermético reforzado, asa de transporte y acabado texturizado. Capacidad mayor y diseño ergonómico que se adapta a cualquier modelo de vehículo.",
          imagen: "images/basurero-auto2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "organizador-escritorio",
          nombre: "Organizador de Escritorio Multi-compartimento",
          descripcion: "Caja organizadora con múltiples compartimentos para lápices, clips, notas adhesivas y accesorios. Diseño modular apilable con acabado mate y esquinas redondeadas.",
          imagen: "images/organizador-escritorio.png",
          filamento: [],
          destacado: false
        },
        {
          id: "organizador-maquillaje",
          nombre: "Organizador de Maquillaje Giratorio",
          descripcion: "Torre giratoria con múltiples niveles para cosméticos, pinceles y accesorios. Base rotativa de 360° con compartimentos escalonados y acabado elegante.",
          imagen: "images/organizador-maquillaje.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-celular",
          nombre: "Soporte para Celular Ajustable",
          descripcion: "Base estable con soporte regulable en ángulo para smartphones. Alcohróndico antideslizante, plegable para transportar y compatible con todos los tamaños de pantalla.",
          imagen: "images/soporte-celular.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-celular2",
          nombre: "Soporte para Celular Ergonómico",
          descripcion: "Soporte con diseño ergonómico inclinado para ver contenido sin cargar el cuello. Base antideslizante reforzada, ranura para cable de carga y acabado premium.",
          imagen: "images/soporte-celular2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-notebook",
          nombre: "Soporte para Notebook Elevado",
          descripcion: "Elevador ergonómico que mejora la ventilación del portátil y la postura al trabajar. Ajustable en altura y ángulo, plegable y resistente con base antideslizante.",
          imagen: "images/soporte-notebook.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-notebook2",
          nombre: "Soporte para Notebook Compacto",
          descripcion: "Soporte plegable ultra compacto que cabe en cualquier mochila. Eleva la pantalla del notebook para una postura ergonómica, material resistente y diseño minimalista.",
          imagen: "images/soporte-notebook2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-monitor",
          nombre: "Elevador de Monitor / Pantalla",
          descripcion: "Base elevadora para monitores de escritorio que mejora la ergonomía visual. Superficie amplia antideslizante, diseño robusto y acabado elegante que combina con cualquier setup.",
          imagen: "images/soporte-monitor.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-auto-celular",
          nombre: "Soporte para Celular de Auto",
          descripcion: "Soporte手机 con ventosa que se fija al parabrisas o dashboard. Compatible con smartphones de todos los tamaños, rotación 360° y brazo ajustable.",
          imagen: "images/soporte-auto-celular.png",
          filamento: [],
          destacado: false
        },
        {
          id: "soporte-celular-inferior",
          nombre: "Soporte Celular Compartimiento Inferior",
          descripcion: "Soporte de celular con compartimiento oculto en la base para guardar accesorios, auriculares o dinero. Diseño discreto multifuncional.",
          imagen: "images/soporte-celuar-compartimientoinferior.png",
          filamento: [],
          destacado: false
        },
        {
          id: "jabonera-desague",
          nombre: "Jabonera con Desagüe",
          descripcion: "Jabonera auto-drenante con superficie elevada y canaleta de escurrimiento que mantiene el jabón seco. Diseño higiénico con acabado mate antideslizante.",
          imagen: "images/jabonera-desague.png",
          filamento: [],
          destacado: false
        },
        {
          id: "escurre-verduras",
          nombre: "Escurre Verduras y Frutas",
          descripcion: "Colador/escurridor para lavar verduras y frutas con asas ergonómicas. Superficie perforada que drena el agua rápidamente, compacto y fácil de guardar.",
          imagen: "images/escurre-verdura-fruta.png",
          filamento: [],
          destacado: false
        },
        {
          id: "divisor-platos",
          nombre: "Divisor de Platos / Organizador de Vajilla",
          descripcion: "Separador vertical para organizar platos, bandejas y tápers en alacenas. Estructura estable que permite apilar sin que se rocen, ahorra espacio y protege los platos.",
          imagen: "images/divisor-platos.png",
          filamento: [],
          destacado: false
        },
        {
          id: "compartimiento-huevos",
          nombre: "Compartimiento para Huevos",
          descripcion: "Bandejita organizadora para guardar huevos en la heladera de forma segura. Ranuras individuales que evitan que se rompan, diseño apilable y compacto.",
          imagen: "images/compartimiento-huevos.png",
          filamento: [],
          destacado: false
        },
        {
          id: "compartimiento-huevos2",
          nombre: "Compartimiento para Huevos Versión 2",
          descripcion: "Segunda versión del organizador de huevos con capacidad ampliada y cierre superior. Mayor protección, diseño mejorado para heladeras grandes.",
          imagen: "images/compartimiento-huevos2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "lampara-escritorio",
          nombre: "Lámpara de Escritorio 3D",
          descripcion: "Lámpara decorativa con pantalla impresa en 3D que proyecta patrones de luz suave. Base estable, ideal para ambientes de estudio o dormitorio.",
          imagen: "images/lampara.png",
          filamento: [],
          destacado: false
        },
        {
          id: "lampara-luna",
          nombre: "Lámpara Luna 3D",
          descripcion: "Réplica detallada de la luna con textura realista impresa en 3D. Iluminación cálida ambiental, base elegante y efecto luminoso que embellece cualquier espacio.",
          imagen: "images/lampara-luna.png",
          filamento: [],
          destacado: false
        },
        {
          id: "lampara-variedad",
          nombre: "Lámpara Decorativa Variedad",
          descripcion: "Colección de lámparas decorativas con diseños variados y modernos. Cada modelo con patrón de luz único, impresas en 3D con acabado premium.",
          imagen: "images/lampara-variedad.png",
          filamento: [],
          destacado: false
        },
        {
          id: "maceta-funcional",
          nombre: "Maceta Funcional 3D",
          descripcion: "Maceta con sistema de drenaje integrado y diseño moderno. Impermeable, resistente a UV, disponible en varios tamaños para plantas de interior o exterior.",
          imagen: "images/maceta1.png",
          filamento: [],
          destacado: false
        },
        {
          id: "maceta-cuadrada",
          nombre: "Maceta Cuadrada Decorativa",
          descripcion: "Maceta de diseño cuadrado con texturas geométricas impresas en 3D. Sistema de riego por reserva integrado, ideal para suculentas y cactuses.",
          imagen: "images/maceta2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "maceta-colgante",
          nombre: "Maceta Colgante 3D",
          descripcion: "Maceta colgante con soporte integrado para colgar en paredes o techos. Diseño liviano pero resistente, ideal para plantas trepadoras y decoración vertical.",
          imagen: "images/maceta3.png",
          filamento: [],
          destacado: false
        },
        {
          id: "maceta-moderna",
          nombre: "Maceta Estilo Moderno",
          descripcion: "Maceta con diseño contemporáneo y líneas limpias. Acabado mate en tonos neutros, base compartida para drenaje, perfecta para interiores modernos.",
          imagen: "images/maceta4.png",
          filamento: [],
          destacado: false
        },
        {
          id: "lavajilla-comida",
          nombre: "Lavajilla Tipo Comida / Desperdicios",
          descripcion: "Colador de desechos para lavabo con forma temática divertida. Filtro retenedor de residuos, fácil de limpiar y compatible con desagües estándar.",
          imagen: "images/lavajilla-comida-desperdicios.png",
          filamento: [],
          destacado: false
        },
        {
          id: "cerradura-paquetes",
          nombre: "Cerradura para Paquetes / buzón seguro",
          descripcion: "Mecanismo de cierre seguro para buzones o cajas de paquetes. Sistema de pestillo reforzado que protege las entregas de delivery en tu casa.",
          imagen: "images/cerradura-paquetes.png",
          filamento: [],
          destacado: false
        }
      ]
    },
    {
      id: "cajas-cestas",
      nombre: "Cajas y Cestas",
      orden: 7,
      productos: [
        {
          id: "cesta-regalo",
          nombre: "Cesta de Regalo Circular",
          descripcion: "Cesta redonda tejida en filamento con asa elevada y acabado rústico. Ideal para armar gift baskets con dulces, cosméticos o cualquier sorpresa personalizada.",
          imagen: "images/cesta-regalo.png",
          filamento: [],
          destacado: false
        },
        {
          id: "cesta-regalo2",
          nombre: "Cesta de Regalo Cuadrada",
          descripcion: "Cesta cuadrada con borde reforzado y asa plegable. Diseño tejido detallado, fondo estable y capacidad amplia para presentar regalos con estilo.",
          imagen: "images/cesta-regalo2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-corazon",
          nombre: "Caja Regalo Corazón 3D",
          descripcion: "Caja con forma de corazón con tapa abatible y relieve tridimensional. Perfecta para San Valentín, cumpleaños o detalles románticos con acabado brillante en tonos rosa.",
          imagen: "images/caja-regalo-corazon.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-corazon2",
          nombre: "Caja Regalo Corazón Doble Capa",
          descripcion: "Versión mejorada con doble pared decorativa y cierre magnético oculto. Interior amplio con acabado satinado, ideal para joyas o chocolates artesanales.",
          imagen: "images/caja-regalo-corazon2.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-minecraft",
          nombre: "Caja Regalo Corazón Minecraft",
          descripcion: "Caja con forma de corazón estilo pixel-art inspirada en Minecraft. Tapa con diseño de corazón del juego, cierre a presión y interior forrado. Para fans del juego.",
          imagen: "images/caja-regalo-corazonminecraft.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-mini-regalo",
          nombre: "Caja Mini Regalo Corazón",
          descripcion: "Cajita compacta con forma de corazón para detalles pequeños. Tapa con relieve, cierre a presión y acabado en tonos pastel. Ideal para anillos, aretes o Dulces.",
          imagen: "images/cajamini-regalo-corazon.png",
          filamento: [],
          destacado: false
        },
        {
          id: "caja-pascuas",
          nombre: "Caja Sorpresa de Pascuas",
          descripcion: "Huevo gigante articulado que se abre para revelar un compartimento interior con sorpresa. Decorado con motivos de primavera y colores festivos, ideal para regalar en Semana Santa.",
          imagen: "images/caja-pascuas.png",
          filamento: [],
          destacado: false
        }
      ]
    }
  ],
  version: "1.1.0",
  ultimaActualizacion: new Date().toISOString()
};
