import { useState } from "react";
import { FilePond } from "filepond";
import {Container, Card, Form, Button, Alert, Dropdown} from "react-bootstrap";

const UploadProduct = () => {
    const [img, setImg]= useState(require('../../assests/phone.jpg'))
    const [name, setName]= useState()
    const [category, setCategory]= useState('Choose Category...');
    const [description, setDescription]= useState()
    const [price, setPrice]= useState()
    const uploadNewProduct=async(e)=>{


        const newProduct={
            name:name,
            description:description,
            category:category,
            img: img,
            price:price,
            tags:["deliever, new, 4k"]
        }
        const res= await fetch('/api/newProduct',{
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              }
            })
        console.log(res)
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
                    {/* <Form.Control/> */}
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
                            <Dropdown.Item href="#/action-2">LapTop</Dropdown.Item>
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
                <Form.Group className="mb-3" onChange={(x)=>{
                            setImg(x.target.value)
                    }}>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                     {/* <input type='file' onChange={uploadImg}/> */}
            </Form>
            <Button style={{
                width:'50%',
            }}
            onClick={uploadNewProduct}
            >
                Submit
            </Button>
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