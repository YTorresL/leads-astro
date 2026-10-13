import * as React from 'react';

import { cn } from '@/lib/utils';

// <select> nativo con el estilo de shadcn. Se usa en lugar del Select de Radix
// porque las páginas se renderizan en el servidor y los formularios son POST
// normales (sin hidratar React).
function NativeSelect({ className, ...props }: React.ComponentProps<'select'>) {
  return (
    <select
      data-slot="native-select"
      className={cn(
        'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { NativeSelect };
