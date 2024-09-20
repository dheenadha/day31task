import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddAuthor from './AddAuthor'
import AuthorCard from './AuthorCard'
import axios from 'axios'

const Authors = () => {
  const navigate = useNavigate()
  const [addauthor,setAuthor] = useState(false)
  const [data,setData] = useState([])
  const url = 'http://localhost:3000/Authors'
  // get Data
  const getData=()=>{
    axios.get(url).then(res=>setData(res.data))
  }
  useEffect(()=>getData(),[data])
return (
  <>
      <div className="m-2" style={{width:"100%",height:"50px"}}>
        <input className='btn btn-primary float-end m-1' type="submit" value="Back to Home" onClick={()=>navigate(-1)} />
        <input className='btn btn-primary float-end m-1' type="submit" value={addauthor?"Close":"Add Author"} onClick={()=>setAuthor(!addauthor)} />
      </div>
      {addauthor && <AddAuthor data={data} setData={setData} />}
      <div className='cardArea d-flex flex-wrap gap-4 m-3 '>
        {data.map((e,i) => <AuthorCard key={i} url={url} {...e} data={data} setData={setData} />)}
      </div>
  </>
)
}

export default Authors