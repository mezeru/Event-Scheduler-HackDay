import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Login } from './components/login';
import { Signup } from './components/signup';
import { Home } from './components/home';
import { EventForm } from './components/Eventfrom';
import { Auth } from './Auth';
import { EventContainer } from './components/EventHome';

export function App() {
    return (

        <div>
        <BrowserRouter>
          <Routes>
            <Route index path='/' element={<Home/>}  />
            <Route  path='/Login' element={<Login/>}  />
            <Route  path='/SignUp' element={<Signup />}  />
            <Route  path='/newEvent' element={<Auth><EventForm /></Auth>}  />
            <Route  path='/Events' element={<Auth><EventContainer /></Auth>}  />
          </Routes>
        </BrowserRouter>
      </div>

    );
  }