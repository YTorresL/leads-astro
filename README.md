# Prospectos (Astro + Supabase)

## 1. Base de datos
    npx supabase start      # levanta Supabase local y aplica las migraciones
    npx supabase db reset   # (opcional) recrea la base desde cero con las migraciones

Tablas: `companies`, `contacts` y la vista `prospect_view`.

## 2. Usuario
Supabase Studio (http://127.0.0.1:54323) > Authentication > Users > **Add user** (correo + contraseña, marca "Auto confirm").

## 3. Variables de entorno
    cp .env.example .env
y completa `SUPABASE_URL` y `SUPABASE_ANON_KEY`. En local salen de `npx supabase status`
(API URL y anon key); en la nube, de Project Settings > API.

## 4. Correr
    npm install
    npm run dev      # http://localhost:4321

Producción: `npm run build && npm start`

## Estilos (shadcn/ui + Tailwind v4)
- Componentes en `src/components/ui/` (estilo *new-york*, tokens en `src/styles/global.css`).
- Las páginas `.astro` manejan datos y acciones; la interfaz vive en componentes React
  (`src/components/*.tsx`) que se renderizan **solo en el servidor** (sin hidratar, sin JS de React en el cliente).
- Para agregar más componentes: `npx shadcn@latest add <componente>` (alias `@/` configurado en `tsconfig.json` y `components.json`).
  Evita los que necesitan interactividad en el cliente (Dialog, Select de Radix…) o hidrátalos con `client:load`.
- Los `<select>` y checkboxes usan versiones nativas con el estilo de shadcn (`native-select.tsx`, `checkbox.tsx`).
- Confirmaciones de borrado: atributo `data-confirm="..."` en el botón (script en `Layout.astro`).

## Rutas
| Ruta | Descripción |
| --- | --- |
| `/` | Lista de leads (filtros `?q=` y `?status=`) |
| `/companies/new` | Crear empresa |
| `/companies/:id` | Editar empresa y sus contactos |
| `/login`, `/logout` | Sesión |
