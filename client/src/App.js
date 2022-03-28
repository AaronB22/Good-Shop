import Routers from './Router';
import { BrowserRouter as Router} from 'react-router-dom'
import NavBarComp from './Components/NavBar/NavBarComp';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import { NavBarContext } from './utils/navBarStatus';
import { UserContext } from './utils/UserContext';
import { useContext, useEffect, useState } from 'react';

function App() {
  const [navBarStatus, setNavBarStatus] = useState('open')
  const [userInfo, setUserInfo]= useState()
  useEffect(()=>{
    const userData= window.localStorage.getItem('userData');
    if(userData){
      const parsedUserData= JSON.parse(userData);
        if(parsedUserData){
          setUserInfo(parsedUserData)
        }
    }
  },[])


  return (
    <body>
      <UserContext.Provider value={{userInfo, setUserInfo}} >
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
      </UserContext.Provider>
    </body>
  );
}

export default App;
