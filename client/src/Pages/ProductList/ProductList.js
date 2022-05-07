import Product from "../../Components/Product/Product";
import { Card, Col,Row, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect , useState} from "react";
import './ProductList.scss'

const ProductList = () => {
    const category = useParams()
    const cat= category.category
    const cap= cat.charAt(0).toUpperCase()+cat.slice(1)
    const [hasData, setHasData]= useState(false)
    const [products, setProducts]= useState();
    const [loaded,setLoaded]= useState(false)
    const [priceNumber, setPriceNumber]= useState(1600)
    const handlePriceFilter=(x)=>{
        setPriceNumber(x.target.value)
    }
    useEffect(()=>{
        if(window.location.pathname.includes("search")){
            fetch("/search/"+category.category).then(res=>{
                return(res.json())
            }).then(data=>{
                if(data.length!==0){
                    setProducts(data)
                    setHasData(true)
                }
                if(data.length===0){
                    // alert("No results :(")
                    setProducts(data)
                    // return(<>
                    //     <h1>No Results</h1>
                    // </>)
                }
                setLoaded(true)
            })
        }
        else{
            fetch('/api/getAllProdsByCat/'+category.category)
            .then((res)=>{return(res.json())}).then((data)=>{
                setProducts(data)
                setHasData(true)
                setLoaded(true)
            })

        }
    },[category.category])
    if(loaded && hasData){
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
                    return(
                        <Col
                            key={x._id}
                        >
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
    if(loaded && !hasData){
        return(
                <div className="notFound">Search for -<span className="notFoundSearch">{category.category}</span>- did not find any matches</div>
            
        )
    }
}
 
export default ProductList;