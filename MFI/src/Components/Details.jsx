import React, { useContext, useState } from 'react'
import { MfiContext } from '../Context/MfiContext';
import { ModalContext } from '../Context/ModalContext';


export default function Details({data, modal}) {

  // const [isVisible, setIsVisible] = useState(true);

  // const {modal, setModal} = useContext(ModalContext);


  // const [modal, setModal] = useState();

  document.addEventListener('mousedown', ()=>modal(false));


  return (
    <>
    <div id='details' style={{ width:"100%", height:"100%"}} className='row justify-content-center'>
      <div className="col-sm-8 mb-3 mb-sm-0 p-3">
        <div className="card border-dark border-4 rounded-4">
          <div className='card-header bg-secondary text-light rounded-3 m-1'>
            <h5 className="card-title u"># : {data.id_} </h5> 
            <h5 className='card-title text-center'>{data.last_name + " " + data.first_name}</h5>
          </div>
          <div className="card-body">
            <button onClick={()=>modal(false)}>X</button>
            <p className="card-text"><i className="fa-light fa-circle-info" />Highlight: <span className='text-center'> {data.highlight} </span></p>
            <p className="card-text">{data.gender}</p>
            <p className="card-text">{data.statut}</p>
            <p className="card-text">{data.cost_center}</p>
            <p className="card-text">{data.zone}</p>
            <p className="card-text">{data.workstation_type}</p>
            <p className="card-text">{data.line}</p>
            <p className="card-text">{data.group}</p>
            <p className="card-text">{data.contract_type}</p>
            <p className="card-text">{data.start_date}</p>
            <p className="card-text">{data.first_period}</p>
            <p className="card-text">{data.second_period}</p>

          </div>
        </div>
      </div>
    </div>

    </>
  )
  
}

