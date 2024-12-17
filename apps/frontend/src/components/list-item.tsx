import { CircleX } from 'lucide-react';
import type { List } from '../schemas/list';
import { useListStore } from '../stores/list-store';

interface ListItemProps {
  list: List;
}

export function ListItem({ list }: ListItemProps) {
  const { removeList } = useListStore();

  const items = list.content.split('\n');

  return (
    <li className="h-56 space-y-2 overflow-scroll rounded border-2 border-transparent bg-black/5 p-4 shadow-sm transition-colors hover:border-listify-pink">
      <div className="flex justify-between">
        <p className="font-medium">{list.name}</p>
        <CircleX onClick={() => removeList(list.id)} className="cursor-pointer text-black/70 hover:text-black" />
      </div>
      <ul className="list-inside list-disc">
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </li>
  );
}
