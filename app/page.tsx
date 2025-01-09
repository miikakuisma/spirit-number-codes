/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fetchReading, fetchAdvice, generateSpeech } from './data'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Rollnumber from './rollnumber';
import Loading from './loading';
import Markdown from 'react-markdown'

export default function Home() {
  const [showHint, setShowHint] = useState(false)
  const [loading, setLoading] = useState(false);
  const [reading, getReading] = useState<string | null>(null)
  const [advice, getAdvice] = useState<string | null>(null)
  const [number, setNumber] = useState<Array<number>>([1, 1])
  const [question, setQuestion] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.localStorage.showHint) {
        setShowHint(true)
      }
    }
    
  }, [])

  const handleSubmitNumber = async () => {
    const numberString = number.join('')
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

  const copyAdvice = async () => {
    await navigator.clipboard.writeText(advice || '')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleSubmitQuestion = async () => {
    const numberString = number.join('')
    setLoading(true)
    getAdvice(await fetchAdvice('I am constantly seeing number ' + numberString + ' and I also have this situation in my life: ' + question))
    setLoading(false)
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
          <>
            <div
              className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
            >
              <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                <Transition show={showHint}>
                  <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                          <p className="text-sm font-medium text-gray-900">What&apos;s this?</p>
                          <p className="mt-1 text-sm text-gray-500">You constantly see some number and want to know what it could mean?</p>
                        </div>
                        <div className="ml-4 flex shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setShowHint(false)
                              window.localStorage.setItem('showHint', 'false')
                            }}
                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            <span className="sr-only">Close</span>
                            <XMarkIcon aria-hidden="true" className="size-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <div className="absolute bottom-20 mb-6 left-1/2 transform -translate-x-1/2 mb-4">
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
                  onClick={handleSubmitNumber}
                >
                  {!loading ? <span className='text-3xl font-medium text-white '>Go</span> : <Loading />} 
                </button>
              </div>
            </div>
          </>
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
                  <svg width="32" height="32" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" color="white" fill="currentcolor"><path d="M448 0H224C188.7 0 160 28.65 160 64v224c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64V64C512 28.65 483.3 0 448 0zM464 288c0 8.822-7.178 16-16 16H224C215.2 304 208 296.8 208 288V64c0-8.822 7.178-16 16-16h224c8.822 0 16 7.178 16 16V288zM304 448c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V224c0-8.822 7.178-16 16-16h64V160H64C28.65 160 0 188.7 0 224v224c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64v-64h-48V448z"/></svg>
                </button>
                {copied && <span className="text-white text-sm ml-3">Copied!</span>}
              </div>
            </div>

            {!advice && <div className="max-w-3xl mx-auto relative">
              <div className="rounded-lg bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <label htmlFor="comment" className="sr-only">
                  I may be able to help more if you share what&apos;s happening in your life right now?
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  placeholder="I may be able to help more if you share what&apos;s happening in your life right now?"
                  className="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  defaultValue={''}
                  onInput={e => setQuestion((e.target as HTMLTextAreaElement).value)}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div aria-hidden="true" className="py-2">
                  {/* Matches height of button in toolbar (1px border + 36px content height) */}
                  <div className="py-px">
                    <div className="h-9" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
                <div className="shrink-0">
                  <button
                    onClick={handleSubmitQuestion}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {loading && !advice ? 'Channeling..' : 'Get Advice'}
                  </button>
                </div>
              </div>
            </div>}

            {advice && (
              <div className="prose prose-lg text-white p-8 max-w-4xl mx-auto">
                <Markdown>{advice}</Markdown>
                <div className="flex justify-end items-center">
                  <button
                    className={`flex items-center justify-center gap-5 w-[48px] h-[48px] self-start rounded-full ${copied ? 'bg-green-900' : 'bg-gray-900'} px-4 py-3 transition-colors hover:bg-gray-700 md:text-base`}
                    onClick={() => {
                      copyAdvice()
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" color="white" fill="currentcolor"><path d="M448 0H224C188.7 0 160 28.65 160 64v224c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64V64C512 28.65 483.3 0 448 0zM464 288c0 8.822-7.178 16-16 16H224C215.2 304 208 296.8 208 288V64c0-8.822 7.178-16 16-16h224c8.822 0 16 7.178 16 16V288zM304 448c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V224c0-8.822 7.178-16 16-16h64V160H64C28.65 160 0 188.7 0 224v224c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64v-64h-48V448z"/></svg>
                  </button>
                  {copied && <span className="text-white text-sm ml-3">Copied!</span>}
                </div>
              </div>
            )}

            <div className="flex justify-center mt-10">
              <button
                onClick={() => {
                  getReading(null)
                }}
                className="inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
