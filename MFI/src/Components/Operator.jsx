import React, { useContext, useRef, useState } from 'react'
import Details from './Details'
import "./operator.css"
import { MfiContext } from '../Context/MfiContext';


export default function Operator({element}) {

 

    // const {modal, setModal} = useContext(ModalContext);

    const {content, setContent} = useContext(MfiContext);
    const [modal, setModal] = useState(false);

    const [detail, setDetail] = useState(false);

    // alert(typeof detail)

    const divRef = useRef();

    // if (!detail){
    //     divRef.current.style.opacity = '0.5';
    // }

    // const toggleDetail = ()=>{
    //   setDetail(!detail);
    // }

  return (
    <>

    {/*  */}
    
    <div id="parent-operator" className="col-md-3 p-3 ">
        <div className="card border-dark border-3 rounded-3" id='card'>

            {/* Card Header */}
            <div className='card-header text-dark rounded-3 m-1' >
                <h5 className="card-title">{"ID : "+ element.identifiant }</h5>
                <h5>{element.last_name + " " + element.first_name}</h5>
            </div>
            
            {/* Style Bar */}
            <div class="bar">
                <div class="emptybar"></div>
                <div class="filledbar"></div>
            </div>

            {/* Card Body */}
            <div className="card-body p-0 m-2" >

                {/* Line */}
                <div className='card-text' id='line'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Line"]} </section>
                    <p className="card-text d-inline"> {element.line} </p>
                </div>

                {/* Matricule */}
                <div className='card-text' id='matricule'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Matricule"]} </section>
                    <p className="card-text d-inline"> {element.matricule} </p>
                </div>

                {/* Highlight */}
                <div className='card-text' id='highlight'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Highlight"]} </section>
                    <p className="card-text d-inline"> {element.highlight} </p>
                </div>

                {/* Statut */}
                <div className='card-text' id='statut'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Statut"]} </section>
                    <p className="card-text d-inline"> {element.statut} </p>
                </div>

                {/* Workstation Type */}
                <div className='card-text' id='workstation -type'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Workstation Type"]} </section>
                    <p className="card-text d-inline"> {element.workstation_type} </p>
                </div>

                {/* Zone */}
                <div className='card-text' id='zone'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Zone"]} </section>
                    <p className="card-text d-inline"> {element.zone} </p>
                </div>

                {/* Cost Center */}
                <div className='card-text' id='cost-center'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Cost Center"]} </section>
                    <p className="card-text d-inline"> {element.cost_center} </p>
                </div>

                {/* Gender */}
                <div className='card-text' id='gender'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Gender"]} </section>
                    <p className="card-text d-inline"> {element.gender} </p>
                </div>

                {/* Contract Type */}
                <div className='card-text' id='contract'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Contract"]} </section>
                    <p className="card-text d-inline"> {element.contract_type} </p>
                </div>

                {/* Starting Date */}
                <div className='card-text' id='starting-date'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Starting Date"]} </section>
                    <p className="card-text d-inline"> {element.start_date} </p>
                </div>

                {/* First Period */}
                <div className='card-text' id='first-period'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["First Period"]} </section>
                    <p className="card-text d-inline"> {element.first_period} </p>
                </div>

                {/* Second Period */}
                <div className='card-text' id='second-period'>
                    <section className='card-text d-inline-block border'> {content["ENG"]["Home"]["Second Period"]} </section>
                    <p className="card-text d-inline"> {element.second_period} </p>
                </div>


                <button className="link text-end" onClick={()=>setModal(true)}>Details</button>
                </div>
            </div>
        </div>
        
        <div id='toggle'>
            {
                modal && <Details data={element} modal={setModal} />
            }
        </div>

    </>
  )
}
