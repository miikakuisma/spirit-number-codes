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
  const [number, setNumber] = useState<Array<number>>([1, 1, 1]);

  const handleSubmit = async () => {
    const numberString = number.join('')
    console.log(numberString)
    setLoading(true)
    getReading(await fetchReading(numberString))
    setLoading(false)
  }

  // const speakReading = async (reading: string) => {
  //   const audioBuffer = await generateSpeech(reading)
  //   const audio = new Audio(URL.createObjectURL(new Blob([audioBuffer], { type: 'audio/mpeg' })))
  //   audio.play()
  // }

  return (
    <div className="bg-gray-900">
      <div className="relative isolate overflow-hidden h-screen">
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
              defaultValue={number || [0,0,0]}
              onChange={number => setNumber(number)}
            />}
            <div className="flex justify-center mt-4">
              <button
                className="flex items-center justify-center gap-5 w-[96px] h-[96px] self-start rounded-full bg-gray-900 px-6 py-3 transition-colors hover:bg-gray-700 md:text-base"
                style={{
                  opacity: number !== null ? 1 : 0.6,
                  pointerEvents: number !== null ? 'auto' : 'none'
                }}
                onClick={handleSubmit}
              >
                {!loading ? <span className='text-3xl font-medium text-white '>Go</span> : <Loading />} 
              </button>
            </div>
          </div>
        )}
        {reading && (
          <div className="mb-4 p-5 pt-20 pb-10 h-full max-h-screen overflow-auto">
            <div className="prose prose-lg text-white p-8">
              <Markdown>{reading}</Markdown>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="flex items-center justify-center gap-5 w-[96px] h-[96px] self-start rounded-full bg-gray-900 px-6 py-3 transition-colors hover:bg-gray-700 md:text-base"
                onClick={() => {
                  getReading(null)
                }}
              >
                {<span className='text-3xl font-medium text-white '>Back</span>} 
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
