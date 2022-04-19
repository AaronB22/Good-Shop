import { useState } from "react";
import {Container, Card, Form, Button, Alert} from "react-bootstrap";

const UploadProduct = () => {
    const [img, setImg]= useState(require('../../assests/phone.jpg'))
    const [name, setName]= useState()
    const [category, setCategory]= useState();
    const [price, setPrice]= useState()
    const uploadImg=async(e)=>{
        console.log(e.target.files[0])
        const imgfile= e.target.files[0]



        
        setImg(URL.createObjectURL(imgfile))
        const formData = new FormData();
        console.log(e.target.files[0])
        await formData.append('photo', e.target.files[0])
        const newProduct={
            name:'test',
            description:'test',
            category:'test',
            img: formData,
            price:10
        }
        console.log(newProduct)
        // console.log(newProduct.img)
        console.log(formData)
        //URL.createObjectURL(imgfile)
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
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
                    <Form.Control/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                     <input type='file' onChange={uploadImg}/>
            </Form>
                <img
                    src={img}
                />
        
        
        </>
     );
}
 
export default UploadProduct;