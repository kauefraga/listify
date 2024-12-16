import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import type { List } from '../schemas/list';
import { useListStore } from '../stores/list-store';

const symbolToType = {
  '*': 'bullet',
  '-': 'bullet',
  '+': 'bullet',
  '0.': 'numbered',
  '1.': 'numbered',
  '[': 'check',
  '[]': 'check',
  '[x]': 'check',
};

export function NewList() {
  const navigate = useNavigate();

  const [list, setList] = useState({
    name: '',
    content: '',
    description: ''
  });
  const { createList } = useListStore();

  function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // split and get the first line, then split again
    // and get the first part of the line (list symbol)
    // NOTE: it does not cover '- [ ]', '- []' or '- [x]' because of the second splitting
    const [listSymbol] = list.content.split('\n')[0].split(' ');

    const type = symbolToType[listSymbol as keyof typeof symbolToType] as List['type'];

    createList({
      id: uuidv4(),
      ...list,
      type,
      created_at: new Date(),
    });

    setList({
      name: '',
      content: '',
      description: '',
    });

    navigate('/');
  }

  return (
    <div className="mx-auto w-full max-w-5xl p-3">
      <form className="grid grid-cols-1 items-center gap-5" onSubmit={handleForm}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="rounded border-2 border-transparent bg-black/5 px-5 py-3 shadow outline-none transition-colors hover:border-listify-pink focus:border-listify-dark-pink"
            placeholder="Favorite games..."
            value={list.name}
            onChange={e => setList({ ...list, name: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description (optional)</label>
          <input
            type="text"
            id="description"
            className="rounded border-2 border-transparent bg-black/5 px-5 py-3 shadow outline-none transition-colors hover:border-listify-pink focus:border-listify-dark-pink"
            placeholder="This list is about my favorite games to play on PC..."
            value={list.description}
            onChange={e => setList({ ...list, description: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className="min-h-96 rounded border-2 border-transparent bg-black/5 px-5 py-3 shadow outline-none transition-colors hover:border-listify-pink focus:border-listify-dark-pink"
            placeholder="- Street Fighter"
            value={list.content}
            onChange={e => setList({ ...list, content: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="rounded border-2 border-transparent bg-black/5 px-5 py-3 shadow outline-none transition-colors hover:border-listify-pink active:border-listify-dark-pink">
          Save
        </button>
      </form>
    </div>
  );
}
