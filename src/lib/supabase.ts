import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

export function createClient(request: Request, cookies: AstroCookies) {
  return createServerClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '') as { name: string; value: string }[];
      },
      setAll(list) {
        list.forEach(({ name, value, options }) => cookies.set(name, value, options));
      },
    },
  });
}
