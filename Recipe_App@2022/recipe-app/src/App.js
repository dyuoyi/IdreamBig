import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import { useAuthContext }  from './hooks/useAuthContext';
import {Helmet} from 'react-helmet';

import './App.css';

//import componets and pages
import  NavbarMain from './componets/NavbarMain';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Recipe from './pages/recipe/Recipe';
import Footer from './componets/Footer';
import  ScrollToTop from  './componets/ScrolToTop';


function App() {
  // using useAuthConetx hook
  const{user, authIsReady } = useAuthContext();

  return (
    <div className="App">
  
     { authIsReady && (
          <div className='content-wrap'>
                <BrowserRouter>
                  <ScrollToTop />
                      <NavbarMain />
                      <Routes>
                        <Route path='/' 
                            element={  <Home /> }/> 
                        <Route path='/create'
                            element={ user ? <Create /> : <Navigate to='login'/>} />
                        <Route path='/recipes/:id' element={<Recipe />} />
                        <Route path='/login'
                            element={ !user ? <Login/> : <Navigate to='/create' />} /> 
                        <Route path='/signup' 
                            element={ !user ?  <Signup /> : <Navigate to='/create'/>} /> 
                      </Routes>

                      <Footer />
                </BrowserRouter>
        </div>
        )}
    </div>
  );
}

export default App;