import React, { useState } from 'react'

let initialstate={
  title:"",
  price:"",
  description:"",
  category:"",
  image:""
}

const Postproduct = () => {
  const [formdata,setformdata]=useState(initialstate)
  const handlechange=(e)=>{7
    setformdata({...formdata,[e.target.name]:e.target.value})
  }
  const handlesubmit=(e)=>{
    e.preventDefault()
    // console.log(formdata)
    fetch("http://localhost:3000/product",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formdata)
    }).then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))
  }
  const {image,price,description,title,category}=formdata
  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={(e)=>handlesubmit(e)}>
        <input onChange={(e)=>handlechange(e)} type="text" name='image' value={image} placeholder='Image' /> <br />
        <input onChange={(e)=>handlechange(e)} type="text" name='title' value={title} placeholder='title' /> <br />
        <select name='category' value={category} onChange={(e)=>handlechange(e)}>
        <option value={""}>Select Your Category</option>
        <option value={"men's clothing"}>men's clothing</option>
        <option value={"jewelery"}>jewelery</option>
        <option value={"electronics"}>electronics</option>
        <option value={"women's clothing"}>women's clothing</option>
        </select>
        <input onChange={(e)=>handlechange(e)} type="text" name='price' value={price} placeholder='price' /> <br />
        <input onChange={(e)=>handlechange(e)} type="text" name='description' value={description} placeholder='description' /> <br />
        <input type="submit" /> <br />
      </form>
    </div>
  )
}

export default Postproduct
