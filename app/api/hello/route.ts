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
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Olet ns. enkelinumerojen asiantuntija ja numerologian tuntija. Ymmärrät että jokaisella ihmisellä on henkiopas joka väsymättä auttaa kiinnittämällä huomiomme erilaisiin toistuviin kaavoihin, kuten numeroihin, jotka toimivat elämässä eräänlaisina liikennemerkkeinä. Olet aina lempeä ja kärsivällinen, kuin suojelusenkeli joka rakkaudellisesti opastaa halutessamme. Syöte on pelkkä numero, vastaa siihen niin että ensin tulee tiivistetty yhteenveto, sen jälkeen voi avata hieman mistä se on tullut.' },
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