import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { Container, Nav, NavItem, Navbar } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa';
import { MdLogout, } from 'react-icons/md';
import { BsCartFill } from 'react-icons/bs'


const Header = () => {
  const { isAuthenticated, logout, user } = useAuth()


  return (
    <div>

      <Navbar bg="dark">
        <Container >
          <Navbar.Brand href="/" className='text-light'>City Events</Navbar.Brand>
          <Navbar.Toggle />
          {isAuthenticated && (
            <Nav className="me-auto">
              <NavItem ><Nav.Link as={Link} to="/home" className='text-light'>Home</Nav.Link> </NavItem>
              {<NavItem ><Nav.Link as={Link} to="/new" className='text-light'>Add New Event</Nav.Link></NavItem>}
              {<NavItem><Nav.Link as={Link} to="/profile" className='text-light'>Profile</Nav.Link></NavItem>}
              {<NavItem><Nav.Link as={Link} to="/events/own" className='text-light'>MyEvents</Nav.Link></NavItem>}
            </Nav>
          )}
          <Navbar.Collapse className="justify-content-end">
            {isAuthenticated ?
              (<>
                {/*<NavItem className='pe-3'><Nav.Link as={Link} to="/cart"><BsCartFill size={25} /></Nav.Link></NavItem>*/}
                {<Navbar.Text className='pe-3 text-light'>
                  <Nav.Link as={Link} to="/profile" className='text-light'>
                    {user && (<><FaUser /> {user ? user.email : "user.name|email"}</>)}
                  </Nav.Link>
                </Navbar.Text>}
                <NavItem className='text-light'><MdLogout size={25} onClick={() => logout()} /> </NavItem>
              </>) : (
                <>
                  <NavItem className='text-light'><Nav.Link as={Link} to="/login" className='me-3'>Login</Nav.Link></NavItem>
                  <NavItem className='text-light'><Nav.Link as={Link} to="/register">Register</Nav.Link></NavItem>
                </>
              )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      { /*
   <nav>
        <u>
          {isAuthenticated && <li>Home</li>}
          {isAuthenticated && <li ><button onClick={() => logout()}>Logout</button></li>}
          {!isAuthenticated &&
            (
              <>
                <li><Link to={"/register"}>Register</Link></li>
                <li><Link to={"/login"}>Login</Link></li>
              </>

            )
          }
        </u>
        </nav>
        */}


    </div>
  )
}

export default Header
