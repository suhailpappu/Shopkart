import React from "react";
// import { connect } from 'react-redux'
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <LinkContainer to="/">
            <Navbar.Brand>ShopKart</Navbar.Brand>
        
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
              <LinkContainer to="/cart">
                    <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
              
              </LinkContainer>

              <LinkContainer to="/login">
                    <Nav.Link ><i className='fas fa-user'></i>Sign in</Nav.Link>
              
              </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(Header)
export default Header;