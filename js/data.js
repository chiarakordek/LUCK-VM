const CATALOGO_DATA = {
  secciones: [
    {
      id: "juegos-mesa",
      nombre: "Juegos de Mesa & Accesorios Gaming",
      orden: 1,
      productos: [
        {
          id: "caja-pokemon",
          nombre: "Caja Porta Cartas Pokémon (Deck Box)",
          tag: "TCG • Coleccionables & Protección",
          descripcionCorta: "Contenedor temático de alta resistencia diseñado con tapa en relieve de Pikachu y Pokébola.",
          descripcionCompleta: "Contenedor temático de alta resistencia diseñado con tapa en relieve de Pikachu y Pokébola. Ideal para organizar, transportar y proteger mazos contra golpes y polvo.",
          caracteristicas: "Cierre con trabas reforzadas tipo clip, bisagras articuladas y capacidad óptima con o sin sleeves.",
          imagen: "images/caja-pokemon.jpeg",
          colores: ["Azul", "Rojo", "Negro"],
          destacado: false
        },
        {
          id: "tetris-balance",
          nombre: "Tetris Balance 3D",
          tag: "Destreza & Equilibrio",
          descripcionCorta: "Desafiante juego de pulso y visión espacial con bloques geométricos sobre base oscilante.",
          descripcionCompleta: "Desafiante juego de pulso y visión espacial. Los participantes apilan bloques geométricos sobre una base curva oscilante sin derribarla.",
          caracteristicas: "Se tira el dado y se coloca la pieza correspondiente. Si la estructura cae, se pierde la ronda.",
          imagen: "images/equilibrio-tetris.png",
          colores: ["Multicolor"],
          destacado: false
        },
        {
          id: "arbol-monos",
          nombre: "Árbol de Monos en Equilibrio",
          tag: "Familiar & Motricidad",
          descripcionCorta: "Juego interactivo y dinámico donde la copa hexagonal del árbol se balancea constantemente.",
          descripcionCompleta: "Juego interactivo y dinámico donde la copa hexagonal del árbol se balancea constantemente, obligando a calcular el peso con precisión.",
          caracteristicas: "Por turnos, se tira el dado y se colocan monitos según el número obtenido sin voltear la base.",
          imagen: "images/equilibrio-monos.png",
          colores: ["Verde", "Marrón"],
          destacado: false
        },
        {
          id: "torre-pagoda",
          nombre: "Torre Pagoda Jinja",
          tag: "Estrategia & Precisión",
          descripcionCorta: "Inspirada en la arquitectura tradicional oriental. Estructura de varios pisos con columnas removibles.",
          descripcionCompleta: "Inspirada en la arquitectura tradicional oriental. Estructura de varios pisos sostenida por columnas removibles.",
          caracteristicas: "El dado indica qué columna retirar por turno. Gana quien logre sacarlas con mayor pulso sin tirar la torre.",
          imagen: "images/equilibrio-jinja.png",
          colores: ["Rojo", "Dorado"],
          destacado: false
        },
        {
          id: "memotest-bananas",
          nombre: "Memotest Isla Banana",
          tag: "Memoria & Concentración",
          descripcionCorta: "Juego de memoria espacial con temática tropical y palmera central, con bananas encastrables.",
          descripcionCompleta: "Juego de memoria espacial con temática tropical y palmera central, con bananas encastrables y colores ocultos.",
          caracteristicas: "Se tira el dado de color y se levanta una banana. Si coincide el color es punto; si no, se devuelve a la base.",
          imagen: "images/memoria-bananas.png",
          colores: ["Amarillo", "Verde"],
          destacado: false
        },
        {
          id: "huerta-memoria",
          nombre: "Huerta de Memoria (Carrot Pop)",
          tag: "Memoria & Cosecha",
          descripcionCorta: "Bancal de cultivo circular con mini zanahorias que estimula la retención visual.",
          descripcionCompleta: "Bancal de cultivo circular con mini zanahorias que estimula la retención visual y el reconocimiento de patrones de forma lúdica.",
          caracteristicas: "Cada zanahoria oculta un color en la base. El dado indica cuál cosechar. Gana quien acumule más aciertos.",
          imagen: "images/memoria-zanahoria.png",
          colores: ["Naranja", "Verde"],
          destacado: false
        }
      ]
    },
    {
      id: "llaveros-fidget",
      nombre: "Llaveros Fidget & Clickers Sensoriales",
      orden: 2,
      productos: [
        {
          id: "llavero-chocolate",
          nombre: "Llavero Puzzle Barra de Chocolate",
          tag: "Llavero Puzzle",
          descripcionCorta: "Llavero articulado y ensamblable con diseño de tableta mordida para desestresarse.",
          descripcionCompleta: "Llavero articulado y ensamblable con diseño de tableta mordida. Las piezas encajan entre sí para desestresarse en cualquier lugar.",
          caracteristicas: "Acabado símil chocolate, encastre suave, herraje reforzado y portabilidad total.",
          imagen: "images/fidget-chocolate.png",
          colores: ["Marrón chocolate"],
          destacado: false
        },
        {
          id: "llavero-tnt",
          nombre: "Llavero Caja TNT Clicker",
          tag: "Llavero Gamer Fidget",
          descripcionCorta: "Bloque cúbico pixel-art estilo dinamita con switch mecánico táctil ultra satisfactorio.",
          descripcionCompleta: "Bloque cúbico pixel-art estilo dinamita con tapa removible que oculta un switch mecánico táctil ultra satisfactorio.",
          caracteristicas: "Switch tipo Blue con sonido click acústico y pulsación continua adictiva.",
          imagen: "images/fidget-minecraft.png",
          colores: ["Rojo", "Verde"],
          destacado: false
        },
        {
          id: "pad-fidget-9",
          nombre: "Pad Fidget 9 Teclas Mecánicas",
          tag: "Fidget Tester Portátil",
          descripcionCorta: "Base ergonómica con 9 teclas activas en tono pastel para disfrutar la sensación de un teclado mecánico.",
          descripcionCompleta: "Base ergonómica con 9 teclas activas en tono pastel, diseñada para quienes disfrutan de la sensación rítmica y táctil de un teclado mecánico.",
          caracteristicas: "Keycaps suaves al tacto, switches individuales y formato compacto antiestrés.",
          imagen: "images/fidget-teclado.png",
          colores: ["Pastel multicolor"],
          destacado: false
        },
        {
          id: "llaveros-dumpling",
          nombre: "Llaveros Dumpling Baozi Kawaii",
          tag: "Llavero Kawaii",
          descripcionCorta: "Bollitos al vapor en su vaporera asiática con pulsador interno elástico para rebote suave.",
          descripcionCompleta: "Bollitos al vapor dentro de su vaporera asiática tradicional, con pulsador interno elástico para un rebote suave al presionarlos.",
          caracteristicas: "Gama en tonos pastel (lila, vainilla, menta, celeste, blanco), caritas grabadas y cadena incluida.",
          imagen: "images/fidget-dumpling.png",
          colores: ["Lila", "Vainilla", "Menta", "Celeste", "Blanco"],
          destacado: false
        },
        {
          id: "paleta-6-teclas",
          nombre: "Llavero Paleta 6 Teclas Clicker",
          tag: "Llavero Fidget",
          descripcionCorta: "Formato de bolsillo con 6 interruptores mecánicos con mini íconos en relieve.",
          descripcionCompleta: "Formato de bolsillo con 6 interruptores mecánicos independientes decorados con mini íconos en relieve (patitas, florcitas y teclas lisas).",
          caracteristicas: "Pulsación ligera, cadenita metálica para colgar y acabado pastel multicolor.",
          imagen: "images/fidget-teclado2.png",
          colores: ["Pastel multicolor"],
          destacado: false
        },
        {
          id: "patita-michi",
          nombre: "Llaveros Patita de Michi Clicker",
          tag: "Llavero Cute & Táctil",
          descripcionCorta: "Huellitas felinas 3D con almohadillas texturizadas y switch mecánico de alto rendimiento.",
          descripcionCompleta: "Huellitas felinas 3D con almohadillas texturizadas y switch mecánico de alto rendimiento para cliquear sin parar.",
          caracteristicas: "Diseño ergonómico, combinaciones bitono y argolla metálica resistente.",
          imagen: "images/fidget-patitas.png",
          colores: ["Rosa", "Gris"],
          destacado: false
        },
        {
          id: "creeper-clicker",
          nombre: "Creeper Clicker Fidget",
          tag: "Fidget Gamer",
          descripcionCorta: "Figura táctil del clásico personaje de bloques con respuesta mecánica firme.",
          descripcionCompleta: "Figura táctil del clásico personaje de bloques. Al presionar su cabeza hacia abajo se obtiene una respuesta mecánica firme con retorno automático.",
          caracteristicas: "Textura pixelada en verde vibrante, resorte interno de larga vida útil y base estable.",
          imagen: "images/fidget-minecraft2.png",
          colores: ["Verde"],
          destacado: false
        },
        {
          id: "engranaje-roller",
          nombre: "Engranaje Doble Rodillo (Gear Roller)",
          tag: "Llavero / Fidget Cinético",
          descripcionCorta: "Dos cilindros dentados sincronizados que giran con fluidez entre los dedos.",
          descripcionCompleta: "Dos cilindros dentados sincronizados que giran con fluidez entre los dedos, ofreciendo un masaje sensorial relajante y silencioso.",
          caracteristicas: "Ayuda a aliviar la ansiedad, promueve la concentración al estudiar y libera tensión en las manos.",
          imagen: "images/engranaje-roller.png",
          colores: ["Negro", "Dorado"],
          destacado: false
        },
        {
          id: "estrella-espiral",
          nombre: "Estrella Geométrica Espiral",
          tag: "Fidget Visual & Kinético",
          descripcionCorta: "Anillos concéntricos en forma de estrella que se despliegan telescópicamente con efecto hipnótico.",
          descripcionCompleta: "Estructura de anillos concéntricos en forma de estrella que se despliegan telescópicamente creando un efecto visual hipnótico.",
          caracteristicas: "Impreso en filamento bicromático tornasolado, ideal como pieza decorativa y desestresante manual.",
          imagen: "images/estrella-espiral.png",
          colores: ["Tornasol"],
          destacado: false
        },
        {
          id: "cubo-infinito",
          nombre: "Cubo Infinito Texturizado (Infinity Cube)",
          tag: "Llavero / Fidget Articulado",
          descripcionCorta: "Ocho cubos ensamblados con bisagras de precisión que se pliegan y despliegan de forma continua.",
          descripcionCompleta: "Ocho cubos ensamblados con bisagras de precisión que se pliegan y despliegan de forma continua en cualquier dirección.",
          caracteristicas: "Superficie antideslizante con textura táctil, giro silencioso apto para oficinas o clases.",
          imagen: "images/cubo-infinito.png",
          colores: ["Negro", "Blanco", "Dorado"],
          destacado: false
        }
      ]
    },
    {
      id: "coleccion-gastronomica",
      nombre: "Colección Gastronómica & Sensorial",
      orden: 3,
      productos: [
        {
          id: "medialuna-flexible",
          nombre: "Medialuna / Croissant Flexible",
          tag: "Flexible & Divertido",
          descripcionCorta: "Reproducción segmentada que se ondula y flexiona de manera fluida gracias a sus uniones internas.",
          descripcionCompleta: "Reproducción segmentada de una medialuna dorada que se ondula y flexiona de manera fluida gracias a sus uniones internas.",
          caracteristicas: "Tono manteca tostado brillante con textura segmentada sumamente satisfactoria al tacto.",
          imagen: "images/medialunas.png",
          colores: ["Manteca"],
          destacado: false
        },
        {
          id: "taza-magica",
          nombre: "Taza Mágica con Chorro de Café Flotante",
          tag: "Decoración & Ilusión Óptica",
          descripcionCorta: "Escultura suspendida que recrea el vertido dinámico de café mediante una cascada articulada.",
          descripcionCompleta: "Escultura suspendida en el aire que recrea el vertido dinámico de café líquido mediante una cascada articulada segmentada.",
          caracteristicas: 'Grabado lateral "Relax", ideal para ambientar escritorios y rincones de café modernos.',
          imagen: "images/cafe.png",
          colores: ["Marrón", "Blanco"],
          destacado: false
        },
        {
          id: "set-gourmet",
          nombre: "Set Gourmet Sensorial: Pasta, Salsa & Tomates",
          tag: "Set Interactivo & Mecanismo Espiral",
          descripcionCorta: "Colección gastronómica interactiva con bowl, pasta, fideos, tenedor y tomates antiestrés.",
          descripcionCompleta: "Colección gastronómica interactiva. Incluye bowl con pasta Rotini, fideos con salsa, tenedor, paquete, frasco con relieve y tomates antiestrés.",
          caracteristicas: "Tomates con mecanismo helicoidal de rosca giratoria ascendente y fideos modulares con texturas táctiles.",
          imagen: "images/pasta1.png",
          colores: ["Rojo", "Amarillo"],
          destacado: true
        },
        {
          id: "huevo-frito",
          nombre: "Huevo Frito Flexible Articulado",
          tag: "Flexible & Táctil",
          descripcionCorta: "Diseño segmentado en cuadrícula flexible que se dobla y amolda como una lámina elástica.",
          descripcionCompleta: "Diseño segmentado en cuadrícula flexible. Al levantarlo de la superficie se dobla y amolda como una lámina elástica.",
          caracteristicas: "Clara blanca brillante con yema en relieve biselado y movimiento maleable relajante.",
          imagen: "images/huevo.png",
          colores: ["Blanco", "Amarillo"],
          destacado: false
        },
        {
          id: "pata-pollo",
          nombre: "Pata de Pollo con Escalera Desplegable",
          tag: "Mecánico & Oculto",
          descripcionCorta: "Simula una presa crujiente que despliega una escalera telescópica oculta en su interior.",
          descripcionCompleta: "Pieza que simula una presa de pollo crujiente que, al deslizar el hueso, despliega una escalera telescópica oculta en su interior.",
          caracteristicas: "Mecanismo deslizante de ajuste preciso, acabado bitono y efecto sorpresa dinámico.",
          imagen: "images/pollo.png",
          colores: ["Dorado", "Marrón"],
          destacado: false
        },
        {
          id: "choclo-sensorial",
          nombre: "Choclo / Mazorca Sensorial Flexible",
          tag: "Acupresión & Masaje",
          descripcionCorta: "Mazorca ergonómica con granos articulados independientes que se mueven al deslizar los dedos.",
          descripcionCompleta: "Mazorca ergonómica compuesta por decenas de granos articulados independientes que se mueven al deslizar los dedos o apretar.",
          caracteristicas: "Estimulación táctil estilo acupresión para relajar la palma y liberar tensión muscular.",
          imagen: "images/choclo.png",
          colores: ["Amarillo", "Verde"],
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
          id: "poke-box-mini",
          nombre: "Poke Box Mini",
          tag: "Pokémon • Almacenamiento",
          descripcionCorta: "Caja compacta para guardar cartas Pokémon coleccionables.",
          descripcionCompleta: "Caja compacta diseñada para almacenar y proteger cartas Pokémon coleccionables. Tamaño ideal para llevar en la mochila.",
          caracteristicas: "Capacidad para 50+ cartas, cierre seguro, material resistente.",
          imagen: "images/poke-box-mini.png",
          colores: [],
          destacado: false
        },
        {
          id: "poke-box-standard",
          nombre: "Poke Box Standard",
          tag: "Pokémon • Almacenamiento",
          descripcionCorta: "Caja mediana con espacio para mazos completos y cartas sueltas.",
          descripcionCompleta: "Caja mediana con espacio para mazos completos y cartas sueltas. Divisorios internos para organizar por rareza o tipo.",
          caracteristicas: "Capacidad para 150+ cartas, divisorios ajustables, cierre con traba.",
          imagen: "images/poke-box-standard.png",
          colores: ["Rojo", "Negro"],
          destacado: false
        },
        {
          id: "poke-box-pro",
          nombre: "Poke Box Pro",
          tag: "Pokémon • Almacenamiento Premium",
          descripcionCorta: "Caja premium con tapa transparente para exhibir tus cartas favoritas.",
          descripcionCompleta: "Caja premium con tapa transparente para exhibir tus cartas favoritas. Diseño premium con acabados detallados y protección UV.",
          caracteristicas: "Capacidad para 300+ cartas, tapa transparente, protección UV, cierre magnético.",
          imagen: "images/poke-box-pro.png",
          colores: ["Azul", "Rojo"],
          destacado: false
        }
      ]
    }
  ],
  version: "1.0.0",
  ultimaActualizacion: new Date().toISOString()
};
