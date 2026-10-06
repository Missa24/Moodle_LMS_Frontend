# Elaces - LMS Frontend

Plataforma de aprendizaje en línea (Learning Management System) construida con React y TypeScript para la gestión de cursos, módulos, lecciones, estudiantes, compras, progreso, certificados y contenido público de Elaces.

---

## Tabla de contenido

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Variables de entorno](#variables-de-entorno)
- [Arquitectura](#arquitectura)
- [Autenticación y permisos](#autenticación-y-permisos)
- [Cursos, compras e inscripciones](#cursos-compras-e-inscripciones)
- [Certificados](#certificados)
- [Contenido público y SEO](#contenido-público-y-seo)
- [Rutas](#rutas)
- [Componentes reutilizables](#componentes-reutilizables)
- [Archivos públicos y Git LFS](#archivos-públicos-y-git-lfs)
- [Build y despliegue con Docker](#build-y-despliegue-con-docker)
- [Actualización en producción](#actualización-en-producción)
- [Buenas prácticas](#buenas-prácticas)

---

## Características

- Gestión de usuarios con roles y permisos.
- Autenticación JWT y cierre automático ante respuestas `401`.
- Cambio y restablecimiento de contraseña.
- Creación y edición de cursos con portada, categorías y estado de publicación.
- Organización de cursos en módulos y lecciones.
- Editor de contenido enriquecido con TipTap.
- Carga de videos para lecciones.
- Formularios, preguntas y opciones asociadas a lecciones.
- Recursos descargables y enlaces externos por lección.
- Inscripción de estudiantes a cursos y módulos.
- Seguimiento de progreso por lección, módulo y curso.
- Restricción opcional de lecciones según progreso anterior.
- Lecciones configurables como vista previa pública.
- Catálogo público de cursos y módulos.
- Compra de cursos y módulos.
- Gestión de precios, promociones y descuentos.
- Registro de ventas y comprobantes de pago.
- Soporte para QR de pago en Bolivia y medios de pago internacionales.
- Estados de compra visibles desde la interfaz.
- Certificados por módulo y por curso.
- Verificación pública de certificados mediante URL/QR.
- Tema claro/oscuro.
- Sitio público responsive con contenido institucional y promocional.
- SEO configurable mediante `react-helmet-async`.
- Interfaz completamente en español.

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | React 19 + TypeScript |
| Build | Vite / rolldown-vite |
| Estilos | Tailwind CSS v4 |
| Componentes UI | shadcn/ui + Radix UI |
| Iconos | Lucide React + FontAwesome |
| Estado global | Zustand con persistencia |
| Server state | TanStack React Query v5 |
| Data tables | TanStack React Table v8 |
| Formularios | React Hook Form + Zod |
| Editor rich text | TipTap v3 |
| HTTP client | Axios |
| Routing | React Router DOM v7 |
| Toasts | Sonner / React Toastify |
| Sanitización | DOMPurify |
| SEO | react-helmet-async |
| Animaciones puntuales | motion/react |
| Gráficos | Recharts |
| Testing | Vitest + Testing Library |
| Package manager | pnpm |

---

## Estructura del proyecto

```text
src/
├── api/                       # Instancia Axios e interceptores
├── assets/                    # Recursos importados por la aplicación
├── components/
│   ├── ui/                    # Componentes shadcn/ui
│   ├── common/                # Componentes reutilizables
│   ├── data-table/            # Tablas y paginación
│   ├── dashboard/             # Navegación del panel
│   ├── nav/                   # Header y navegación
│   └── Login/                 # Protección de rutas y logout
├── features/
│   ├── Auth/                  # Login y contraseña
│   ├── Usuario/               # Usuarios y perfiles
│   ├── Curso/                 # Cursos y categorías
│   ├── Modulo/                # Módulos
│   ├── Leccion/               # Lecciones, recursos y progreso
│   ├── FormularioLeccion/     # Formularios y preguntas
│   ├── Inscripciones/         # Inscripciones
│   ├── Progreso/              # Progreso académico
│   ├── Roles/                 # Roles y permisos
│   ├── Home/                  # Sitio público
│   └── Welcome/               # Inicio del dashboard
├── hooks/                     # Hooks compartidos
├── layouts/                   # RootLayout y DashboardLayout
├── lib/                       # Helpers y configuración
├── pages/                     # Páginas asociadas a rutas
├── routes/                    # Definición de rutas
├── store/                     # Zustand
└── utils/                     # Constantes, helpers y schemas
```

Cada feature mantiene, cuando aplica, una estructura similar a:

```text
features/<Nombre>/
├── Schema/        # Zod + tipos TypeScript
├── Service/       # Llamadas a la API
├── Hook/          # useQuery / useMutation
├── Components/    # Componentes del dominio
└── utils/         # Helpers específicos
```

---

## Instalación

### Requisitos

- Node.js 24 recomendado.
- pnpm 10.
- Backend de Elaces en ejecución.

### Clonar e instalar

```bash
git clone https://github.com/Missa24/Moodle_LMS_Frontend.git
cd Moodle_LMS_Frontend
pnpm install
```

### Variables de entorno locales

```env
VITE_API_URL=http://localhost:3000/api
VITE_SITE_URL=http://localhost:5173
```

Luego:

```bash
pnpm dev
```

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia Vite con HMR |
| `pnpm build` | Verifica TypeScript y genera el build |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm preview` | Previsualiza el build |
| `pnpm test` | Ejecuta Vitest en modo interactivo |
| `pnpm test:run` | Ejecuta los tests una vez |

---

## Variables de entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL base de la API | `http://localhost:3000/api` |
| `VITE_SITE_URL` | URL pública del frontend para SEO y enlaces absolutos | `http://localhost:5173` |

En producción:

```env
VITE_API_URL=/api
VITE_SITE_URL=https://dominio.com
```

> Las variables `VITE_*` se incorporan durante el build. Si cambian, se debe reconstruir el frontend.

---

## Arquitectura

### Flujo de datos

```text
Componente
   ↓
Hook de React Query
   ↓
Service
   ↓
Axios
   ↓
Backend NestJS
```

Las mutaciones invalidan las queries relacionadas para mantener la UI sincronizada con la API.

### Cliente HTTP

La instancia principal de Axios utiliza `VITE_API_URL` como `baseURL`.

El interceptor de request:

- Obtiene el token desde Zustand.
- No agrega autenticación cuando `skipAuth` está activo.
- Verifica si el JWT expiró.
- Agrega `Authorization: Bearer <token>` cuando corresponde.

El interceptor de response:

- Detecta respuestas `401`.
- Ejecuta `logout()` automáticamente.
- Permite omitir ese comportamiento con `skipAuthRedirect` cuando una petición lo necesita.

---

## Autenticación y permisos

### Roles principales

```text
ADMIN
ESTUDIANTE
```

El frontend muestra u oculta acciones de acuerdo con los permisos enviados por el backend.

El hook `usePermission()` permite validar permisos:

```tsx
const { can, canAny, canAll } = usePermission();

if (can(PERMISSIONS.CURSOS.CREAR)) {
    // Mostrar acción
}

canAny([
    PERMISSIONS.CURSOS.VER,
    PERMISSIONS.CURSOS.CREAR,
]);
```

El backend siempre es la fuente de verdad para autorización. Ocultar una opción en el frontend no reemplaza los guards y permisos del backend.

---

## Cursos, compras e inscripciones

El flujo principal de formación es:

```text
Curso
├── Módulos
│   └── Lecciones
├── Precio
├── Promociones
├── Estado de compra
├── Inscripción
├── Progreso
└── Certificación
```

### Módulos

Pueden contener:

- Imagen.
- Precio propio.
- Promoción.
- QR de pago.
- Certificación independiente.
- Visibilidad para estudiantes.

### Lecciones

Pueden contener:

- Nombre.
- Descripción.
- Contenido enriquecido.
- Video.
- Orden.
- Vista previa pública.
- Requisito de completar la lección anterior.
- Estado de publicación.

Cuando se modifica el orden de una lección, el backend reorganiza automáticamente las demás posiciones.

### Compras

El frontend muestra el estado de compra de cursos o módulos y utiliza datos históricos para conservar información relevante de la compra aunque el curso sea modificado posteriormente.

---

## Certificados

El sistema contempla certificados por módulo y por curso.

Desde el frontend se puede:

- Consultar certificados del estudiante.
- Acceder a certificados emitidos.
- Visualizar información del certificado.
- Abrir la URL pública de verificación.
- Mostrar el QR de verificación.

La verificación pública no requiere autenticación.

---

## Contenido público y SEO

`RootLayout` contiene la estructura global y puede envolver tanto páginas públicas como el dashboard autenticado.

Entre las áreas públicas pueden existir:

- Inicio.
- Catálogo de cursos.
- Detalle público de cursos.
- Detalle público de módulos.
- Contenido institucional.
- Testimonios.
- Secciones promocionales.
- Verificación de certificados.

El SEO utiliza `VITE_SITE_URL` para construir URLs absolutas y metadatos.

---

## Rutas

Las rutas pueden evolucionar con el proyecto. Entre las principales:

| Ruta | Descripción | Auth |
|------|-------------|:----:|
| `/` | Sitio público | No |
| `/login` | Inicio de sesión | No |
| `/cambiar-password` | Cambio de contraseña | Según flujo |
| `/inicio` | Dashboard | Sí |
| `/perfil` | Perfil | Sí |
| `/usuario` | Gestión de usuarios | Sí |
| `/usuario/:id` | Detalle de usuario | Sí |
| `/cursos` | Catálogo/listado de cursos | Depende de la vista |
| `/mis-cursos` | Cursos del estudiante | Sí |
| `/cursos/:id` | Detalle de curso | Depende de la vista |
| `/cursos/:id/modulos` | Módulos del curso | Según permisos |
| `/cursos/:id/modulos/:moduloId` | Detalle de módulo | Según permisos |
| `/cursos/:id/modulos/:moduleId/lecciones/:leccionId` | Lección | Según acceso |
| `/inscripciones` | Gestión de inscripciones | Sí |
| `/inscripciones/crear` | Crear inscripción | Sí |

---

## Componentes reutilizables

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `DataTable` | `components/data-table/` | Tabla con filtros, sorting y paginación |
| `FormField` | `components/common/form/` | Campo reutilizable para formularios |
| `EntityDialog` | `components/common/form/` | Diálogo genérico para CRUD |
| `ImageUpload` | `components/common/form/` | Carga de imágenes con preview |
| `QueryState` | `components/common/` | Estados de loading/error |
| `RichTextEditor` | `components/common/` | Editor TipTap |
| `Banner` | `components/common/` | Banner/hero reutilizable |
| `AppTitle` | `components/common/` | Título reutilizable |
| `ProtectedRoute` | `components/Login/` | Protección de rutas |
| `AppSidebar` | `components/dashboard/` | Sidebar según rol/permisos |
| `SEO` | `components/common/` | Metadatos SEO |

---

## Archivos públicos y Git LFS

Los videos grandes dentro de `public/`, especialmente testimonios, pueden administrarse con Git LFS.

Ejemplo:

```text
public/
└── testimonios/
    ├── primero.webm
    ├── primero.webp
    ├── tercero.webm
    └── tercero.webp
```

En un servidor nuevo:

```bash
sudo apt install -y git-lfs
git lfs install
git lfs pull
```

Verificar que los videos sean archivos reales:

```bash
ls -lh public/testimonios/primero.webm
```

Si el archivo pesa solo unos bytes y contiene:

```text
version https://git-lfs.github.com/spec/v1
```

es únicamente el puntero de LFS y todavía falta descargar el contenido real.

---

## Build y despliegue con Docker

El frontend utiliza un build multi-stage:

```text
Node 24
   ↓
pnpm install
   ↓
pnpm build
   ↓
dist/
   ↓
nginx:alpine
```

El contenedor final sirve archivos estáticos.

### Docker Compose

```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
    args:
      VITE_API_URL: /api
      VITE_SITE_URL: ${FRONTEND_URL}
  restart: unless-stopped
  ports:
    - "127.0.0.1:8080:80"
```

El frontend queda accesible únicamente desde el host del VPS.

### Nginx del host

```text
Internet
   ↓
Nginx host
   ├── /      → 127.0.0.1:8080
   └── /api/  → 127.0.0.1:3000
```

Ejemplo:

```nginx
server {
    listen 80;
    server_name _;

    client_max_body_size 500M;

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

`proxy_pass` del backend no termina en `/`, por lo que el prefijo `/api` se conserva.

---

## Actualización en producción

Para actualizar solo el frontend:

```bash
cd ~/lms-elite/frontend
git pull

git lfs pull

cd ~/lms-elite
sudo docker compose up -d --build frontend
```

Comprobar estado:

```bash
sudo docker compose ps
```

Comprobar el frontend desde el VPS:

```bash
curl -I http://127.0.0.1:8080
```

Una respuesta `HTTP/1.1 200 OK` confirma que el frontend está siendo servido correctamente.

---

## Buenas prácticas

- No almacenar credenciales ni secretos en el repositorio.
- No subir archivos `.env` de producción.
- Mantener `VITE_API_URL=/api` en producción cuando frontend y backend comparten origen.
- Reconstruir el frontend cuando cambien variables `VITE_*`.
- Usar React Query para estado proveniente del backend.
- Usar Zustand para estado global del cliente.
- Evitar `useEffect` cuando los datos pueden derivarse directamente de queries o props.
- Mantener la autorización real en el backend.
- No exponer puertos internos de Docker innecesariamente.
- Verificar Git LFS antes de construir en servidores nuevos.
- Ejecutar `pnpm build` antes de subir cambios importantes.
- Mantener componentes enfocados en una responsabilidad clara.
- Mantener diseño responsive y accesibilidad.

---

## Arquitectura de producción

```text
VPS Ubuntu
├── Nginx host
├── Docker Compose
│   ├── PostgreSQL
│   ├── Backend NestJS
│   └── Frontend React + Nginx
├── UFW
├── Fail2Ban
└── Backups de PostgreSQL
```

Actualmente el frontend y backend permanecen enlazados a `127.0.0.1` y Nginx es el punto de entrada público.

Cuando se configure un dominio:

1. Apuntar el DNS al VPS.
2. Actualizar `FRONTEND_URL` y `VITE_SITE_URL`.
3. Reconstruir el frontend.
4. Actualizar CORS del backend si corresponde.
5. Configurar HTTPS.
