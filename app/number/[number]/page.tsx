'use server'

import { Suspense } from 'react';
import Loading from '../loading';
import Reading from '../reading';

export default async function Page(props: { params: Promise<{ number: string }> }) {
  const params = await props.params
  const number = params.number
  
  return (
    <>
      <div className="flex items-center gap-x-4 justify-center">
        <div className="prose prose-lg max-w-none w-full">
          <Suspense fallback={<Loading />}>
            <Reading number={number} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
