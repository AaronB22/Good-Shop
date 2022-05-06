import { useState } from "react";
import {Container, Card, Form, Button, Alert, Dropdown} from "react-bootstrap";

const UploadProduct = () => {
    const [img, setImg]= useState()
    const [name, setName]= useState()
    const [category, setCategory]= useState('Choose Category...');
    const [description, setDescription]= useState()
    const [price, setPrice]= useState()
    const uploadNewProduct=async(e)=>{
        const myFile= img
        const fd= new FormData()
        fd.append('image',myFile,myFile.name)

        if(img,name,category,description,price){
            const resI= await fetch('/api/upload',{
                method: "POST",
                body:fd ,
                })
            const data= await resI.json()
            const newProduct={
                name:name,
                description:description,
                category:category,
                img: data,
                price:price,
                tags:["deliever", "new", "120hz"]
            }
            
            const res= await fetch('/api/newProduct',{
                method: "POST",
                body: JSON.stringify(newProduct),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                  }
                })
            const prodData= await res.json();
            window.location.assign('/product/'+prodData[0]._id)
            
        }
        else{
            alert('You must fill out all fields')
        }


    }

    const uploadImg=async (e)=>{
        setImg(e.target.files[0])
    }
    
    return ( 
        <>
            <Form>
            <Form.Group className="mb-3" onChange={(x)=>{
                        setName(x.target.value)
                    }}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" onChange={(x)=>{
                        setPrice(x.target.value)
                    }}>
                    <Form.Label>Price</Form.Label>
                    <Form.Control/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" onChange={(x)=>{
                            setCategory(x.target.value)
                    }}>
                    <Form.Label>Category</Form.Label>
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{
                            width:'100%',
                            background:'white',
                            borderRadius:'2px',
                            borderColor: 'lightgrey',
                            color: 'black',
                            textAlign:'left',
                        }}
                        >
                            {category}
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                            onClick={(x)=>setCategory(x.target.firstChild.data)}
                        >
                            <Dropdown.Item href="#/action-1">Phone</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Laptop</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Tablet</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group className="mb-3" onChange={(x)=>{
                            setDescription(x.target.value)
                    }}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                        <input type='file' name='file' id='file'
                        onChange={uploadImg}
                        />
                </Form.Group>
                
                      
                    <Button style={{
                        width:'50%',
                    }}
                    onClick={uploadNewProduct}
                    >
                        Submit
                    </Button>
                
            </Form>
            <img
                style={{
                    aspectRatio:'16:9',
                    width:'30rem'
                }}
                src={img}
            />
        
        
        </>
     );
}
 
export default UploadProduct;