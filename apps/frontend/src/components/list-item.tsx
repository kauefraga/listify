interface ListItemProps {
  list: {
    id: string;
    name: string;
    content: string;
  };
}

export function ListItem({ list }: ListItemProps) {
  return (
    <li className="bg-black/5 overflow-scroll space-y-2 h-56 border-2 border-transparent transition-colors hover:border-listify-pink p-4 rounded shadow-sm">
      <p className="font-medium">{list.name}</p>
      <ul className="list-disc list-inside">
        {list.content.split('\n').map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </li>
  );
}
