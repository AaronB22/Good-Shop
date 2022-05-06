import { Card } from 'react-bootstrap';
import './Tags.scss';


const Tags = (props) => {
    return ( 
        <div
            key={props.id}
        >
        <Card className='Tag' style={{
            backgroundColor:'lightBlue',
            fontSize:'18px',
        }}>
            {props.tag}
        </Card>
        
        </div>

     );
}
 
export default Tags;