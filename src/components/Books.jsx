import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddBook from './AddBook'
import BookCard from './BookCard'
import axios from 'axios'

const Books = () => {
    const navigate = useNavigate()
    const [addbook,setAddbook] = useState(false)
    const [data,setData] = useState([])
    const url = 'http://localhost:3000/Books'
    // get Data
    const getData=()=>{
      axios.get(url).then(res=>setData(res.data))
    }
    useEffect(()=>getData(),[data])
  return (
    <>
        <div className="m-2" style={{width:"100%",height:"50px"}}>
          <input className='btn btn-primary float-end m-1' type="submit" value="Back to Home" onClick={()=>navigate(-1)} />
          <input className='btn btn-primary float-end m-1' type="submit" value={addbook?"Close":"Add New Book"} onClick={()=>setAddbook(!addbook)} />
        </div>
        {addbook && <AddBook data={data} setData={setData} />}
        <div className='cardArea d-flex flex-wrap gap-4 m-3 '>
          {data.map((e,i) => <BookCard key={i} url={url} {...e} data={data} setData={setData} />)}
        </div>
    </>
  )
}

export default Books