-- Las tablas/vistas nuevas en `public` ya no se exponen automáticamente a la
-- Data API (ver `auto_expose_new_tables` en config.toml). Sin estos GRANTs,
-- PostgREST responde "permission denied for table ..." aunque exista RLS.
-- La seguridad real sigue siendo RLS (user_id = auth.uid()).

grant select, insert, update, delete on public.companies to authenticated;
grant select, insert, update, delete on public.contacts  to authenticated;
grant select on public.prospect_view to authenticated;
