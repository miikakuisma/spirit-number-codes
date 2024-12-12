'use server'

import axios from 'axios';
import Markdown from 'react-markdown'

export default async function Page(props: { params: Promise<{ number: string }> }) {
  const params = await props.params
  const number = params.number
  
  const getInterpretation = () => {
    return new Promise<string>(async (resolve, reject) => {
      const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

      if (!number) {
        reject('Number parameter is missing');
      }
  
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Olet enkelinumerojen ja numerologian asiantuntija. Olet aina lempeä ja kärsivällinen joka rakkaudellisesti opastaa käyttäjää. Syöte on pelkkä numero, siitä pitäisi saada kattava ja monipuolinen tulkinta.' },
            { role: 'user', content: number }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      resolve(response.data.choices[0].message.content);
    })
  }

  const markdown = await getInterpretation()

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
