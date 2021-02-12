import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
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
                    <Navbar.Text 
                        
                        onClick={() => {
                        deleteToken()
                        props.history.push('/')
                        }}
                    >
                        logout
                    </Navbar.Text>
                    ) : (
                    <Link to="/login" className="nav-link">
                        login
                    </Link>
                    )}         
            </Navbar.Collapse>
        </Navbar>
        
    )
}
export default withRouter(Header)