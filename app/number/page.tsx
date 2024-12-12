'use client'
import { useRef } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';

export default function Page() {

  const numberRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const url = "/number/" + numberRef.current?.value;
    redirect(url);
  }

  return (
    <main>
      <header>
        <h1>Enkelinumerot</h1>
      </header>
      <p>Enkelinumerot ovat enkeleiden lähettämiä viestejä, jotka voivat auttaa sinua elämässäsi. Jokaisella numerolla on oma merkityksensä ja viestinsä. Valitse alta haluamasi numero ja lue sen tulkinta.</p>
      <div>
        <input type="number" placeholder="Syötä numero" ref={numberRef} />
      </div>
      <button
        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        onClick={handleSubmit}
      >
        <span>Go</span> <ArrowRightIcon className="w-5 md:w-6" />
      </button>
    </main>
  );
}