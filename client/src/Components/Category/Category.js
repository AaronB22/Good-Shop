import { Card, Container, Col, Row} from "react-bootstrap";
import "./Category.scss"

const Category = (props) => {
    const categories= props.props;
    console.log(categories)

    return ( 
        
       
            <Col 
            onClick={(e)=>{
                console.log(e.target.innerText)
                window.location.assign('/productList/'+e.target.innerText)
            }}
            >
                <Card className="catBlock">
                    <img
                    className="catImg"
                    src={props.props.img}
                    />
                    <div className="hoverCat" >
                    <div className="catTitle">
                        {props.props.category} 
                    </div>
                    </div>
                </Card>
            </Col>
           
    
     );
}
 
export default Category;