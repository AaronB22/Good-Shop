import Product from "../../Components/Product/Product";
import { Card, Col,Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect , useState} from "react";
import './ProductList.scss'

const ProductList = () => {
    const category = useParams()
    const cat= category.category
    console.log(cat)
    const cap= cat.charAt(0).toUpperCase()+cat.slice(1)
    console.log(cap)
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
    if(loaded){
        return ( 
        <>
        <Card.Text className="ListHeader">
            {cap}
        </Card.Text>
        <Row>
            {products.map(x=>{
                return(
                    <Col>
                        <Product
                            product={x}
                        />
                    </Col>
                )
                        })}
        </Row>
            
        </> );

    }
    if (!loaded){
        return(
            <h1>
                Loading...
            </h1>
        )
    }
}
 
export default ProductList;