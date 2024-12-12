/* eslint-disable @next/next/no-img-element */
'use client'

// import { useState } from 'react'
// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Home() {

  return (
    <div className="bg-gray-900">
      <div className="relative isolate overflow-hidden pt-14 h-screen">
        <img
          alt=""
          src="/angel.jpg"
          className="absolute inset-0 -z-10 w-screen h-screen object-cover"
        />
        {/* <div className="mx-auto max-w-7xl">
          <div className="absolute bottom-0 left-0 w-screen mx-auto p-10 bg-black bg-opacity-60">
            <div className="text-center">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-5xl">
                Spirit Number Codes
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-white sm:text-xl/8">
                Are you seeing the same number over and over again?
                It could be a message from the your spirit guides.
                Find out what it means and how it can help you in your life.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/number" className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400">
                  Get Reading
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
