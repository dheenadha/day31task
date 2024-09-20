// formik use cheyali
import React, { useState } from 'react'
import {useFormik} from 'formik'
// using yup for validations
import * as yup from 'yup';
import axios from 'axios';
const url = 'http://localhost:3000/Books'

 
const AddBook = ({data,setData}) => {
    // get Data
    const getData=()=>{
        axios.get(url).then(res=>setData(res.data))
    }
    const formValidationFormik = yup.object({
        name: yup.string().min(5,"Atleast 5 characters").max(15,"Maximum 15 characters allowed").required("Required"),
        Birth: yup.number().required("Required").min(1000000000,"ISBN should have 10 digits").max(9999999999,"Invalid ISBN"),
        publishDate : yup.date().required("Required"),
        author: yup.string().min(3,"Atleast 3 characters").max(15,"Maximum 15 characters allowed").required("Required")
    })
    const formik = useFormik({
        initialValues : {
            title : "",
            isbn : "",
            publishDate : "",
            author :""
        },
        validationSchema : formValidationFormik,
        onSubmit : (values) =>{
            
            axios.post(url,values,{headers: {
                'Content-Type': 'application/json'
            }})
            getData()
            formik.values.title = ""
            formik.values.isbn = ""
            formik.values.publishDate = ""
            formik.values.author = ""
        }
    })
  return (
   <>
       <div className="container">
        <form onSubmit={formik.handleSubmit}>
        <div className="row">
            {/* title */}
        <div className="form-group col m-1">
            <label for="title" className='text-primary'>Title</label>
            <input type="text" class="form-control m-2" name="title" id="" value={formik.values.title} placeholder="Enter title" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            <small class="form-text text-muted">{formik.errors.title}</small>
        </div>
        {/* author */}
        <div className="form-group col m-1">
            <label for="author" className='text-primary'>Author</label>
            <input type="text" class="form-control m-2" name="author" id="" value={formik.values.author} placeholder="Enter author name" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            <small class="form-text text-muted">{formik.errors.author}</small>
        </div>
        </div>
        <div className="row">
            {/* isbn */}
        <div className="form-group col m-1">
            <label for="isbn" className='text-primary'>ISBN</label>
            <input type="number" class="form-control m-2" name="isbn" id="" value={formik.values.isbn} placeholder="Enter isbn number" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            <small class="form-text text-muted">{formik.errors.isbn}</small>
        </div>
        {/* publishDate */}
        <div className="form-group col m-1">
            <label for="publishDate" className='text-primary '>Publilsh Date</label>
            <input type="date" class="form-control m-2 " name="publishDate" id="" value={formik.values.publishDate} placeholder="Enter publish date" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            <small class="form-text text-muted">{formik.errors.publishDate}</small>
        </div>
        </div>
        <input className='btn btn-primary m-1' type="submit" value="Add Book" />
        </form>
        just to see
        {JSON.stringify(formik.values)}
        {JSON.stringify(formik.errors)}
        <hr/>
        
       </div>
   </>
  )
}

export default AddBook