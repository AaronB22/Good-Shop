import { Card } from 'react-bootstrap';
import './Tags.scss';


const Tags = (props) => {
    return ( 
        <>
        <Card className='Tag' style={{
            backgroundColor:'lightBlue',
            fontSize:'18px',
        }}>
            {props.tag}
        </Card>
        
        </>

     );
}
 
export default Tags;