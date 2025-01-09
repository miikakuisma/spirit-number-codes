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
  const [reading, getReading] = useState<string | null>(null)
  const [number, setNumber] = useState<Array<number>>([1, 1, 1])
  const [copied, setCopied] = useState(false)

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

  const copyReading = async () => {
    await navigator.clipboard.writeText(reading || '')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

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
            <div className="prose prose-lg text-white p-8 max-w-4xl mx-auto">
              <Markdown>{reading}</Markdown>
              <div className="flex justify-end items-center">
                <button
                  className={`flex items-center justify-center gap-5 w-[48px] h-[48px] self-start rounded-full ${copied ? 'bg-green-900' : 'bg-gray-900'} px-4 py-3 transition-colors hover:bg-gray-700 md:text-base`}
                  onClick={() => {
                    copyReading()
                  }}
                >
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" color="white" fill="currentcolor"><path d="M448 0H224C188.7 0 160 28.65 160 64v224c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64V64C512 28.65 483.3 0 448 0zM464 288c0 8.822-7.178 16-16 16H224C215.2 304 208 296.8 208 288V64c0-8.822 7.178-16 16-16h224c8.822 0 16 7.178 16 16V288zM304 448c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V224c0-8.822 7.178-16 16-16h64V160H64C28.65 160 0 188.7 0 224v224c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64v-64h-48V448z"/></svg>
                </button>
                {copied && <span className="text-white text-sm ml-3">Copied!</span>}
              </div>
              
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
