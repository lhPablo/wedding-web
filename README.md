# Wedding Web

Aplicación web para gestionar las invitaciones de nuestra boda. Permite a los invitados confirmar asistencia, ver información del evento y contactar con los novios.

## Características

- **Sistema de acceso**: Dos niveles de acceso (completo y limitado) mediante códigos
- **Formulario de asistencia**: Confirmación de asistencia con opción de añadir acompañantes
- **Información del evento**: Ubicaciones de ceremonia y convite con enlaces a Google Maps
- **Transporte**: Información sobre los autobuses disponibles
- **FAQ**: Preguntas frecuentes sobre el evento
- **Contacto**: Información de contacto de los novios con enlace directo a WhatsApp
- **Animaciones**: Transiciones suaves entre páginas con efecto de nubes

## Tecnologías

- [Astro](https://astro.build/) - Framework web
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [CSS Modules](https://github.com/css-modules/css-modules) - Estilos encapsulados
- [Vitest](https://vitest.dev/) - Tests unitarios
- [Playwright](https://playwright.dev/) - Tests E2E

## Requisitos

- Node.js 20+
- npm 9+

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd wedding-web

# Instalar dependencias
npm install

# Instalar navegadores para Playwright (solo si vas a ejecutar tests E2E)
npx playwright install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Hashes SHA-256 de las contraseñas de acceso
PUBLIC_FULL_ACCESS_KEY_HASH=<hash-sha256>
PUBLIC_LIMITED_ACCESS_KEY_HASH=<hash-sha256>

# Contraseñas en texto plano (solo para tests E2E en desarrollo)
TEST_FULL_ACCESS_KEY=<contraseña>
TEST_LIMITED_ACCESS_KEY=<contraseña>
```

Para generar un hash SHA-256:

```javascript
const hash = await crypto.subtle.digest(
  'SHA-256',
  new TextEncoder().encode('tu-contraseña')
);
const hashHex = Array.from(new Uint8Array(hash))
  .map((b) => b.toString(16).padStart(2, '0'))
  .join('');
console.log(hashHex);
```

## Scripts disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo en http://localhost:4321

# Producción
npm run build        # Genera el build estático en ./dist
npm run preview      # Preview del build de producción

# Tests
npm run test         # Ejecuta tests unitarios en modo watch
npm run test:unit    # Ejecuta tests unitarios una vez
npm run test:e2e     # Ejecuta tests E2E
npm run test:e2e:ui  # Ejecuta tests E2E con interfaz visual
```

## Estructura del proyecto

```
src/
├── assets/          # Imágenes y recursos estáticos
├── components/
│   ├── cards/       # Componentes de tarjetas (Contact, Location, Expandable)
│   ├── forms/       # Formularios (Login, Asistencia)
│   ├── sections/    # Secciones de la página
│   └── ui/          # Componentes UI reutilizables
├── data/            # Datos estáticos (contactos, ubicaciones, FAQs)
├── layouts/         # Layouts de Astro
├── lib/             # Utilidades y constantes compartidas
├── pages/           # Páginas de la aplicación
├── styles/          # Estilos globales y variables CSS
└── types/           # Definiciones de tipos TypeScript

e2e/
├── fixtures/        # Datos de prueba para E2E
├── helpers/         # Funciones auxiliares para tests
└── *.spec.ts        # Tests E2E
```

## Despliegue

El proyecto genera archivos estáticos que pueden desplegarse en cualquier hosting:

```bash
npm run build
# Los archivos están en ./dist
```

Compatible con Vercel, Netlify, GitHub Pages, etc.

## Personalización

### Datos del evento

Edita los archivos en `src/data/`:

- `wedding.ts` - Información general de la boda
- `locations.ts` - Ubicaciones de ceremonia y convite
- `transports.ts` - Información de transporte
- `contacts.ts` - Datos de contacto de los novios
- `questions.ts` - Preguntas frecuentes

### Estilos

Las variables CSS están en `src/styles/variables.css`. Puedes modificar colores, fuentes y otros valores globales.

### Imágenes

Reemplaza las imágenes en `src/assets/` manteniendo los mismos nombres o actualiza las referencias en los archivos de datos.

## Licencia

Proyecto privado - Todos los derechos reservados
