import React, { useEffect, useState } from 'react'
// import ProductCard from './ProductCard'

const Product = () => {

  const [data,setdata]=useState([]);
  const [id,setid]=useState(0)
  const [updateprice,setupdateprice]=useState(0)

  //Get Product Function
  const fetchdata = ()=>{
    fetch("http://localhost:3000/product")
    .then((res)=>res.json())
    .then((data)=>setdata(data))
    .catch((err)=>console.log(err))
  };

  //Delet Product Function
  const deleteProduct=(id)=>{
    fetch(`http://localhost:3000/product/${id}`, {
      method:"DELETE",
    }).then((res)=>res.json())
    .then((data)=>{
      alert("Product deleted");
      fetchdata()
    }).catch((err)=>console.log(err))
  };

  //Edit Product Function
  const EditProduct=(id,price)=>{  
    setupdateprice(price)
    setid(id)
  };

  const handleclick=(id)=>{
    fetch(`http://localhost:3000/product/${id}`,{
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({price:updateprice})
    }).then((res)=>res.json())
    .then((data)=>{
      alert("price updated")
    }).catch((err)=>console.log(err))
  };

  useEffect(()=>{
    fetchdata();
  },[data]);

  return (
    <div>
      <h1>Product</h1>
    {/* UPDATE PRICE HERE */}
      <input value={updateprice} onChange={(e)=>setupdateprice(e.target.value)} type="text" placeholder='Update price'/>
    
      <button onClick={()=>handleclick(id)}>Update</button>

    {/* ###### */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px",margin:"5px"}}>
        
      {data.map((el)=>(
        <div key={el.id} style={{border:"2px solid grey",padding:"1     5px"}}>
          <img src={el.image} alt="" height={200} width={200} />
          <h2>{el.title}</h2>
          <h3>{el.price}</h3>
          <h2>{el.category}</h2>
          <p>{el.description}</p>
          <button onClick={()=>EditProduct(el.id,el.price)}>Edit</button>
          <button onClick={()=>deleteProduct(el.id)}>Delete</button>
        </div>
       ))}
    </div>
    </div>
  )
}


export default Product
