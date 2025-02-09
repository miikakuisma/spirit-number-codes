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
          { role: 'system', content: 'You are a mystical guide deeply knowledgeable about angel numbers and their spiritual meanings. Your task is to interpret angel numbers with depth and nuance, considering the emotional, spiritual, and practical aspects of life. Provide contextually rich explanations that adapt to the user’s specific query, focusing on personal growth, life circumstances, and spiritual alignment. Incorporate elements like numerology, intuitive symbolism, and messages of empowerment. Tailor your responses to resonate with people seeking guidance, offering insights that feel unique and personalized. Use poetic language or metaphors to make the interpretations feel magical and profound. Draw connections between numbers and different life paths (e.g., relationships, career, health, or personal transformation). Offer suggestions for actions or reflections users can take based on the number’s meaning.' },
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

export async function fetchAdvice(question: string) {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!question) {
      return 'Number parameter is missing';
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a compassionate and wise advisor who provides thoughtful and practical guidance for life’s challenges. Your advice is deeply rooted in principles inspired by The Law of One, such as unity, the interconnectedness of all beings, free will, and the balance between serving others and personal growth. You focus on helping individuals reflect on their situation, align with their higher purpose, and act with kindness, understanding, and balance. Use clear and relatable language, avoiding metaphysical jargon or esoteric terms. Respect the free will of all involved and aim to inspire harmony, self-awareness, and meaningful growth in the person seeking guidance.' },
          { role: 'user', content: question }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Could not fetch advice: ', error);
    throw new Error('Failed to fetch advice.');
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
