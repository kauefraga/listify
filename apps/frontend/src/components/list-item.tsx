interface ListItemProps {
  list: {
    id: string;
    name: string;
    content: string;
  };
}

export function ListItem({ list }: ListItemProps) {
  return (
    <li className="h-56 space-y-2 overflow-scroll rounded border-2 border-transparent bg-black/5 p-4 shadow-sm transition-colors hover:border-listify-pink">
      <p className="font-medium">{list.name}</p>
      <ul className="list-inside list-disc">
        {list.content.split('\n').map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </li>
  );
}
