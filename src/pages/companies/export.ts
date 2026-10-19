import type { APIRoute } from 'astro'

// Exporta un lead (empresa + todos sus contactos) como JSON.
export const GET: APIRoute = async ({ request, locals }) => {
  const companyId = new URL(request.url).searchParams.get('id')
  if (!companyId) {
    return new Response(JSON.stringify({ error: 'Falta el ID de la empresa' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const { data, error } = await locals.supabase
    .from('companies')
    .select('*, contacts(*)')
    .eq('id', companyId)
    .order('created_at', { referencedTable: 'contacts' })
    .single()

  if (error || !data) {
    return new Response(JSON.stringify({ error: 'Lead no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // user_id es interno; no tiene sentido en el archivo exportado
  const { user_id: _u, contacts, ...company } = data as any
  const payload = {
    ...company,
    contacts: (contacts ?? []).map(({ user_id: _cu, ...ct }: any) => ct)
  }

  const slug =
    String(company.name ?? 'lead')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'lead'

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}.json"`
    }
  })
}
