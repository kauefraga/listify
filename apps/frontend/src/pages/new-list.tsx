import { type FormEvent, useState } from 'react';

export function NewList() {
  const [list, setList] = useState({
    name: '',
    content: '',
  });

  function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(':>', list);

    setList({
      name: '',
      content: '',
    });
  }

  return (
    <div className="mx-auto w-full max-w-5xl p-3">
      <form className="grid grid-cols-1 items-center gap-5" onSubmit={handleForm}>
        <input
          type="text"
          className="rounded border-2 border-transparent bg-black/5 px-5 py-3 shadow outline-none transition-colors hover:border-listify-pink focus:border-listify-dark-pink"
          placeholder="Favorite games..."
          value={list.name}
          onChange={e => setList({ ...list, name: e.target.value })}
        />
        <textarea
          className="min-h-96 rounded border-2 border-transparent bg-black/5 px-5 py-3 shadow outline-none transition-colors hover:border-listify-pink focus:border-listify-dark-pink"
          placeholder="- Street Fighter"
          value={list.content}
          onChange={e => setList({ ...list, content: e.target.value })}
        />
        <button type="submit" className="rounded border-2 border-transparent bg-black/5 px-5 py-3 shadow outline-none transition-colors hover:border-listify-pink active:border-listify-dark-pink">Save</button>
      </form>
    </div>
  );
}
