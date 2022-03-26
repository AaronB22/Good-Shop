import Routers from './Router';
import { BrowserRouter as Router} from 'react-router-dom'
import NavBarComp from './Components/NavBar/NavBarComp';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBarComp/>
        <Routers/>
      </Router>
      
    </div>
  );
}

export default App;
