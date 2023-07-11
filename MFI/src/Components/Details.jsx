import React, { useContext, useState } from 'react'
import { MfiContext } from '../Context/MfiContext';
import { ModalContext } from '../Context/ModalContext';


export default function Details({data, modal}) {

  // const [isVisible, setIsVisible] = useState(true);

  // const {modal, setModal} = useContext(ModalContext);

  const {content, deleteFunc} = useContext(MfiContext);


  // const [modal, setModal] = useState();

  // document.addEventListener('mousedown', ()=>modal(false));


  return (
    <>
    <div id='details' style={{ width:"100%", height:"100%"}} className='row justify-content-center'>
      <div className="col-sm-8 mb-3 mb-sm-0 p-3">
        <div className="card border-dark border-3 rounded-3">

          {/* Card Header */}
          <div className='card-header bg-secondary text-light rounded-3 m-1 row' >
            <h5 className="card-title col-md-2"> {content["ENG"]["Home"]["Id"]} </h5> 
            <h5 className="card-title col-md-2"> {data.identifiant} </h5> 
            <h5 className='card-title text-center'>{data.last_name + " " + data.first_name}</h5>
          </div>
            
          {/* Style Bar */}
          <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar"></div>
          </div>

          {/* Card Body */}
          <div className="card-body p-0 m-2" >
            
            <button onClick={()=>modal(false)}>X</button>
          
            {/* Line */}
            <div className='card-text' id='line'>
              <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Line"]} </section>
              <p className="card-text d-inline"> {data.line} </p>
            </div>

            {/* Matricule */}
            <div className='card-text' id='matricule'>
                <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Matricule"]} </section>
                <p className="card-text d-inline"> {data.matricule} </p>
            </div>

            {/* Highlight */}
            <div className='card-text' id='highlight'>
                <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Highlight"]} </section>
                <p className="card-text d-inline"> {data.highlight} </p>
            </div>

            {/* Statut */}
            <div className='card-text' id='statut'>
                <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Statut"]} </section>
                <p className="card-text d-inline"> {data.statut} </p>
            </div>

            {/* Workstation Type */}
            <div className='card-text' id='workstation -type'>
                <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Workstation Type"]} </section>
                <p className="card-text d-inline"> {data.workstation_type} </p>
            </div>

            {/* Zone */}
            <div className='card-text' id='zone'>
                <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Zone"]} </section>
                <p className="card-text d-inline"> {data.zone} </p>
            </div>

            {/* Cost Center */}
            <div className='card-text' id='cost-center'>
                <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Cost Center"]} </section>
                <p className="card-text d-inline"> {data.cost_center} </p>
            </div>

            {/* Gender */}
            <div className='card-text' id='gender'>
                <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Gender"]} </section>
                <p className="card-text d-inline"> {data.gender} </p>
            </div>

            {/* Contract Type */}
            <div className='card-text' id='contract'>
                <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Contract"]} </section>
                <p className="card-text d-inline"> {data.contract_type} </p>
            </div>

            {/* Starting Date */}
            <div className='card-text' id='starting-date'>
                <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Starting Date"]} </section>
                <p className="card-text d-inline"> {data.start_date} </p>
            </div>

            {/* First Period */}
            <div className='card-text' id='first-period'>
                <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["First Period"]} </section>
                <p className="card-text d-inline"> {data.first_period} </p>
            </div>

            {/* Second Period */}
            <div className='card-text' id='second-period'>
                <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Second Period"]} </section>
                <p className="card-text d-inline"> {data.second_period} </p>
            </div>

            {/* Delete */}
            <div className='card-btn' id='Delete'>
                <button className='card-btn d-inline-block border' onClick={()=>deleteFunc(data.ID)}> {content["ENG"]["Home"]["Delete"]} </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  )
  
}

