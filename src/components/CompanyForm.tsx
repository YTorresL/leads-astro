import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SERVICES } from '@/lib/constants';
import type { Company } from '@/lib/types';

export function CompanyForm({ company, isNew }: { company: Partial<Company>; isNew: boolean }) {
  const services = company.possible_services ?? [];
  return (
    <form method="post" className="mb-6">
      <Card>
        <CardHeader><CardTitle>Empresa</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input id="name" name="name" required defaultValue={company.name ?? ''} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Sitio web</Label>
              <Input id="website" name="website" type="url" placeholder="https://" defaultValue={company.website ?? ''} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="score">Puntuación (0–10)</Label>
              <Input id="score" name="score" type="number" min={0} max={10} defaultValue={company.score ?? ''} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="evidence">Evidencia (observación concreta)</Label>
            <Textarea id="evidence" name="evidence" defaultValue={company.evidence ?? ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hypothetical_problem">Problema hipotético</Label>
            <Textarea id="hypothetical_problem" name="hypothetical_problem" defaultValue={company.hypothetical_problem ?? ''} />
          </div>
          <div className="grid gap-2">
            <Label>Servicios posibles</Label>
            <div className="flex flex-wrap gap-4">
              {SERVICES.map((s) => (
                <Label key={s.value} className="font-normal">
                  <Checkbox name="services" value={s.value} defaultChecked={services.includes(s.value)} />
                  {s.label}
                </Label>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button type="submit" name="intent" value="save_company">
            {isNew ? 'Crear empresa' : 'Guardar empresa'}
          </Button>
          {!isNew && (
            <Button
              type="submit"
              name="intent"
              value="delete_company"
              variant="destructive"
              formNoValidate
              data-confirm="¿Eliminar la empresa y todos sus contactos?"
            >
              Eliminar
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
