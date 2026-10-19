import { SERVICES, STATUSES } from './constants';

// ---------- Parser CSV (sin dependencias) ----------
// Soporta comillas, saltos de línea dentro de comillas, BOM y separadores , ; o tab
// (Excel en español exporta con ;).
export function parseCsv(input: string): string[][] {
  const text = input.replace(/^﻿/, '');
  const firstLine = text.split(/\r?\n/, 1)[0] ?? '';
  const count = (ch: string) => {
    let n = 0, q = false;
    for (const c of firstLine) {
      if (c === '"') q = !q;
      else if (!q && c === ch) n++;
    }
    return n;
  };
  const delim = [',', ';', '\t'].map((d) => [d, count(d)] as const).sort((a, b) => b[1] - a[1])[0][0];

  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else quoted = false;
      } else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === delim) { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      rows.push(row); row = [];
    } else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((v) => v.trim() !== ''));
}

// ---------- Columnas aceptadas (español o inglés) ----------
const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

const ALIASES: Record<string, string[]> = {
  company: ['empresa', 'company', 'compania', 'nombre_empresa'],
  website: ['sitio_web', 'website', 'web', 'sitio', 'url'],
  contact: ['contacto', 'contact', 'contact_person', 'persona', 'nombre_contacto'],
  job_title: ['cargo', 'job_title', 'puesto'],
  linkedin_url: ['linkedin', 'linkedin_url'],
  evidence: ['evidencia', 'evidence'],
  hypothetical_problem: ['problema_hipotetico', 'problema', 'hypothetical_problem'],
  services: ['servicios', 'servicios_posibles', 'possible_services', 'services'],
  score: ['puntuacion', 'score', 'pts', 'puntaje'],
  connection_date: ['fecha_conexion', 'fecha_de_conexion', 'connection_date'],
  status: ['estado', 'status'],
  next_action: ['proxima_accion', 'next_action'],
  next_action_date: ['proxima_fecha', 'next_action_date', 'fecha_proxima_accion'],
  outcome: ['resultado', 'outcome'],
};

export const TEMPLATE_HEADERS = [
  'empresa', 'sitio_web', 'puntuacion', 'servicios', 'evidencia', 'problema_hipotetico',
  'contacto', 'cargo', 'linkedin', 'estado', 'fecha_conexion', 'proxima_accion', 'proxima_fecha', 'resultado',
];

export const TEMPLATE_CSV =
  TEMPLATE_HEADERS.join(',') + '\n' +
  'Acme SAC,https://acme.com,8,"web|automatizacion","Su web no carga en móvil","Pierden clientes por web lenta",' +
  'Ana Pérez,Gerente,https://linkedin.com/in/ana,invitacion enviada,2026-10-13,Enviar mensaje,2026-10-20,\n';

const SERVICE_LOOKUP = new Map<string, string>();
SERVICES.forEach((s) => { SERVICE_LOOKUP.set(norm(s.value), s.value); SERVICE_LOOKUP.set(norm(s.label), s.value); });
SERVICE_LOOKUP.set('automation', 'automation'); SERVICE_LOOKUP.set('automatizacion', 'automation');

const STATUS_LOOKUP = new Map<string, string>();
STATUSES.forEach((s) => { STATUS_LOOKUP.set(norm(s.value), s.value); STATUS_LOOKUP.set(norm(s.label), s.value); });

// Acepta YYYY-MM-DD o DD/MM/YYYY (o DD-MM-YYYY). Devuelve null si no es válida.
function parseDate(v: string): string | null {
  let y: string, m: string, d: string;
  let match = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (match) [, y, m, d] = match;
  else if ((match = v.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/))) [, d, m, y] = match;
  else return null;
  const date = new Date(Date.UTC(+y, +m - 1, +d));
  if (date.getUTCFullYear() !== +y || date.getUTCMonth() !== +m - 1 || date.getUTCDate() !== +d) return null;
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

// ---------- Resultado ----------
export type ImportContact = {
  name: string;
  job_title: string | null;
  linkedin_url: string | null;
  connection_date: string | null;
  status: string;
  next_action: string | null;
  next_action_date: string | null;
  outcome: string | null;
};

