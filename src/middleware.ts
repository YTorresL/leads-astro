import { defineMiddleware } from 'astro:middleware';
import { createClient } from './lib/supabase';

export const onRequest = defineMiddleware(async (ctx, next) => {
  const supabase = createClient(ctx.request, ctx.cookies);
  const { data } = await supabase.auth.getUser();

  ctx.locals.supabase = supabase;
  ctx.locals.user = data.user;

  if (!data.user && !ctx.url.pathname.startsWith('/login')) {
    return ctx.redirect('/login');
  }
  return next();
});
