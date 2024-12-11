export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
import axios from 'axios';

export async function GET(request: Request) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Olet rahoitusalan asiantuntija jolta ei koskaan lopu ideat kesken aiheesta: kuinka tehdä rahaa.' },
        { role: 'user', content: 'Kerro jokin hyvä sijoitusvinkki' }
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