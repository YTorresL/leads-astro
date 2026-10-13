import * as React from 'react';

import { cn } from '@/lib/utils';

// Checkbox nativo con el estilo de shadcn (funciona sin hidratar React).
function Checkbox({ className, ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn(
        'border-input accent-primary size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Checkbox };
