import type { ReactNode } from 'react';

interface ListRootProps {
  children: ReactNode;
}

export function ListRoot({ children }: ListRootProps) {
  return <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">{children}</ul>;
}
