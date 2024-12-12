'use client'

import { useState, Suspense } from 'react';
import Loading from './loading';
import Reading from './reading';

export default function Page() {
  const [number, setNumber] = useState<number | null>(null);

  let timeout: NodeJS.Timeout;

  const handleInputNumber = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setNumber(parseInt(target.value));
    }, 300);
  }

  return (
    <main>
      <header>
        <h1>Enkelinumerot</h1>
      </header>
      <p>Enkelinumerot ovat enkeleiden lähettämiä viestejä, jotka voivat auttaa sinua elämässäsi. Jokaisella numerolla on oma merkityksensä ja viestinsä. Valitse alta haluamasi numero ja lue sen tulkinta.</p>
      <div>
        <input type="number" placeholder="Syötä numero" onInput={handleInputNumber} />
      </div>
      {number && <div className="">
        <Suspense fallback={<Loading />}>
          <Reading number={number} />
        </Suspense>
      </div>}
    </main>
  );
}