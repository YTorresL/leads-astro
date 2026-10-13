# Prospectos (Astro + Supabase)

## 1. Base de datos
Ejecuta `npx supabase start` Supabase CLI.

## 2. Usuario
Supabase > Authentication > Users > **Add user** (correo + contraseña, marca "Auto confirm").

## 3. Variables de entorno
    cp .env.example .env
y completa `SUPABASE_URL` y `SUPABASE_ANON_KEY` (Project Settings > API).

## 4. Correr
    npm install
    npm run dev      # http://localhost:4321

Producción: `npm run build && npm start`
