import {Navbar, Nav, Container} from 'react-bootstrap';
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { NavLink} from 'react-router-dom';


//import styles & image
import './NavbarMain.css';
import cookingIcon from '../assets/cooking-con.svg';
import Searchbar from './Searchbar';


function NavbarMain() {
     // using the useLogout hook
  const { logout, isPending } = useLogout();

    // using useAuthContext hook
    const { user } = useAuthContext();

  return (
         <Navbar bg="dark" variant="dark" expand="lg" className='navbar'>
                <Container fluid >
                    <Navbar.Brand as={NavLink} to='/' className='logo'>
                          <img src={cookingIcon} alt='cooking-icon'style={{marginRight: 15}}/> 
                          <h1 style={{marginRight: 100}}>startCooking </h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                      <Nav
                          className="me-auto my-2 my-lg-0 nav-second"
                          style={{ maxHeight: '100px' }}
                          navbarScroll
                      >

                    
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            { !user && (
                              <>
                                <Nav.Link as={NavLink}  to="/login"> Login </Nav.Link>
                                <Nav.Link as={NavLink} to="/signup"> Signup </Nav.Link>
                              </>
                          )}

                          { user && <Nav.Link as={NavLink} to="/create">Add Recipe</Nav.Link> }

                          {user && <Nav.Link><p> Hello, {user.displayName} </p> </Nav.Link>}

                          {
                            user && (
                              <Nav.Link >
                                  { !isPending && <button className='btn' onClick={logout}>Logout</button>}
                                  { isPending && <button className='btn' disabled>Logging out...</button>}
                              </Nav.Link>
                            )
                          }
                        
                        </Nav>
                        {/* adding a search bar */}
                            <Searchbar />
                    </Navbar.Collapse>
                </Container>
        </Navbar>
        
  )
}

export default NavbarMain