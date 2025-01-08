'use server';

import axios from 'axios';
import OpenAI from 'openai';
const openai = new OpenAI();

export async function fetchReading(number: string) {
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
          { role: 'system', content: 'Give angel number reading of a given number' },
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

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Could not fetch reading: ', error);
    throw new Error('Failed to fetch reading.');
  }
}

export async function generateSpeech(reading: string) {
  try {
    // const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!reading) {
      return 'Reading parameter is missing';
    }

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: reading,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer
  } catch (error) {
    console.error('Could not fetch reading: ', error);
    throw new Error('Failed to fetch reading.');
  }
}
