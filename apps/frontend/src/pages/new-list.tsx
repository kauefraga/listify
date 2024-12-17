import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { type List, symbolToType } from '../schemas/list';
import { useListStore } from '../stores/list-store';

export function NewList() {
  const navigate = useNavigate();

  const [list, setList] = useState({
    name: '',
    content: '',
    description: '',
  });
  const [error, setError] = useState('');

  const { createList } = useListStore();

  function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lines = list.content.split('\n');
    for (const line of lines) {
      // line.trim().length <= 5 is to check
      // if the only thing in the line is the biggest symbol we have: '- [x]'
      if (line.trim().length === 0 || line.trim().length <= 5) {
        setError('Please fill out the content field. Don\'t leave empty space.');
        setTimeout(() => setError(''), 5000);

        return;
      }
    }

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
            required
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
            className="min-h-80 rounded border-2 border-transparent bg-black/5 px-5 py-3 shadow outline-none transition-colors hover:border-listify-pink focus:border-listify-dark-pink"
            placeholder="- Street Fighter"
            value={list.content}
            onChange={e => setList({ ...list, content: e.target.value })}
            required
          />
        </div>

        <p id="error" className="rounded bg-red-700 p-3 text-center text-white" hidden={error.length === 0}>
          {error}
        </p>

        <button
          type="submit"
          className="mt-5 rounded border-2 border-transparent bg-black/5 px-5 py-3 shadow outline-none transition-colors hover:border-listify-pink active:border-listify-dark-pink">
          Save
        </button>
      </form>
    </div>
  );
}
