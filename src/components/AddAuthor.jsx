import React, { useState } from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup';
import axios from 'axios';
const url = 'http://localhost:3000/Authors'

 
const AddAuthor = ({data,setData}) => {
    // get Data
    const getData=()=>{
        axios.get(url).then(res=>setData(res.data))
    }
    const formValidationFormik = yup.object({
        name: yup.string().min(5,"Atleast 5 characters").max(15,"Maximum 15 characters allowed").required("Required"),
        born : yup.date().required("Required"),
        bio: yup.string().min(3,"Atleast 3 characters").max(100,"Maximum 100 characters allowed").required("Required")
    })
    const formik = useFormik({
        initialValues : {
            name : "",
            born : "",
            bio :""
        },
        validationSchema : formValidationFormik,
        onSubmit : (values) =>{
            
            axios.post(url,values,{headers: {
                'Content-Type': 'application/json'
            }})
            getData()
            formik.values.bio = ""
            formik.values.born = ""
            formik.values.name = ""
        }
    })
  return (
   <>
       <div className="container">
        <form onSubmit={formik.handleSubmit}>
        <div className="row">
            {/* author name */}
        <div className="form-group col m-1">
            <label for="name" className='text-primary'>Author name</label>
            <input type="text" class="form-control m-2" name="name" id="" value={formik.values.name} placeholder="Enter name" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            <small class="form-text text-muted">{formik.errors.name}</small>
        </div>
        {/* author bio */}
        <div className="form-group col m-1">
            <label for="bio" className='text-primary'>Bio</label>
            <input type="text" class="form-control m-2" name="bio" id="" value={formik.values.bio} placeholder="Enter bio" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            <small class="form-text text-muted">{formik.errors.bio}</small>
        </div>
        </div>
        <div className="row">
            {/* author born */}
        
        <div className="form-group col m-1">
            <label for="born" className='text-primary '>Author DOB</label>
            <input type="date" class="form-control m-2 " name="born" id="" value={formik.values.born} placeholder="Enter DOB" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            <small class="form-text text-muted">{formik.errors.born}</small>
        </div>
        </div>
        <input className='btn btn-primary m-1' type="submit" value="Add Author" />
        </form>
        just to see
        {JSON.stringify(formik.values)}
        {JSON.stringify(formik.errors)}
        <hr/>
        
       </div>
   </>
  )
}

export default AddAuthor