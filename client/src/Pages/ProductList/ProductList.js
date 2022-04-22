import Product from "../../Components/Product/Product";
import { Card, Col,Row, Form, Container, DropdownButton, Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect , useState} from "react";
import './ProductList.scss'

const ProductList = () => {
    const category = useParams()
    const cat= category.category
    const cap= cat.charAt(0).toUpperCase()+cat.slice(1)
    const [products, setProducts]= useState();
    const [loaded,setLoaded]= useState(false)
    const [priceNumber, setPriceNumber]= useState(1600)
    const handlePriceFilter=(x)=>{
        setPriceNumber(x.target.value)
    }
    useEffect(()=>{
        fetch('/api/getAllProdsByCat/Phone')
        .then((res)=>{return(res.json())}).then((data)=>{
            setProducts(data)
            setLoaded(true)
        })
    },[])
    if(loaded){
        return ( 
        <>
        
        <Card className='FilterBar'>
            <Card.Text className='FilterTitle'>
                Filters
            </Card.Text>
                <Form.Label
                    className="filterPrice"
                >Max Price: <span className="priceNumber">${priceNumber}</span></Form.Label>
                <Form.Range
                    onChange={handlePriceFilter}
                    min='200'
                    max='3000'
                    style={{
                        width:'60%',
                        marginRight:'auto',
                        marginLeft:'auto'
                    }}
                />
        </Card>
        <Card.Text className="ListHeader">
            {cap}
        </Card.Text>
        <Row>
            {products.map(x=>{
                if(x.price<priceNumber){
                    console.log(x.price)
                    return(
                        <Col>
                            <Product
                                product={x}
                            />
                        </Col>
                    )

                }
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