/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fetchReading, generateSpeech } from './data'
import Rollnumber from './rollnumber';
import Loading from './loading';
import Markdown from 'react-markdown'

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [reading, getReading] = useState<string | null>(null);
  const [number, setNumber] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!number) return
    setLoading(true)
    getReading(await fetchReading(number.toString()))
    setLoading(false)
  }

  // const speakReading = async (reading: string) => {
  //   const audioBuffer = await generateSpeech(reading)
  //   const audio = new Audio(URL.createObjectURL(new Blob([audioBuffer], { type: 'audio/mpeg' })))
  //   audio.play()
  // }

  return (
    <div className="bg-gray-900">
      <div className="relative isolate overflow-hidden pt-14 h-screen">
        <img
          alt=""
          src="/angel.jpg"
          className="absolute inset-0 -z-10 w-screen h-screen object-cover angel"
          style={{
            opacity: loading || reading ? 0.2 : 1.0,
            transition: 'all 6.39s ease-in-out'
          }}
        />
        {!reading && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-4">
            {!loading && <Rollnumber
              // defaultValue={number?.toString() || '000'}
              onChange={number => setNumber(number)}
            />}
            <div className="flex justify-center mt-4">
              <button
                className="flex items-center justify-center gap-5 w-[64px] h-[64px] self-start rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 md:text-base"
                style={{
                  opacity: number !== null ? 1 : 0.5,
                  pointerEvents: number !== null ? 'auto' : 'none'
                }}
                onClick={handleSubmit}
              >
                {!loading ? <span>Go</span> : <Loading />} 
              </button>
            </div>
          </div>
        )}
        {reading && (
          <div className="absolute top-0 left-0 mb-4 p-6 overflow-auto max-h-screen">
            <div className="prose prose-lg text-white p-8">
              <Markdown>{reading}</Markdown>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="flex items-center justify-center gap-5 w-[64px] h-[64px] self-start rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 md:text-base"
                onClick={() => {
                  getReading(null)
                }}
              >
                {<span>Back</span>} 
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
