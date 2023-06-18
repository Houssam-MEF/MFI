import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import MfiContextProvider from './Context/MfiContext'
import 'font-awesome/css/font-awesome.min.css'
import Homepage from './Components/Homepage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <MfiContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          {/* <Route path='/home/details' element={<Details data={"toto"}/>} /> */}
        </Routes>
      </BrowserRouter>
    </MfiContextProvider>
    </>
  )
}

export default App
