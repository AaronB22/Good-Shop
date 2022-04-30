import { 
    Card,
    Container,
    Button,
    Carousel,
    Row,
    Col
    } from "react-bootstrap";
import './Home.scss'
import Product from "../../Components/Product/Product";
import { NavBarContext } from '../../utils/navBarStatus';
import { useContext, useEffect, useState } from 'react';


const Home = () => {
    const {setNavBarStatus}= useContext(NavBarContext)
    const [products, setProducts]= useState();
    const [loaded,setLoaded]= useState(false)
    useEffect(()=>{
        console.log('home')
        fetch('/api/getAllProdsByCat/Phone')
        .then((res)=>{return(res.json())}).then((data)=>{
            console.log(data)
           
            setProducts(data)
            setLoaded(true)
        })
    },[])
    useEffect(()=>{
        setNavBarStatus('open')
    })
    const handleWindowChange=(e)=>{
        console.log(e.target.id)
        window.location.assign('/productList/'+e.target.id)
    }

    if(loaded){
        return (
            <div>
                <Carousel className="car-block">
                    <Carousel.Item>
                    <img
                        src={require('../../assests/laptop.jpg')}
                        className='imgHome'
                        onClick={handleWindowChange}
                        id='laptop'
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img
                        src={require('../../assests/tablet.jpg')}
                        className='imgHome'
                        onClick={handleWindowChange}
                        id='tablet'
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        src={require('../../assests/phone.jpg')}
                        className='imgHome'
                        onClick={handleWindowChange}
                        id='phone'
                        />
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <Card.Text className='featured'>
                        Featured Products:
                    </Card.Text>
                    {products.map(x=>{
                        return(
                            <Col className="FeatureProd">
                                <Product
                                    product={x}
                                />
                            </Col>
                        )
                    })}
    

                </Row>
            </div>
          );
    }
        if(!loaded){
            return(
                <h1>
                    Loading...
                </h1>
            )
        }
    }
 
export default Home;