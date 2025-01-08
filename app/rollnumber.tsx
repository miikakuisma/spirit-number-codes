'use client'

import { useEffect, useState } from 'react';
import './rollnumber.css'

export default function Rollnumber(
  { defaultValue, onChange }: { defaultValue?: string, onChange: (number: number) => void }
) {

  const [numbers, setNumbers] = useState<number[]>([0, 0, 0]);

  // if default number was given, split it to array of numbers and set it to state
  useEffect(() => {
    if (defaultValue) {
      const newNumbers = defaultValue.split('').map(n => parseInt(n))
      setNumbers(newNumbers)
    }
  }, [defaultValue])

  let throttleTimer: NodeJS.Timeout | null = null;

  const renderNumber = (number: number, index: number) => {
    // scroll to selected number
    const scroll = (number: number, index: number) => {
      if (typeof document !== 'undefined') {
        const num = document.querySelector(`.number-column-${index} .num:nth-child(${number})`)
        if (num) {
          num.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    setTimeout(() => {
      scroll(number + 1, index)
    }, 100)

    const handleScroll = () => {
      if (typeof document !== 'undefined') {
        const angel = document.querySelector('img.angel')
        if (angel) {
          // find out which number is scrolled into view
          const column = document.querySelector(`.number-column-${index}`)
          if (column) {
            const scrolledIntoNumber = Math.floor(column.scrollTop / 65)
            const newNumbers = numbers
            newNumbers[index] = scrolledIntoNumber
            if (throttleTimer !== null) {
              clearTimeout(throttleTimer)
            }
            throttleTimer = setTimeout(() => {
              setNumbers(newNumbers)
              if (onChange) {
                onChange(parseInt(newNumbers.join('')))
              }
            }, 600)
          }
          (angel as HTMLElement).style.filter = `hue-rotate(${numbers[0]}${numbers[1]}${numbers[2]}deg)`
        }
      }
    }
  
    return (
      <div
        key={index}
        className={`number-container number-column-${index} bg-gray-900 text-6xl text-white`}
        onScroll={handleScroll}
      >
        <div className="num">0</div>
        <div className="num">1</div>
        <div className="num">2</div>
        <div className="num">3</div>
        <div className="num">4</div>
        <div className="num">5</div>
        <div className="num">6</div>
        <div className="num">7</div>
        <div className="num">8</div>
        <div className="num">9</div>
      </div>
    )
  }

  const numberElements = numbers.map((number, index) => {
    return renderNumber(number, index)
  })

  console.log(numbers)

  return (
    <div className="flex justify-center items-center">
      <div className='rounded-lg bg-gray-900 p-1 flex'>
        {numberElements}
      </div>
    </div>
  )
}
