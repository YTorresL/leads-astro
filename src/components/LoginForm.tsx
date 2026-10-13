import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Notices } from '@/components/Notices';

export function LoginForm({ error }: { error?: string }) {
  return (
    <Card className="mx-auto mt-16 max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Iniciar sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <Notices error={error} />
        <form method="post" className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Correo</Label>
            <Input id="email" type="email" name="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" name="password" required />
          </div>
          <Button type="submit" className="w-full">Entrar</Button>
        </form>
      </CardContent>
    </Card>
  );
}
