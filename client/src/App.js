import Routers from './Router';
import { BrowserRouter as Router} from 'react-router-dom'
import NavBarComp from './Components/NavBar/NavBarComp';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

function App() {
  return (
    <body>
      <Router>
        <NavBarComp/>
        <div className='App'>
          <Routers/>

        </div>
      </Router>
      
    </body>
  );
}

export default App;
