import { fetchReading } from '../data'
import Markdown from 'react-markdown'

export default async function Reading(props: { number: number }) {
  const number = props.number
  
  const [markdown] = await Promise.all([
    fetchReading(number),
  ]);

  return (
    <>
      <main className="">
        <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">Enkelinumero {number}</h1>
        </header>
        
        <div className="flex items-center gap-x-4 justify-center">
          <div className="prose prose-lg max-w-none w-full">
            <Markdown>{markdown}</Markdown>
          </div>
        </div>
      </main>
    </>
  )
}
