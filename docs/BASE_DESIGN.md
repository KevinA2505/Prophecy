# Prophecy of the Outer Realms – 2D Space Game (Base Design)

Este documento define las bases del proyecto para un juego 2D estilo “No Man’s Sky simplificado”, centrado en exploración espacial, facciones y comercio, desarrollado usando VSCode y tecnologías web.

Está pensado para servir como guía inicial y documentación para herramientas de IA (Codex, Claude Code, etc.) trabajando desde GitHub.

---

## Índice

1. [Visión general del juego](#visión-general-del-juego)
2. [Características principales](#características-principales)
3. [Tecnologías y stack](#tecnologías-y-stack)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Diseño de sistemas](#diseño-de-sistemas)
   - [Creación de personaje](#creación-de-personaje)
   - [Facciones](#facciones)
   - [Universo y generación de sistemas](#universo-y-generación-de-sistemas)
   - [Escena de planeta (PlanetScene)](#escena-de-planeta-planetscene)
   - [Escena de espacio (SpaceScene)](#escena-de-espacio-spacescene)
   - [Naves y equipo](#naves-y-equipo)
   - [Nave inicial gratuita](#nave-inicial-gratuita)
   - [Guardado y carga](#guardado-y-carga)
6. [Trabajo sin assets](#trabajo-sin-assets)
7. [Hoja de ruta de desarrollo](#hoja-de-ruta-de-desarrollo)
8. [Ideas futuras](#ideas-futuras)

---

## Visión general del juego

Juego 2D top-down centrado en:

- Exploración del cosmos en una **nave espacial**.  
- **Facciones** que dominan diferentes partes del universo.  
- Visita de **planetas colonizados** y sus ciudades.  
- Comercio con **bots inteligentes** y estructuras espaciales.  
- Universo con **sistemas estelares, asteroides, estructuras de facciones y enemigos** generado de forma sistemática o pseudo-aleatoria.

Flujo básico:

1. El jugador crea un personaje (humano, robot o alienígena), asigna nombre, género y una **facción**.
2. El juego comienza en un **planeta colonizado por esa facción**.
3. En el planeta se pueden visitar ciudades, comerciar y reclamar una **nave inicial gratuita**.
4. Con la nave se accede al **espacio**, donde se exploran sistemas, se interactúa con facciones y se combate si es necesario.
5. Las naves tienen **armas** y **espacio de carga** para ítems.

---

## Características principales

- 2D top-down, estilo “NMS muy simplificado”.
- Creación de personaje con:
  - Especie: humano / robot / alien.
  - Género.
  - Nombre.
  - Facción inicial.
- Facciones con territorios, estaciones y estructuras.
- Universo con:
  - Sistemas estelares.
  - Planetas (habitable, árido, gaseoso, etc.).
  - Campos de asteroides.
  - Estructuras de facciones y enemigos.
- Planetas colonizados:
  - Ciudades representadas en 2D.
  - Bots comerciantes.
  - Hangar para adquirir o gestionar naves.
- Espacio:
  - Movimiento de nave con rotación y aceleración.
  - Combate con proyectiles.
  - Comercio y atraque en estaciones.
- Sin assets gráficos iniciales: uso de figuras geométricas y texto.

---

## Tecnologías y stack

Desarrollo centrado en **VSCode**.

- **Lenguaje:** TypeScript  
- **Framework 2D:** Phaser 3 (HTML5)  
- **Entorno de ejecución:** Navegador (PC como objetivo inicial)  
- **Herramientas de build:**
  - Node.js + npm
  - Vite (sugerido) o Webpack como bundler / dev server
- **Editor:** VSCode

Objetivo: un proyecto que pueda ser compilado y servido con `npm run dev` y listo para iterar rápidamente.

---

## Estructura del proyecto

Estructura propuesta:

```text
 tu-juego/
   package.json
   vite.config.ts
   tsconfig.json
   public/
   src/
     main.ts                     // Entrada principal del juego (boot de Phaser)
     core/
       GameConfig.ts             // Configuración global de Phaser, tamaños, etc.
       SceneKeys.ts              // Enumeración de nombres de escenas
       GameState.ts              // Estado global compartido (jugador, universo, etc.)
     scenes/
       BootScene.ts              // Carga inicial mínima
       MainMenuScene.ts          // Menú principal
       CharacterCreationScene.ts // Creación de personaje
       PlanetScene.ts            // Exploración de planeta
       SpaceScene.ts             // Nave en espacio y combate
     game/
       factions.ts               // Datos y tipos de facciones
       universeGenerator.ts      // Generación de sistemas estelares y planetas
       Universe.ts               // Clase para gestionar el universo
       entities/
         Player.ts               // Lógica del jugador (perfil)
         Ship.ts                 // Modelos de naves
         Planet.ts               // Modelo de planeta
         StarSystem.ts           // Modelo de sistema estelar
         Station.ts              // Estaciones / estructuras
         Item.ts                 // Ítems, commodities, armas, etc.
         Weapon.ts               // Armas de nave
     ui/
       components/               // Elementos de UI (menús básicos, paneles)
     assets/                     // Sprites, sonidos, etc. (vacío al inicio)
```

---

## Diseño de sistemas

### Creación de personaje
- Elección de especie, género y facción.
- Asignación de nombre.
- La facción inicial determina el planeta colonizado de inicio.

### Facciones
- Cada facción controla ciertas rutas, estaciones y sistemas.
- Diferencias de estética, color y estilo.

### Universo y generación de sistemas
- Universo 2D con sistemas estelares generados proceduralmente o a partir de una seed.
- Cada sistema contiene planetas y estructuras.

### Escena de planeta (PlanetScene)
- Representación simplificada de ciudad con hangar.
- Comercio básico con bots.

### Escena de espacio (SpaceScene)
- Control de nave con rotación y aceleración.
- Combate con proyectiles (placeholder al inicio).

### Naves y equipo
- Naves con slots de armas y carga.
- Mejora de armas, escudos y motores.

### Nave inicial gratuita
- Shuttle básico entregado en el hangar del planeta inicial.

### Guardado y carga
- Estado del jugador y universo se guarda localmente (localStorage o similar) para continuar.

---

## Trabajo sin assets
- Uso de texto y figuras geométricas para prototipo inicial.
- Se podrán incorporar sprites, sonidos y música posteriormente.

---

## Hoja de ruta de desarrollo
- **Fase 1:** Boot + Menú + Creación de personaje + Nave básica en planeta y espacio.
- **Fase 2:** Comercio y misiones sencillas.
- **Fase 3:** Combate con IA y facciones activas.
- **Fase 4:** Refinamiento visual y assets.

---

## Ideas futuras
- Multijugador cooperativo o competitivo.
- Eventos dinámicos en sistemas.
- Diplomacia avanzada entre facciones.
- Colonización de planetas por el jugador.
