import {Route,Routes} from 'react-router-dom'
import {HomePage } from './components/HomePage';
import { Signup } from './components/Signup';
import { LoginPage } from './components/LoginPage';

function App() {
  return (
    <div className='h-screen flex flex-col justify-center items-center '>
       <Routes>
           <Route path = "/" element = {<HomePage/>}/>
           <Route path = "/login" element = {<LoginPage/>}/>
           <Route path = "/signup" element = {<Signup/>}/>
       </Routes>
      

    </div>
  );
}

export default App;
