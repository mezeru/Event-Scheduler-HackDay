import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Login } from './components/login';
import { Signup } from './components/signup';
import { Home } from './components/home';

export function App() {
    return (

        <div>
        <BrowserRouter>
          <Routes>
          <Route index path='/' element={<Home/>}  />
            <Route  path='/Login' element={<Login/>}  />
            <Route  path='/SignUp' element={<Signup />}  />
          </Routes>
        </BrowserRouter>
      </div>

    );
  }