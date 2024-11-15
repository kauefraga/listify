import { Search } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

export function SearchInput({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="-translate-x-5 flex items-center">
      <Search className="translate-x-10" />
      <input
        type="text"
        className="w-96 rounded border-2 border-transparent bg-black/5 px-14 py-3 shadow outline-none transition-colors hover:border-listify-pink focus:border-listify-dark-pink"
        {...props}
      />
    </div>
  );
}
