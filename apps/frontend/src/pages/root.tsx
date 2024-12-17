import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '../components/list-item';
import { ListRoot } from '../components/list-root';
import { SearchInput } from '../components/search-input';
import { useListStore } from '../stores/list-store';

export function Root() {
  const { lists } = useListStore();

  const [search, setSearch] = useState('');
  const filteredLists = lists.filter(list => list.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mx-auto w-full max-w-5xl p-3">
      <div className="flex flex-col items-center gap-10">
        <header className="flex">
          <SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Shopping list..." />
          <Link
            to="new-list"
            className="flex items-center rounded bg-listify-pink/80 px-5 py-3 text-white shadow transition-colors hover:bg-listify-dark-pink active:bg-listify-dark-pink/90">
            <Plus />
          </Link>
        </header>
        <div className="w-full">
          {lists.length !== 0 ? (
            <ListRoot>
              {filteredLists.map(list => (
                <ListItem key={list.id} list={list} />
              ))}
            </ListRoot>
          ) : (
            <div className="text-center text-lg leading-loose">
              <p>No lists registered!</p>
              <p>Try clicking in the + (plus) button.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
