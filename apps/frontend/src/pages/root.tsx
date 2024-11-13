import { Search } from 'lucide-react';
import { useState } from 'react';
import { ListItem } from '../components/list-item';
import { ListRoot } from '../components/list-root';

export function Root() {
  const lists = [
    {
      id: '1a2b3c4d-5e6f-7g8h-9i10-j11k12l13m14',
      name: 'To Do List',
      content:
        '- Finish project\n- Call mom\n- Take shower\n- Do homework\n- Code Listify\n- BEEEEEEE READYYY\n- dasdasda\n- dasdasdasdas',
    },
    {
      id: '2b3c4d5e-6f7g-8h9i-10j11-k12l13m14n15',
      name: 'Shopping List',
      content: '- Bread\n- Eggs\n- Coffee',
    },
    {
      id: '3c4d5e6f-7g8h-9i10-j11k12-l13m14n15o16',
      name: 'Workout Plan',
      content: '- Push-ups\n- Squats\n- Running',
    },
    {
      id: '4d5e6f7g-8h9i-10j11-k12l13-m14n15o16p17',
      name: 'Books to Read',
      content: '- 1984 by George Orwell\n- Brave New World',
    },
    {
      id: '5e6f7g8h-9i10-j11k12-l13m14-n15o16p17q18',
      name: 'Weekend Plans',
      content: '- Visit park\n- Watch a movie',
    },
  ];

  const [search, setSearch] = useState('');
  const filteredLists = lists.filter(list => list.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full max-w-5xl mx-auto p-3">
      <div className="flex flex-col items-center gap-10">
        <header>
          <div className="flex items-center -translate-x-5">
            <Search className="translate-x-10" />
            <input
              type="text"
              className="px-14 w-96 py-3 bg-black/5 shadow outline-none rounded border-2 border-transparent transition-colors focus:border-pink-600 hover:border-pink-400"
              id="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Shopping list..."
            />
          </div>
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
