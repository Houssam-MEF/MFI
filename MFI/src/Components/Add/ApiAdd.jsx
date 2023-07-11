import axios from 'axios';
import React, { useContext, useEffect, useState} from 'react'
import Content from  "../../Content.json" 
import { MfiContext } from '../../Context/MfiContext';

export default function ApiAdd() {

    const {addAgent, setAddAgent} = useContext(MfiContext);

    const changeDate = (evt)=>{
        setStartDate(evt.target.value);
        console.log(Content.Line);
        // console.log(new Date().getMonth().toString());
        // console.log(new Date().getDate().toString() + new Date().getMonth().toString());
        const firstPeriodObj = new Date(evt.target.value);
        const secondPeriodObj = new Date(evt.target.value);
        firstPeriodObj.setMonth(firstPeriodObj.getMonth() + 6);
        secondPeriodObj.setMonth(firstPeriodObj.getMonth() + 12);
        const formattedFirstPeriod = firstPeriodObj.toISOString().split('T')[0];
        const formattedSecondPeriod = secondPeriodObj.toISOString().split('T')[0];
        setFirstPeriod(formattedFirstPeriod);
        setSecondPeriod(formattedSecondPeriod);
    }

    useEffect(() => {
        // Simulating loading JSON data from a file
        const fetchData = async () => {
          const response = await fetch(Content);
          const data = await response.json();
          setJsonData(data);
        };
        setLANG();
      }, []);

    const changeZone = (evt) => {
        setZone(evt.target.value);
        switch (evt.target.value) {
            case "Cutting":
                setCostCenter(71010132);
                break;
            case "Developement":
                setCostCenter(71010256);
                break;
            case "RHN Assembly":
                setCostCenter(71010102);
                break;
            case "RHN Sewing":
                setCostCenter(71010145);
                break;
            case "XJX Sewing":
                setCostCenter(71010131);
                break;
            case "Logistic":
                setCostCenter(71010209);
                break;
            case "Management":
                setCostCenter(71010204);
                break;
            case "Training":
                setCostCenter(71010255);
                break;
    
            default:
                break;
        }
    }

    const addAgentFunc = ()=>{
        axios.post('http://localhost:8000/api/headcount', 
        {id_, matricule, highlight, statut, last_name, first_name,
             gender, cost_center, zone, workstation_type, line, group, contract_type, 
            start_date, first_period, second_period})
            .then((response)=>{
                setMessage(response.data.message);
                setId_('');
                setMatricule('');
                setHighlight('');
                setStatut('');
                setFirstName('');
                setLastName('');
                setGender('');
                setCostCenter('');
                setZone('');
                setWorkstationType('');
                setLine('');
                setGroup('');
                setContractType('');
                setStartDate('');
                setFirstPeriod('');
                setSecondPeriod('')
            }).catch((error)=>{
                console.log(error);
                setMessage("Error : " + error);
            });
            setId_('');
            setMatricule('');
            setHighlight('');
            setStatut('');
            setFirstName('');
            setLastName('');
            setGender('');
            setCostCenter('');
            setZone('');
            setWorkstationType('');
            setLine('');
            setGroup('');
            setContractType('');
            setStartDate('');
            setFirstPeriod('');
            setSecondPeriod('')
    }

  return (
    <>

<div id="insert" className='container-xlg justify-content-center m-auto p-4' style={{border:"2px solid"}}>
        <div className="form-row row p-1" id='form'>   
            
            <div className="form-group col-md-2 p-3" id='id_' >
                <input type="text" className=""   maxLength={5}
                value={addAgent.identifiant} onChange={(e)=>setId_(e.target.value)} required/>
                <label htmlFor="id">{Content["ENG"]["Add"]["Id"]}</label>
            </div>

            <div className='col-md-1'></div>

            <div className="form-group col-md-2 p-3">
                <input type="text" className="" id="matricule" maxLength={5} 
                value={matricule} onChange={(e)=>setMatricule(e.target.value)} required/>
                <label htmlFor="matricule">{Content["ENG"]["Add"]["Matricule"]}</label>
            </div>

            <div className='col-md-1'>

            </div>

            <div className=' col-md-2 row p-auto'>
                <label htmlFor="">{Content["ENG"]["Add"]["Statut"]["0"]} :</label>
                <div className="form-check col-md-4">
                    <label className="form-check-label" htmlFor="direct">
                    <input className="form-check-input" type="radio" name="statut" id="direct" value="Direct"
                    onChange={(e)=>{e.target.checked && setStatut("Direct")}} />
                        {Content["ENG"]["Add"]["Statut"]["1"]}
                    </label>
                </div>

                <div className='col-md-4'>

                </div>

                <div className="form-check col-md-4">
                    <label className="form-check-label" htmlFor="indirect">
                    <input className="form-check-input" type="radio" name="statut" id="indirect" value="Indirect"
                    onChange={(e)=>{e.target.checked && setStatut("Indirect")}} />
                        {Content["ENG"]["Add"]["Statut"]["2"]}
                    </label>
                </div>
            </div>
            
            <div className='col-md-1'></div>

            <div className="form-group col-md-2 p-3">
                <select id="contractType" className="" value={contract_type} 
                onChange={(evt)=>setContractType(evt.target.value)} >
                    <option value={"CDD"}>{Content["ENG"]["Add"]["Contract"]["1"]}</option>
                    <option value={"CDI"}>{Content["ENG"]["Add"]["Contract"]["2"]}</option>
                    <option value={"ANAPEC"}>{Content["ENG"]["Add"]["Contract"]["3"]}</option>
                </select>
                <label htmlFor="contractType">{Content["ENG"]["Add"]["Contract"]["0"]}</label>
            </div>
            
            <div className="form-group col-md-3 p-3">
                <input type="text" className="" id="first_name" 
                value={first_name} onChange={(e)=>setFirstName(e.target.value)} required/>
                <label htmlFor="first_name">{Content["ENG"]["Add"]["First Name"]}</label>
            </div>
            
            <div className="form-group col-md-3 p-3">
                <input type="text" className="" id="last_name" 
                    value={last_name} onChange={(e)=>setLastName(e.target.value)} required/>
                <label htmlFor="last_name">{Content["ENG"]["Add"]["Last Name"]}</label>
                    
            </div>

            <div className='col-md-1'></div>

            <div className=' col-md-3 row p-3'>
                <label htmlFor="">{Content["ENG"]["Add"]["Gender"]["0"]}</label>
                <div className="form-check col-md-4">
                    <label className="form-check-label" htmlFor="male">
                    <input className="form-check-input" type="radio" name="Gender" id="male" value="Male"
                    onClick={(e)=>{e.target.checked && setGender("Male")}} />
                        {Content["ENG"]["Add"]["Gender"]["1"]}
                    </label>
                </div>

                <div className='col-md-2'>

                </div>

                <div className="form-check col-md-4">
                    <label className="form-check-label" htmlFor="female" >
                    <input className="form-check-input" type="radio" name="Gender" id="female" value="Female"
                        onClick={(e)=>{e.target.checked && setGender("Female")}} />
                            {Content["ENG"]["Add"]["Gender"]["2"]}

                    </label>
                </div>
            </div>

            <div className="form-group col-md-3 p-3">
                <select id="zone" className="" value={zone} 
                onChange={(evt)=>changeZone(evt)} >
                    <option disabled selected>Choose...</option>
                    <option value={"Cutting"}>{Content["ENG"]["Add"]["Zone"]["1"]}</option>
                    <option value={"Developement"}>{Content["ENG"]["Add"]["Zone"]["2"]}</option>
                    <option value={"RHN Assembly"}>{Content["ENG"]["Add"]["Zone"]["5"]}</option>
                    <option value={"RHN Sewing"}>{Content["ENG"]["Add"]["Zone"]["6"]}</option>
                    <option value={"XJX Sewing"}>{Content["ENG"]["Add"]["Zone"]["8"]}</option>
                    <option value={"Logistic"}>{Content["ENG"]["Add"]["Zone"]["3"]}</option>
                    <option value={"Mangement"}>{Content["ENG"]["Add"]["Zone"]["4"]}</option>
                    <option value={"Training"}>{Content["ENG"]["Add"]["Zone"]["7"]}</option>
                </select>
                <label htmlFor="zone">{Content["ENG"]["Add"]["Zone"]["0"]}</label>
            </div>
            
            <div className='col-md-1'></div>

            <div className="form-group col-md-2 p-3">
                <select name="" id="" value={line} onChange={(e)=>setLine(e.target.value)}>

                    <option value="" selected disabled>Choose...</option>

{/*                     
                          {[...Array(58)].map((_, index) => {
                            if (index === 0){
                                return null;
                            } else {
                                return (
                                    <option key={index} value={Content["ENG"].Line[index]}>
                                        {Content["ENG"].Line[index]}
                                    </option>
                                )
                            }
                          })} */}
                    
                    

                </select>
                    <label htmlFor="line">{Content["ENG"]["Add"]["Line"]["0"]}</label>
            </div>

            <div className='col-md-1'></div>

            <div className="form-group col-md-2 p-3">
                <select id="group" className="" value={group} 
                onChange={(evt)=>setGroup(evt.target.value)} >
                    <option disabled selected>Choose...</option>
                    <option value={"A"}>{Content["ENG"]["Add"]["Group"]["1"]}</option>
                    <option value={"B"}>{Content["ENG"]["Add"]["Group"]["2"]}</option>
                    <option value={"C"}>{Content["ENG"]["Add"]["Group"]["3"]}</option>
                </select>
                <label htmlFor="group">{Content["ENG"]["Add"]["Group"]["0"]}</label>
            </div>
            
            <div className='col-md-1'></div>


            <div className='col-md-1'></div>
            
            <div className="form-group col-md-4 p-3">
                <input type="date" className="" id="start_date" 
                value={start_date} onChange={(evt)=>changeDate(evt)} />
                <label htmlFor="start_date">{Content["ENG"]["Add"]["Starting Date"]}</label>
            </div>
{/* 
            <div className="form-group col-md-4">
                <label htmlFor="start_date">First Period :</label>
                <input type="date" className="form-control" id="start_date" placeholder="First Period :"
                value={first_period} />
            </div>
            
            <div className="form-group col-md-4">
                <label htmlFor="start_date">Second Period :</label>
                <input type="date" className="form-control" id="start_date" placeholder="Second Period :" 
                value={second_period} />
            </div> */}

        <div className='col-md-10 m-auto d-flex p-5'>
            <button className="btn btn-primary" id="submit" onClick={addAgentFunc}>{Content["ENG"]["Add"]["Add"]}</button>
        </div>

        </div>

        <hr />
        <br />
    </div>





    <hr />

    <br />


    <br /><br />

    {message}
    </>
  )
}
