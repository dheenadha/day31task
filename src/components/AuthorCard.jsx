import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as yup from 'yup';

const AuthorCard = ({url,data,id,setData,bio,born,name}) => {
    const [edit,setEdit] = useState(false)
    // get Data
    const getData=()=>{
        axios.get(url).then(res=>setData(res.data))
    }
    // delete
    const handleDelete=(id)=>{
        axios.delete(`${url}/${id}`)
        getData()
    }
    const formValidationFormik = yup.object({
        name: yup.string().min(5,"Atleast 5 characters").max(15,"Maximum 15 characters allowed").required("Required"),
        born : yup.date().required("Required"),
        bio: yup.string().min(3,"Atleast 3 characters").max(50,"Maximum 50 characters allowed").required("Required")
    })
    const formik = useFormik({
        initialValues : {
            name : name,
            born : born,
            bio :bio
        },
        validationSchema : formValidationFormik
        
    })
    // edit
    const handleEdit = (id)=>{
        const data = JSON.stringify(formik.values)
        setEdit(!edit)
        axios.put(`${url}/${id}`,data,{headers: {
                'Content-Type': 'application/json'
            }})
            getData()
    }
  return (
    <>
        <div className="card m-1" style={{width: "15rem"}}>
        <div className="card-body" >
            <h4 className="card-title">{edit?<input type="text" name="name" id="" value={formik.values.name} placeholder="Enter Author Name" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            :name}</h4>
            <h6 className="card-title">{edit?<input type="text" name="born" id="" value={formik.values.born} placeholder="Enter Author DOB" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            :born}</h6>
            <p className="card-text" style={{height:"6rem",overflow:"auto"}}>{edit?<input type="text"  name="bio" id="" value={formik.values.bio} placeholder="Enter bio" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            :bio}</p>
        </div>
        <div className="card-body">
            {edit && <button className="card-link btn btn-primary" onClick={()=>setEdit(!edit)}>X</button>}
            <button className="card-link btn btn-warning" onClick={()=>handleEdit(id)}>{edit?"Save":"Edit"}</button>
            <button className="card-link btn btn-danger" onClick={()=>handleDelete(id)}>Delete</button>
        </div>
        </div>
    </>
  )
}

export default AuthorCard