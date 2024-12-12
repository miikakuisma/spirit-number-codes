'use server';

import axios from 'axios';

export async function fetchReading(number: number) {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!number) {
      return 'Number parameter is missing';
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Olet enkelinumerojen ja numerologian asiantuntija. Numerosta toivotaan mahdollisimman kattava ja monipuolinen tulkinta.' },
          { role: 'user', content: number.toString() }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Could not fetch reading: ', error);
    throw new Error('Failed to fetch reading.');
  }
}