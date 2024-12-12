import { fetchReading } from '../data'
import Markdown from 'react-markdown'

export default async function Reading(props: { number: string }) {
  const number = props.number
  
  const [markdown] = await Promise.all([
    fetchReading(number),
  ]);

  return (
    <>
      <div className="flex items-center gap-x-4 justify-center">
        <div className="prose prose-lg max-w-none w-max text-white p-8">
          <Markdown>{markdown}</Markdown>
        </div>
      </div>
    </>
  )
}
