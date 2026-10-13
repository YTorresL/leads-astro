import { Alert, AlertDescription } from '@/components/ui/alert';

export function Notices({ saved, error, message }: { saved?: boolean; error?: string; message?: string }) {
  return (
    <>
      {message && (
        <Alert className="mb-4 border-green-600/30 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
          <AlertDescription className="text-green-800 dark:text-green-200">{message}</AlertDescription>
        </Alert>
      )}
      {saved && (
        <Alert className="mb-4 border-green-600/30 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
          <AlertDescription className="text-green-800 dark:text-green-200">Guardado ✔</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
