import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TEMPLATE_CSV, TEMPLATE_HEADERS } from '@/lib/csv';

export function CsvImportForm({ errors = [], csvText = '' }: { errors?: string[]; csvText?: string }) {
  const templateHref = `data:text/csv;charset=utf-8,${encodeURIComponent('﻿' + TEMPLATE_CSV)}`;
  return (
    <form method="post" encType="multipart/form-data" className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Importar desde CSV</CardTitle>
          <CardDescription>
            Una fila por contacto: las filas con la misma empresa se agrupan. Si la empresa ya existe, solo se agregan
            los contactos nuevos.{' '}
            <a href={templateHref} download="plantilla-leads.csv" className="underline underline-offset-4">
              Descargar plantilla
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>
                <p className="font-medium">No se importó nada. Corrige estos errores y vuelve a intentar:</p>
                <ul className="list-disc pl-5">
                  {errors.slice(0, 20).map((e, i) => <li key={i}>{e}</li>)}
                  {errors.length > 20 && <li>…y {errors.length - 20} más.</li>}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="csv_file">Archivo .csv</Label>
            <Input id="csv_file" name="csv_file" type="file" accept=".csv,.txt,text/csv" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="csv_text">…o pega el contenido (por ejemplo, copiado desde Excel o Google Sheets)</Label>
            <Textarea
              id="csv_text"
              name="csv_text"
              rows={5}
              className="font-mono text-xs"
              placeholder={TEMPLATE_HEADERS.join(',')}
              defaultValue={csvText}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Columnas: <code>{TEMPLATE_HEADERS.join(', ')}</code>. Solo <code>empresa</code> es obligatoria. Servicios
            separados por <code>|</code>. Fechas AAAA-MM-DD o DD/MM/AAAA. Acepta separador coma, punto y coma o tabulación.
          </p>
        </CardContent>
        <CardFooter>
          <Button type="submit" name="intent" value="import_csv" variant="secondary">Importar</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
