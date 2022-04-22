import { Card, Container, Row} from "react-bootstrap";
import Category from "../../Components/Category/Category";
import './Categories.scss';
import { NavBarContext } from '../../utils/navBarStatus';
import { useContext, useEffect } from 'react';

const placeholderArray=[
    {
        "category":"Laptop",
        "img":require("../../assests/laptop.jpg")
    },
    {
        "category":"Phone",
        "img":require("../../assests/phone.jpg")
    },
    {
        "category":"Tablet",
        "img":require("../../assests/tablet.jpg")
    }
]
    
const Categories = () => {
    const {setNavBarStatus}= useContext(NavBarContext)
    useEffect(()=>{
        setNavBarStatus('open')

    })
    return (
        <>
            <Container className="CatCont">
                <h1 className="CatHeader">Portable Devices</h1>
                <Container>
                    <Row>
                    {placeholderArray.map(x=>{
                    
                    return(
                        <Category 
                        props={x} 
                        />
                    )
                })}

                    </Row>

                </Container>

            </Container>

        </>
      );
}
 
export default Categories;