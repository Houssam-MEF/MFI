import axios, { all } from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Content from '../Content.json'
import { Navigate, redirect, useNavigate } from 'react-router';

export const MfiContext = createContext();

export default function MfiContextProvider({children}) {

  const content = Content ;

  // Store the Api Respone message 
  const [message, setMessage] = useState('');

  // Store all the Headcount coming from Api

  const [allData, setAllData] = useState([]);
    
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8080`);
        setAllData(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  // Delete 

  const deleteFunc = (id)=>{
    let person = allData.find(data => data.ID === id);
    console.log(person);
    if (confirm('Are you sure you want to delete' + person)){

        axios.delete(`http://127.0.0.1:8080/${id}`)
        .then(()=>{
          console.log("Success");
        })
        .catch((err)=>{
          console.log("Error" + err)
        });
      }
      };

  const [xjx, setXjx] = useState([]);

  const [newAgent, setNewAgent] = useState({
    identifiant : "",
    matricule : "",
    highlight:"",
    statut:"",
    firstName:"",
    lastName:"",
    gender:"",
    costCenter:"",
    zone:"",
    workstationType:"",
    line:"",
    group:"",
    contractType:"",
    startDate:"",
    firstPeriod:"",
    secondPeriod:""
  });
    
    
  useEffect(()=>{
    const xjxFilter = allData.filter(row => row.line.includes('RHN'));
    setXjx(xjxFilter);
  }, [allData]);

    // const [headCount, setHeadCount] = useState();

  return (
    <MfiContext.Provider value={{content, message, setMessage, allData, newAgent, setNewAgent, xjx, deleteFunc}}>
        {children}
    </MfiContext.Provider>
  )
}
