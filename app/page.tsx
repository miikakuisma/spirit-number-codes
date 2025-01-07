/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react';
import { fetchReading } from './data'
import Loading from './number/loading';
import Markdown from 'react-markdown'

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [reading, setNumber] = useState<string | null>(null);

  let timer: NodeJS.Timeout | null = null;

  const handleNumberInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const number = (event.target as HTMLInputElement).value
      setLoading(true)
      setNumber(await fetchReading(number))
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-gray-900">
      <div className="relative isolate overflow-hidden pt-14 h-screen">
        <img
          alt=""
          src="/angel.jpg"
          className="absolute inset-0 -z-10 w-screen h-screen object-cover"
          style={{
            opacity: loading || reading ? 0.2 : 1.0,
            transition: 'opacity 1s ease-in-out'
          }}
        />
        {loading && <Loading />}
        {!reading && !loading && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-4">
            <input
              type="number"
              placeholder="Number"
              onInput={handleNumberInput}
              autoFocus
              className="p-2 rounded"
            />
          </div>
        )}
        {reading && (
          <div className="absolute bottom-0 left-0 mb-4 p-6 overflow-scroll max-h-screen">
            <div className="prose prose-lg text-white p-8">
              <Markdown>{reading}</Markdown>
            </div>
          </div>
        )}
        
      </div>
    </div>
  )
}
