import { Search } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

export function SearchInput({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center -translate-x-5">
      <Search className="translate-x-10" />
      <input
        type="text"
        className="px-14 w-96 py-3 bg-black/5 shadow outline-none rounded border-2 border-transparent transition-colors focus:border-listify-dark-pink hover:border-listify-pink"
        {...props}
      />
    </div>
  );
}
