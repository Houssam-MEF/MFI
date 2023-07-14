import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import MfiContextProvider from './Context/MfiContext'
import 'font-awesome/css/font-awesome.min.css'
import Homepage from './Components/Homepage'
import LogIn from './Components/Identification/login';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <MfiContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/login' element={<LogIn />} />
          {/* <Route path='/home/details' element={<Details data={"toto"}/>} /> */}
        </Routes>
      </BrowserRouter>
    </MfiContextProvider>
    </>
  )
}

export default App
