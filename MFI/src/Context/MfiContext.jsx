import axios, { all } from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const MfiContext = createContext();

export default function MfiContextProvider({children}) {

    const [allData, setAllData] = useState([]);

    const [xjx, setXjx] = useState([]);

    const [LANG, setLANG] = useState("Line");

    // const [addAgent, setAddAgent] = useState({
    //   id_ : "", matricule:"", highlight:"", 
    //   statut:"", firstName:"", lastName:"", gender:"", 
    //   costCenter:"", zone:"", workstationType:"", line:"",
    //   group:"", contractType:"", startDate:"", firstPeriod:"", secondPeriod:""
    // });
    
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/headcount`)
        .then(response => {setAllData(response.data);})
        .catch(error => {console.error('Error' , error);});
    }, []);

    useEffect(()=>{
      const xjxFilter = allData.filter(row => row.line.includes('RHN'));
      setXjx(xjxFilter);
    }, [allData]);

    // const [headCount, setHeadCount] = useState();

  return (
    <MfiContext.Provider value={{allData, xjx, LANG, setLANG}}>
        {children}
    </MfiContext.Provider>
  )
}
