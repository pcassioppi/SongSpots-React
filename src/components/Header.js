import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import {Navbar, Nav, Button} from 'react-bootstrap'
import { getToken, deleteToken } from '../token'

const Header = props => {
    const isLoggedIn = !!getToken();
    
    return (
        <Navbar bg="dark" variant="dark" >
            
        
            <Nav className="mr-auto">
                
                <Link to={"/"}  className="nav-link">Your Songs</Link>
                {isLoggedIn && (             
                    <Link to="/create" className="nav-link">
                        Add Songs to Your Map
                    </Link>
                )}
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                {isLoggedIn ? (
                    // <Navbar.Text 
                    <Button variant="primary" 
                        onClick={() => {
                        deleteToken()
                        props.history.push('/')
                        }}
                    >
                        Logout
                        </Button>
                    // </Navbar.Text>
                    ) : (
                    // <Link to="/login" className="nav-link">
                    //     login
                    // </Link>
                    <Button href="/login" variant="primary" >
                        Login
                    </Button>
                    )}         
            </Navbar.Collapse>
        </Navbar>
        
    )
}
export default withRouter(Header)