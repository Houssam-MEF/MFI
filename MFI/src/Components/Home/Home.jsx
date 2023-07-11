
import React, { useContext, useState } from 'react'
import { MfiContext } from '../../Context/MfiContext'
import './home.css'
import Operator from '../Operator';
import "@fortawesome/fontawesome-free"


export default function Home() {

  const {allData} = useContext(MfiContext);
  const [slide, setSlide] = useState(false);
  const [index, setIndex] = useState(0);

  

  const rightSlide = () => {
    setSlide(!slide);
    setIndex(index+4);
  };

  const leftSlide = () => {
    setSlide(!slide);
    setIndex(index-4);
  };

  
  // console.log(allData.length);

  return (

    <>
    <div className= {`container-fluid row d-flex`} id='home'  >
      <div className='col-md-12 m-auto p-3' id='allData'>

        {
          allData ? (                    
            allData.map(row => <Operator element={row} /> )
          ) : (
            <tr>Loadin...</tr>
          )
        }

      </div>
    </div>
    </>
  )
}
