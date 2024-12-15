import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '../components/list-item';
import { ListRoot } from '../components/list-root';
import { SearchInput } from '../components/search-input';

export function Root() {
  const lists = [
    {
      id: '1a2b3c4d-5e6f-7g8h-9i10-j11k12l13m14',
      name: 'To Do List',
      content:
        'Finish project\nCall mom\nTake shower\nDo homework\nCode Listify\nBEEEEEEE READYYY\ndasdasda\nasdasdasdas',
    },
    {
      id: '2b3c4d5e-6f7g-8h9i-10j11-k12l13m14n15',
      name: 'Shopping List',
      content: 'Bread\nEggs\nCoffee',
    },
    {
      id: '3c4d5e6f-7g8h-9i10-j11k12-l13m14n15o16',
      name: 'Workout Plan',
      content: 'Push-ups\nSquats\nRunning',
    },
    {
      id: '4d5e6f7g-8h9i-10j11-k12l13-m14n15o16p17',
      name: 'Books to Read',
      content: '1984 by George Orwell\nBrave New World',
    },
    {
      id: '5e6f7g8h-9i10-j11k12-l13m14-n15o16p17q18',
      name: 'Weekend Plans',
      content: 'Visit park\nWatch a movie',
    },
  ];

  const [search, setSearch] = useState('');
  const filteredLists = lists.filter(list => list.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mx-auto w-full max-w-5xl p-3">
      <div className="flex flex-col items-center gap-10">
        <header className="flex">
          <SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Shopping list..." />
          <Link
            to="new-list"
            className="flex items-center rounded bg-listify-pink/80 px-5 py-3 text-white shadow transition-colors hover:bg-listify-dark-pink active:bg-listify-dark-pink/90"
          >
            <Plus />
          </Link>
        </header>
        <div className="w-full">
          <ListRoot>
            {filteredLists.map(list => (
              <ListItem key={list.id} list={list} />
            ))}
          </ListRoot>
        </div>
      </div>
    </div>
  );
}
