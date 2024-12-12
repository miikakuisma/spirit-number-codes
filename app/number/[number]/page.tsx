'use server'

import { Suspense } from 'react';
import Loading from '../loading';
import Reading from '../reading';

export default async function Page(props: { params: Promise<{ number: string }> }) {
  const params = await props.params
  const number = params.number
  
  return (
    <>
      <main className="">
        <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">Enkelinumero {number}</h1>
        </header>
        
        <div className="flex items-center gap-x-4 justify-center">
          <div className="prose prose-lg max-w-none w-full">
            <Suspense fallback={<Loading />}>
              <Reading number={number} />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  )
}
