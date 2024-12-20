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
        <h1>Spirit Number Codes</h1>
      </header>
      <p>Your higher self has ways to make you notice recurring numbers in your environment. This is a form of communication and once you have established the connection and agree on using some tool for number reading, you may be surprised how accurately numbers relate to your current situation.</p>
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