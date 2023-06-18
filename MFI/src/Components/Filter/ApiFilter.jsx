import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { MfiContext } from "../../Context/MfiContext"

export default function Filter() {

  const {allData} = useContext(MfiContext);


    const [filter, setFilter] = useState();
    const [content, setContent] = useState();
    const [attribute, setAttribute] = useState();
    const [headCount, setHeadCount] = useState('');
    const [headCounts, setHeadCounts] = useState([]);

    useEffect(()=>{
        if (headCount !== "")
        {
            axios.get(`http://localhost:8000/api/filter?p=${headCount}`)
            .then(response=> setHeadCounts(response.data))
        } else {
            setHeadCounts(allData);
        }
    }, [headCount]);

    const changeFilter = (evt)=>{
      setAttribute(evt.target.value);
      console.log(evt.target.value);
      if (evt.target.value === "id"){
        const [id, setId] = useState();
        setContent(<input value={id} onChange={(e)=>setId(e.target.value)} />);

      }
    }

  return (
    <>
      <h1>Filter</h1>

      <div className="form-group col-md-2 p-3">
        <select id="contractType" className="" value={attribute} 
        onChange={(evt)=>changeFilter(evt)} >
          <option value={"id"}>id</option>
          <option value={"tel"}>tel</option>
          </select>
        <label htmlFor="contractType">Contract Type</label>
      </div>
      
      <div id='div'>
        {content}
      </div>

      <input type="text" value={headCount} onChange={(e)=>setHeadCount(e.target.value)}/>

      {
        headCounts.map((temp, index)=>{

            return (
                <li key={index}> {filter} ** {temp.first_name} </li>
                )
            }
                )
      }
              
    </>
  )
}
