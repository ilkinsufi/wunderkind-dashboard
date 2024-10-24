import { useEffect } from 'react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

import type { ThemeDirection } from '../types';

// ----------------------------------------------------------------------

type RTLProps = {
  children: React.ReactNode;
  direction: ThemeDirection;
};

const cacheRtl = createCache({
  key: 'rtl',
  prepend: true,
  stylisPlugins: [rtlPlugin],
});

export function RTL({ children, direction }: RTLProps) {
  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  if (direction === 'rtl') {
    // deleted
    return <></>;
  }

  return <>{children}</>;
}
