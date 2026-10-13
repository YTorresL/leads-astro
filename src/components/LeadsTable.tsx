import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { STATUSES, serviceLabel, statusLabel } from '@/lib/constants';
import type { CompanyWithContacts, Contact } from '@/lib/types';

// próxima acción más cercana entre los contactos de la empresa
const nextAction = (contacts: Contact[]) =>
  contacts
    .filter((c) => c.next_action)
    .sort((a, b) => (a.next_action_date ?? '9999').localeCompare(b.next_action_date ?? '9999'))[0];

export function LeadsTable({ companies, q, status }: { companies: CompanyWithContacts[]; q: string; status: string }) {
  return (
    <>
      <form method="get" className="mb-4 flex flex-wrap gap-2">
        <Input type="search" name="q" placeholder="Buscar empresa…" defaultValue={q} className="max-w-64" />
        <NativeSelect name="status" defaultValue={status} className="max-w-52">
          <option value="">Todos los estados</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </NativeSelect>
        <Button type="submit" variant="secondary">Filtrar</Button>
      </form>

      <Card className="py-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4">Empresa</TableHead>
              <TableHead>Pts</TableHead>
              <TableHead>Servicios</TableHead>
              <TableHead>Contactos</TableHead>
              <TableHead>Próxima acción</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-6 text-center text-muted-foreground">Sin resultados.</TableCell>
              </TableRow>
            )}
            {companies.map((c) => {
              const next = nextAction(c.contacts);
              return (
                <TableRow key={c.id}>
                  <TableCell className="pl-4">
                    <div className="font-medium">{c.name}</div>
                    {c.website && (
                      <a href={c.website} target="_blank" rel="noopener" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                        {c.website.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="font-bold">{c.score ?? '–'}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {c.possible_services.map((s) => (
                        <Badge key={s} variant="secondary">{serviceLabel(s)}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {c.contacts.length === 0 && <span className="text-muted-foreground">—</span>}
                    {c.contacts.map((ct) => (
                      <div key={ct.id} className="mb-1 flex items-center gap-2">
                        <span>{ct.name}</span>
                        <Badge variant="outline">{statusLabel(ct.status)}</Badge>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {next ? (
                      <>
                        <div>{next.next_action}</div>
                        <div className="text-sm text-muted-foreground">{next.next_action_date ?? ''}</div>
                      </>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <a href={`/companies/${c.id}`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>Editar</a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