export type ImportCompany = {
  name: string;
  website: string | null;
  evidence: string | null;
  hypothetical_problem: string | null;
  possible_services: string[];
  score: number | null;
  contacts: ImportContact[];
};

export const MAX_IMPORT_ROWS = 500;

// Una fila = una empresa (+ opcionalmente un contacto). Filas con la misma empresa se agrupan.
export function parseLeadsCsv(text: string): { companies: ImportCompany[]; errors: string[] } {
  const errors: string[] = [];
  const rows = parseCsv(text);
  if (rows.length === 0) return { companies: [], errors: ['El CSV está vacío.'] };

  const headers = rows[0].map(norm);
  const col: Record<string, number> = {};
  for (const [key, names] of Object.entries(ALIASES)) {
    const idx = headers.findIndex((h) => names.includes(h));
    if (idx >= 0) col[key] = idx;
  }
  if (col.company === undefined) {
    return { companies: [], errors: ['Falta la columna "empresa" en la primera fila (encabezados).'] };
  }
  const dataRows = rows.slice(1);
  if (dataRows.length === 0) return { companies: [], errors: ['El CSV solo tiene encabezados, sin filas de datos.'] };
  if (dataRows.length > MAX_IMPORT_ROWS) {
    return { companies: [], errors: [`Máximo ${MAX_IMPORT_ROWS} filas por importación (el archivo tiene ${dataRows.length}).`] };
  }

  const get = (r: string[], key: string) => {
    const i = col[key];
    const v = i === undefined ? '' : (r[i] ?? '').trim();
    return v === '' ? null : v;
  };

  const byKey = new Map<string, ImportCompany>();
  dataRows.forEach((r, i) => {
    const line = i + 2; // fila 1 = encabezados
    const err = (msg: string) => errors.push(`Fila ${line}: ${msg}`);

    const name = get(r, 'company');
    if (!name) return err('falta el nombre de la empresa.');

    let score: number | null = null;
    const rawScore = get(r, 'score');
    if (rawScore !== null) {
      score = Number(rawScore.replace(',', '.'));
      if (!Number.isInteger(score) || score < 0 || score > 10) { err(`puntuación "${rawScore}" inválida (entero de 0 a 10).`); score = null; }
    }

    const services: string[] = [];
    for (const part of (get(r, 'services') ?? '').split(/[|,;/]+/).map((s) => s.trim()).filter(Boolean)) {
      const v = SERVICE_LOOKUP.get(norm(part));
      if (!v) err(`servicio "${part}" no reconocido (usa: ${SERVICES.map((s) => s.label).join(', ')}).`);
      else if (!services.includes(v)) services.push(v);
    }

    const company: ImportCompany = byKey.get(name.toLowerCase()) ?? {
      name, website: null, evidence: null, hypothetical_problem: null, possible_services: [], score: null, contacts: [],
    };
    // el primer valor no vacío de cada campo gana
    company.website ??= get(r, 'website');
    company.evidence ??= get(r, 'evidence');
    company.hypothetical_problem ??= get(r, 'hypothetical_problem');
    company.score ??= score;
    for (const s of services) if (!company.possible_services.includes(s)) company.possible_services.push(s);
    byKey.set(name.toLowerCase(), company);

    const contactName = get(r, 'contact');
    if (contactName) {
      let status = 'to_research';
      const rawStatus = get(r, 'status');
      if (rawStatus) {
        const v = STATUS_LOOKUP.get(norm(rawStatus));
        if (!v) err(`estado "${rawStatus}" no reconocido (usa: ${STATUSES.map((s) => s.label).join(', ')}).`);
        else status = v;
      }
      const dates = (['connection_date', 'next_action_date'] as const).map((k) => {
        const raw = get(r, k);
        if (raw === null) return null;
        const d = parseDate(raw);
        if (!d) err(`fecha "${raw}" inválida (usa AAAA-MM-DD o DD/MM/AAAA).`);
        return d;
      });
      company.contacts.push({
        name: contactName,
        job_title: get(r, 'job_title'),
        linkedin_url: get(r, 'linkedin_url'),
        connection_date: dates[0],
        status,
        next_action: get(r, 'next_action'),
        next_action_date: dates[1],
        outcome: get(r, 'outcome'),
      });
    }
  });

  return { companies: [...byKey.values()], errors };
}
