import Routers from './Router';
import { BrowserRouter as Router} from 'react-router-dom'
import NavBarComp from './Components/NavBar/NavBarComp';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import { NavBarContext } from './utils/navBarStatus';
import { useContext, useState } from 'react';

function App() {
  console.log(window.location.pathname)
  const [navBarStatus, setNavBarStatus] = useState('open')
  
  return (
    <body>
      <NavBarContext.Provider value={{navBarStatus, setNavBarStatus}}>
        <Router>
          {(()=>{
          if(navBarStatus==='open'){
            return(
              <NavBarComp/>
            )
          }
          })()}
          <div className='App'>
            <Routers/>

          </div>
        </Router>

      </NavBarContext.Provider>
      
    </body>
  );
}

export default App;
