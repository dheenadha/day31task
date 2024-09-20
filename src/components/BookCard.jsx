import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup';

const BookCard = ({url,id,title,author,isbn,publishDate,data,setData}) => {
   
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
        Birth: yup.number().required("Required").min(1000000000,"ISBN should have 10 digits").max(9999999999,"Invalid ISBN"),
        publishDate : yup.date().required("Required"),
        author: yup.string().min(3,"Atleast 3 characters").max(15,"Maximum 15 characters allowed").required("Required")
    })
    const formik = useFormik({
        initialValues : {
            title : title,
            isbn : isbn,
            publishDate : publishDate,
            author :author
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
        <div className="card m-1" style={{width: "18rem"}}>
        <div className="card-body" >
            <h4 className="card-title">{edit?<input style={{width: "14rem"}} type="text" name="title" id="" value={formik.values.title} placeholder="Enter title" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            :title}</h4>
            <p className="card-text">{edit?<input type="text"  name="author" id="" value={formik.values.author} placeholder="Enter author name" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            :author}</p>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">ISBN : {edit?<input type="number" name="isbn" id="" value={formik.values.isbn} placeholder="Enter isbn number" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            :isbn}</li>
            <li className="list-group-item">Publish Date : {edit?<input type="date" name="publishDate" id="" value={formik.values.publishDate} placeholder="Enter publish date" onChange={formik.handleChange} onBlur={formik.handleChange}/>
            :publishDate}</li>
        </ul>
        <div className="card-body">
            {edit && <button className="card-link btn btn-primary" onClick={()=>setEdit(!edit)}>X</button>}
            <button className="card-link btn btn-warning" onClick={()=>handleEdit(id)}>{edit?"Save":"Edit"}</button>
            <button className="card-link btn btn-danger" onClick={()=>handleDelete(id)}>Delete</button>
        </div>
        </div>
    </>
  )
}

export default BookCard