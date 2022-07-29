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
    const [filter, setFilter]= useState('collapseFilterBar')
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
                    setProducts(data)
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

    const handleFilterClick=()=>{
        if(filter==='FilterBar'){
            setFilter('collapseFilterBar')
        }
        else{
            setFilter('FilterBar')
        }
    }

    if(loaded && hasData){
        return ( 
        <>
        
        <Card className={filter} >
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
            <Card.Text className='FilterTitle' onClick={handleFilterClick}>
                Filters
            </Card.Text>
        </Card>
        <Card.Text className="ListHeader">
            {cap}
        </Card.Text>
            {products.map(x=>{
                if(x.price<priceNumber){
                    return(
                            <Product
                                key={x._id}
                                product={x}
                            />
                        
                    )

                }
                 })}
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