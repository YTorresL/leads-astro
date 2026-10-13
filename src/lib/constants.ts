// Los `value` coinciden con los CHECK de la base de datos (inglés);
// los `label` son lo que se muestra en la interfaz.
export const STATUSES = [
  { value: 'to_research', label: 'Por investigar' },
  { value: 'invitation_sent', label: 'Invitación enviada' },
  { value: 'accepted', label: 'Aceptada' },
  { value: 'conversation', label: 'Conversación' },
  { value: 'opportunity', label: 'Oportunidad' },
  { value: 'closed', label: 'Cerrado' },
] as const;

export const SERVICES = [
  { value: 'website', label: 'Web' },
  { value: 'maintenance', label: 'Mantenimiento' },
  { value: 'integration', label: 'Integración' },
  { value: 'automation', label: 'Automatización' },
] as const;

export const statusLabel = (v: string) => STATUSES.find((s) => s.value === v)?.label ?? v;
export const serviceLabel = (v: string) => SERVICES.find((s) => s.value === v)?.label ?? v;

// "" -> null, para guardar campos vacíos como NULL
export const txt = (v: FormDataEntryValue | null) => {
  const s = (v ?? '').toString().trim();
  return s === '' ? null : s;
};
