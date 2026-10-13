export const ESTADOS = [
  { value: 'por_investigar', label: 'Por investigar' },
  { value: 'invitacion_enviada', label: 'Invitación enviada' },
  { value: 'aceptada', label: 'Aceptada' },
  { value: 'conversacion', label: 'Conversación' },
  { value: 'oportunidad', label: 'Oportunidad' },
  { value: 'cerrado', label: 'Cerrado' },
] as const;

export const SERVICIOS = [
  { value: 'web', label: 'Web' },
  { value: 'mantenimiento', label: 'Mantenimiento' },
  { value: 'integracion', label: 'Integración' },
  { value: 'automatizacion', label: 'Automatización' },
] as const;

export const estadoLabel = (v: string) => ESTADOS.find((e) => e.value === v)?.label ?? v;
export const servicioLabel = (v: string) => SERVICIOS.find((s) => s.value === v)?.label ?? v;

// "" -> null, para guardar campos vacíos como NULL
export const txt = (v: FormDataEntryValue | null) => {
  const s = (v ?? '').toString().trim();
  return s === '' ? null : s;
};
