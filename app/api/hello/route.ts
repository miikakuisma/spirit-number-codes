export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
import axios from 'axios';

export async function GET(request: Request) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const url = new URL(request.url);
  const number = url.searchParams.get('number');

  if (!number) {
    return new Response('Number parameter is missing', { status: 400 });
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
  
  return new Response(response.data.choices[0].message.content);
}

export const runtime = 'nodejs';
export const maxDuration = 15;