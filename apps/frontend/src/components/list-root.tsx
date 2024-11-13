import type { ReactNode } from 'react';

interface ListRootProps {
  children: ReactNode;
}

export function ListRoot({ children }: ListRootProps) {
  return <ul className="grid grid-cols-3 gap-4">{children}</ul>;
}
