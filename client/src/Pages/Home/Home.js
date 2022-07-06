import { 
    Card,
    Carousel,
    Row,
    Col
    } from "react-bootstrap";
import './Home.scss'
import Product from "../../Components/Product/Product";
import { NavBarContext } from '../../utils/navBarStatus';
import { useContext, useEffect, useState } from 'react';


const Home = () => {
    let productCount=0;
    const {setNavBarStatus}= useContext(NavBarContext)
    const [products, setProducts]= useState();
    const [loaded,setLoaded]= useState(false)
    useEffect(()=>{
        fetch('/api/getAllProdsByCat/Phone')
        .then((res)=>{return(res.json())}).then((data)=>{
            setProducts(data)
            setLoaded(true)
        })
    },[])
    useEffect(()=>{
        setNavBarStatus('open')
    })
    const handleWindowChange=(e)=>{
        window.location.assign('/productList/'+e.target.id)
    }

    if(loaded){
        return (
            <>
                <div className="homeTopBar">
                    <div className="homeImgDiv">
                        <img src={require('../../assests/laptopcut.jpg')} className='imgHome'/>
                        <div className="homeImgBlackOut"></div>
                    </div>
                    <div className="homeTitleDiv">
                        <h1 className="homeTitle">Welcome!</h1>
                    </div>
                    <div className="homePar">
                        Welcome to Good Shop! This is a custom project by Aaron Bailey. NOTE: This is just an example shop. NOT A REAL SHOP
                    </div>
                </div>
                <Row>
                    <Col>
                        <Card onClick={()=>{
                            window.location.assign('./productList/Phone')
                        }}
                        className="homeCatCard"
                        >
                            <h2 className="homeCardTitle">Phone</h2>
                            <div className="catImgDivHome">
                                <img src={require('../../assests/phone.jpg')} className='catImgHome'/>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card onClick={()=>{
                            window.location.assign('./productList/Tablet')
                        }}
                        className="homeCatCard"
                        >
                            <h2 className="homeCardTitle">Tablet</h2>
                            <div className="catImgDivHome">
                                <img src={require('../../assests/tablet.jpg')} className='catImgHome'/>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card onClick={()=>{
                            window.location.assign('./productList/Laptop')
                        }}
                        className="homeCatCard"
                        >
                            <h2 className="homeCardTitle">Laptop</h2>
                            <div className="catImgDivHome">
                                <img src={require('../../assests/laptop.jpg')} className='catImgHome'/>
                            </div>
                        </Card>
                    </Col>
                </Row>

            </>
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