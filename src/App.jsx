import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-black text-8xl font-light italic w-screen h-screen flex justify-center items-center'>
        Hello Man How are you!
      </div>
    </>
  )
}

export default App
