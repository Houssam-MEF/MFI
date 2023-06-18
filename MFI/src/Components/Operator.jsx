import React, { useContext, useRef, useState } from 'react'
import Details from './Details'


export default function Operator({element}) {

 

    // const {modal, setModal} = useContext(ModalContext);
    const [modal, setModal] = useState(false);

    const allData = element;

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

        <div id="parent" className="col-md-3mb-3 mb-sm-0 p-1 p-2 ">
            <div className="card border-dark border-4 rounded-4" id='card'>
                <div className='card-header bg-light text-dark rounded-3 m-1'>
                    <h5 className="card-title">{"#: "+ allData.id_ }</h5>
                    <h5>{allData.last_name + " " + allData.first_name}</h5>
                </div>
            <div class="bar">
                <div class="emptybar"></div>
                <div class="filledbar"></div>
            </div>
                <div className="card-body p-0 m-2" >
                    <div className='row'>
                        <p className="card-text col-5 m-2 d-flex" id='gender'>
                            {" "+allData.line}
                        </p>
                    </div>
                    <div className='row'>
                        <p className="card-text col-5 m-2" id='gender'>{allData.matricule}</p>
                        <p className="card-text col-5 m-2" id=''>{allData.statut}</p>
                    </div>
                    <div className='row'>
                        <p className="card-text col-5 m-2 d-flex" id='gender'>
                            {" "+allData.gender}
                        </p>
                    </div>
                    <div className='row'>
                        <p className="card-text col-5 m-2 d-flex" id='gender'>
                            Shift : {" "+allData.group}
                        </p>
                    </div>
                    <p className="card-text" id='startD'>{allData.start_date}</p>
                    {/* <button className="link text-end" onClick={()=>setModal(true)}>Details</button> */}
                </div>
            </div>
        </div>
        <div id='toggle'>
            {
                modal && <Details data={allData} modal={setModal} />
            }
        </div>

    </>
  )
}
