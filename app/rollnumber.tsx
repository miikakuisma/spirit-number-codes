'use client'

import { useEffect, useState } from 'react';
import './rollnumber.css'

export default function Rollnumber(
  { defaultValue, onChange }: { defaultValue?: Array<number>, onChange: (numbers: number[]) => void }
) {

  const [numbers, setNumbers] = useState<number[]>([0, 0]);

  useEffect(() => {
    if (defaultValue) {
      setNumbers(defaultValue)
    }
  }, [defaultValue])

  let throttleTimer: NodeJS.Timeout | null = null;

  const addDigit = () => {
    const newNumbers = [...numbers, numbers[numbers.length - 1]]
    setNumbers(newNumbers)
    if (onChange) {
      onChange(newNumbers)
    }
  }

  const removeDigit = () => {
    const newNumbers = numbers.slice(0, numbers.length - 1)
    setNumbers(newNumbers)
    if (onChange) {
      onChange(newNumbers)
    }
  }

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
                onChange(newNumbers)
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
        className={`number-container number-column-${index} bg-gray-900 text-6xl text-white overflow-y-scroll`}
        onScroll={handleScroll}
      >
        {[...Array(10).keys()].map(num => (
          <div key={num} className="num">{num}</div>
        ))}
      </div>
    )
  }

  const numberElements = numbers.map((number, index) => {
    return renderNumber(number, index)
  })

  return (
    <div className='flex'>
      {numbers.length > 1 && <button
        className='text-3xl bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-100 hover:text-black transition-colors w-[32px]'
        onClick={removeDigit}
      >-</button>}
      <div className="rollnumber flex justify-center items-center">
        <div className='rounded-lg bg-gray-900 p-1 flex overflow-hidden'>
          {numberElements}
          <div className="shadow rounded-lg"></div>
        </div>
      </div>
      {numbers.length <= 3 && <button
        className='text-3xl bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-100 hover:text-black transition-colors w-[32px]'
        onClick={addDigit}
      >+</button>}
    </div>
  )
}
