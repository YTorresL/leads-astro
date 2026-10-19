// Los `value` coinciden con los CHECK de la base de datos (inglés);
// los `label` son lo que se muestra en la interfaz.
export const STATUSES = [
  { value: 'to_research', label: 'Por investigar', color: 'bg-slate-200 text-black' },
  { value: 'invitation_sent', label: 'Invitación enviada', color: 'bg-blue-500 text-white' },
  { value: 'accepted', label: 'Aceptada', color: 'bg-indigo-500 text-white' },
  { value: 'conversation', label: 'Conversación', color: 'bg-purple-500 text-white' },
  { value: 'opportunity', label: 'Oportunidad', color: 'bg-amber-500 text-white' },
  { value: 'closed', label: 'Cerrado', color: 'bg-emerald-500 text-white' },
] as const;

export const SERVICES = [
  { value: 'website', label: 'Web' },
  { value: 'maintenance', label: 'Mantenimiento' },
  { value: 'integration', label: 'Integración' },
  { value: 'automation', label: 'Automatización' },
] as const;

export const statusLabel = (v: string) => STATUSES.find((s) => s.value === v)?.label ?? v;
export const statusColor = (v: string) => STATUSES.find((s) => s.value === v)?.color ?? '';
export const serviceLabel = (v: string) => SERVICES.find((s) => s.value === v)?.label ?? v;

// "" -> null, para guardar campos vacíos como NULL
export const txt = (v: FormDataEntryValue | null) => {
  const s = (v ?? '').toString().trim();
  return s === '' ? null : s;
};
