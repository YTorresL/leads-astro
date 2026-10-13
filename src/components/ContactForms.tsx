import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { STATUSES } from '@/lib/constants';
import type { Contact } from '@/lib/types';

function StatusSelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <NativeSelect name="status" defaultValue={defaultValue}>
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </NativeSelect>
  );
}

export function ContactForm({ contact: c }: { contact: Contact }) {
  return (
    <form method="post">
      <input type="hidden" name="contact_id" value={c.id} />
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-2">
              <Label>Nombre *</Label>
              <Input name="name" required defaultValue={c.name} />
            </div>
            <div className="grid gap-2">
              <Label>Cargo</Label>
              <Input name="job_title" defaultValue={c.job_title ?? ''} />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn</Label>
              <Input name="linkedin_url" type="url" defaultValue={c.linkedin_url ?? ''} />
            </div>
            <div className="grid gap-2">
              <Label>Estado</Label>
              <StatusSelect defaultValue={c.status} />
            </div>
            <div className="grid gap-2">
              <Label>Fecha de conexión</Label>
              <Input name="connection_date" type="date" defaultValue={c.connection_date ?? ''} />
            </div>
            <div className="grid gap-2">
              <Label>Próxima fecha</Label>
              <Input name="next_action_date" type="date" defaultValue={c.next_action_date ?? ''} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Próxima acción</Label>
            <Input name="next_action" defaultValue={c.next_action ?? ''} />
          </div>
          <div className="grid gap-2">
            <Label>Resultado</Label>
            <Textarea name="outcome" defaultValue={c.outcome ?? ''} />
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button type="submit" name="intent" value="save_contact">Guardar contacto</Button>
          <Button
            type="submit"
            name="intent"
            value="delete_contact"
            variant="destructive"
            formNoValidate
            data-confirm="¿Eliminar este contacto?"
          >
            Eliminar
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export function NewContactForm() {
  return (
    <form method="post">
      <Card className="border-dashed">
        <CardHeader><CardTitle>+ Agregar contacto</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid gap-2">
              <Label>Nombre *</Label>
              <Input name="name" required />
            </div>
            <div className="grid gap-2">
              <Label>Cargo</Label>
              <Input name="job_title" />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn</Label>
              <Input name="linkedin_url" type="url" />
            </div>
            <div className="grid gap-2">
              <Label>Estado</Label>
              <StatusSelect />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" name="intent" value="add_contact">Agregar contacto</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
