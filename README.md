# Wedding Web

Aplicación web para gestionar las invitaciones de nuestra boda. Permite a los invitados confirmar asistencia, ver información del evento y contactar con los novios.

## 🧭 Contexto del proyecto

Esta aplicación web fue desarrollada para gestionar las invitaciones y confirmaciones de asistencia de nuestra boda.

Las plataformas existentes no se ajustaban a nuestras necesidades de personalización ni al nivel de control que queríamos sobre los invitados, por lo que se decidió desarrollar una solución a medida, priorizando:

- **Simplicidad para usuarios no técnicos** - Invitados de todas las edades sin conocimientos técnicos
- **Privacidad básica** - Que solo los invitados con el código puedan ver la información de la boda
- **Rendimiento y bajo mantenimiento** - Web rápida sin necesidad de gestión continua
- **Coste cero de infraestructura** - Hosting estático gratuito y backend serverless

Durante el desarrollo surgieron nuevos requisitos funcionales, como la necesidad de **limitar la opción de acompañante para determinados invitados**, lo que influyó en varias decisiones técnicas.

## 🏗️ Decisiones técnicas clave

### Astro como framework

Se optó por [Astro](https://astro.build/) para generar una web mayoritariamente estática. Aunque el proyecto incluye JavaScript para interactividad (formularios, animaciones, validaciones), Astro permite:

- Renderizado en tiempo de build para contenido estático
- Carga de JavaScript solo donde es necesario
- Excelente rendimiento en dispositivos móviles
- Simplicidad en el desarrollo sin frameworks pesados

### Control de acceso mediante códigos

En lugar de implementar un sistema de autenticación completo, se diseñó un sistema de acceso mediante **códigos compartidos por WhatsApp**.

Estos códigos permiten:

- **Acceso completo** - Con opción de añadir acompañante
- **Acceso limitado** - Sin opción de acompañante

El invitado no conoce la limitación, lo que permite gestionar restricciones sin fricción ni situaciones incómodas.

### Validación con hashes SHA-256

Los códigos se validan en cliente mediante hashes SHA-256 definidos en variables de entorno públicas.

Esto **no pretende ser un sistema de seguridad robusto**, sino un mecanismo de control de acceso suficiente para el contexto del proyecto, evitando accesos casuales no deseados antes del evento.

### Backend con Google Apps Script

Para la confirmación de asistencia se utilizó [Google Apps Script](https://developers.google.com/apps-script) conectado a Google Sheets, lo que permitió:

- Evitar mantener un backend propio
- Reducir costes a cero
- Garantizar fiabilidad y disponibilidad
- Fácil acceso a los datos para los novios

## ⚖️ Trade-offs y limitaciones

| Decisión               | Trade-off                                                           |
| ---------------------- | ------------------------------------------------------------------- |
| Validación en cliente  | No es seguridad real, pero suficiente para control de acceso social |
| Google Sheets como DB  | No escala, pero perfecto para ~150 invitados                        |
| Sin autenticación real | Menos fricción para usuarios no técnicos                            |
| JavaScript en cliente  | Necesario para UX (animaciones, formularios), pero minimizado       |

Estas decisiones se tomaron conscientemente para equilibrar **simplicidad, mantenimiento y requisitos reales** del proyecto.

### Privacidad de los datos de contacto

La web se usó en producción con los datos de contacto reales: los invitados necesitaban poder localizarnos, y ese dato formaba parte de la función.

Pasada la boda, esos datos se movieron a variables de entorno con valores anonimizados por defecto, de modo que la versión pública del repositorio no expone información personal:

- Los nombres y correos usan `example.com`, [dominio reservado por la IANA](https://www.rfc-editor.org/rfc/rfc2606) para documentación.
- Sin teléfono definido, la tarjeta de contacto omite la línea `tel:` y el botón de WhatsApp en lugar de mostrarlos deshabilitados.
- La lista de beneficiarios de la sección de regalo solo se renderiza si el entorno aporta los nombres.

El número de cuenta estuvo publicado únicamente durante las semanas previas al evento y se retiró al terminar. Como eliminarlo del código no lo borra del historial de Git, se purgó de todos los commits con `git filter-repo`.

## ✨ Características

- **Sistema de acceso**: Dos niveles de acceso (completo y limitado) mediante códigos
- **Formulario de asistencia**: Confirmación de asistencia con opción de añadir acompañantes
- **Información del evento**: Ubicaciones de ceremonia y convite con enlaces a Google Maps
- **Transporte**: Información sobre los autobuses disponibles
- **FAQ**: Preguntas frecuentes sobre el evento
- **Contacto**: Información de contacto con enlace directo a WhatsApp (omitido en la versión anonimizada)
- **Animaciones**: Transiciones suaves entre páginas con efecto de nubes
- **Responsive**: Optimizado para móvil, tablet y desktop

## 🧪 Testing

El proyecto incluye:

- **Tests unitarios** con [Vitest](https://vitest.dev/) para lógica de negocio y handlers
- **Tests E2E** con [Playwright](https://playwright.dev/), incluyendo flujos con distintos niveles de acceso

Esto permite validar los flujos críticos (acceso, confirmación de asistencia) y reducir regresiones.

## 🛠️ Tecnologías

- [Astro](https://astro.build/) - Framework web
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [CSS Modules](https://github.com/css-modules/css-modules) - Estilos encapsulados
- [Vitest](https://vitest.dev/) - Tests unitarios
- [Playwright](https://playwright.dev/) - Tests E2E
- [Google Apps Script](https://developers.google.com/apps-script) - Backend serverless

## 📋 Requisitos

- Node.js 20+
- npm 9+

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd wedding-web

# Instalar dependencias
npm install

# Instalar navegadores para Playwright (solo si vas a ejecutar tests E2E)
npx playwright install
```

## 🔐 Variables de entorno

El repositorio no incluye ningún `.env`, así que **para ejecutar el proyecto en local hay que crearlo**. Sin él no se puede acceder a la web: el formulario de login no tiene contra qué validar, y los tests E2E fallarán por el mismo motivo.

Crea un archivo `.env` en la raíz del proyecto:

```env
# Endpoint del Google Apps Script que recibe las confirmaciones.
# Sin definirlo, el formulario avisa de que no está configurado.
GOOGLE_SCRIPT_URL=<url-del-despliegue>

# Hashes SHA-256 de las contraseñas de acceso (obligatorias)
PUBLIC_FULL_ACCESS_KEY_HASH=<hash-sha256>
PUBLIC_LIMITED_ACCESS_KEY_HASH=<hash-sha256>

# Contraseñas en texto plano (solo para tests E2E en desarrollo)
TEST_FULL_ACCESS_KEY=<contraseña>
TEST_LIMITED_ACCESS_KEY=<contraseña>

# Datos de contacto (opcionales). Sin ellos la web se construye anonimizada:
# nombres genéricos, correos en example.com y sin teléfono ni WhatsApp.
GROOM_NAME=<nombre>
GROOM_EMAIL=<correo>
GROOM_PHONE=<teléfono>
BRIDE_NAME=<nombre>
BRIDE_EMAIL=<correo>
BRIDE_PHONE=<teléfono>

# Nombres legales para la lista de beneficiarios del regalo (opcionales).
# Sin ellos, esa lista no se renderiza.
GROOM_FULL_NAME=<nombre y apellidos>
BRIDE_FULL_NAME=<nombre y apellidos>
```

> Ninguna de las variables de contacto lleva el prefijo `PUBLIC_`, así que Astro las resuelve en tiempo de build y nunca las incluye en el bundle del cliente.

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

## 📜 Scripts disponibles

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

## 📁 Estructura del proyecto

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

## 🌐 Despliegue

El proyecto genera archivos estáticos que pueden desplegarse en cualquier hosting:

```bash
npm run build
# Los archivos están en ./dist
```

Actualmente desplegado en [Cloudflare Pages](https://pages.cloudflare.com/). Compatible también con Vercel, Netlify, GitHub Pages, etc.

## 🎨 Personalización

### Datos del evento

Edita los archivos en `src/data/`:

- `wedding.ts` - Información general de la boda (fecha, título, IBAN)
- `locations.ts` - Ubicaciones de ceremonia y convite
- `transports.ts` - Información de transporte
- `contacts.ts` - Datos de contacto de los novios
- `questions.ts` - Preguntas frecuentes
- `timer.ts` - Mensajes del countdown

### Estilos

Las variables CSS están en `src/styles/variables.css`. Puedes modificar colores, fuentes y otros valores globales.

### Imágenes

Reemplaza las imágenes en `src/assets/` manteniendo los mismos nombres o actualiza las referencias en los archivos de datos.

## 📄 Licencia

Proyecto privado - Todos los derechos reservados
