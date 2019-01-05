import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from "reactstrap";
import {
    PermScanWifi,
    RssFeed,
    StayPrimaryLandscape,
    Search,
    PermIdentity,

} from '@material-ui/icons'
import {Link} from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      // <Navbar className="navbar navbar-expand-lg  justify-lg-content-center">
      //   <Nav className="auto" navbar>
      //     <NavItem>
      //       <NavLink style={{color: '#6f7072',fontSize: '2em'}}>12:30</NavLink>
      //     </NavItem>
      //     <NavItem>
      //       <NavLink>
      //       <RssFeed style={{color: '#6f7072',fontSize: '2em'}}/>
      //       </NavLink>
      //     </NavItem>
      //     <NavItem>
      //       <NavLink>
      //       <PermScanWifi style={{color: '#6f7072',fontSize: '2em'}}/>
      //       </NavLink>
      //     </NavItem>
      //     <NavItem>
      //       <NavLink>
      //       <StayPrimaryLandscape style={{color: '#6f7072',fontSize: '2em'}} />
      //       </NavLink>
      //     </NavItem>
      //   </Nav>
      //   <NavbarBrand>
      //   <Link className='mb-0 mr-auto' to='/'>
      //       <img src="/img/logo.png" img-responsive alt="logo" style={{width: "20%"}}/>
      //       </Link>
      //     </NavbarBrand>
      //   <NavbarToggler onClick={this.toggle} />
      //   <Collapse isOpen={this.state.isOpen} navbar>
      //     <Nav className="my-2 my-lg-0" navbar>
      //     <NavItem>
      //     <Search style={{color: '#6f7072',fontSize: '2em'}}/>
      //     </NavItem>
      //     <NavItem>
      //       <NavLink>
      //       <PermIdentity style={{color: '#6f7072', fontSize: '2em'}} />
      //       </NavLink>
      //     </NavItem>
      //     </Nav>
      //   </Collapse>
      // </Navbar>
    
            <Navbar style={{height:'10vh'}} className=" navbar-expand-md  navbar-dark">
            <NavbarToggler onClick={this.toggle}  />
            <div style={{display:"block !important",width:"100%"}}>
            {/* <Nav className="navbar-nav mr-auto  mt-lg-0" navbar>
              <NavItem>
                <NavLink style={{color: '#6f7072',fontSize: '2em'}}>12:30</NavLink>
              </NavItem>
              <NavItem className="mt-2">
                <NavLink>
                  <RssFeed style={{color: '#6f7072',fontSize: '2em'}}/>
                </NavLink>
              </NavItem>
              <NavItem className="mt-2">
                <NavLink>
                  <PermScanWifi style={{color: '#6f7072',fontSize: '2em'}}/>
                </NavLink>
              </NavItem>
              <NavItem className="mt-2">
                <NavLink>
                  <StayPrimaryLandscape style={{color: '#6f7072',fontSize: '2em'}} />
                </NavLink>
              </NavItem>
            </Nav> */}
              <center>
            <NavbarBrand href="/">
              <img src="/img/logo.png" className="img-responsive" alt="logo" style={{height: 70}}/>
            </NavbarBrand>          
            </center>
            {/* <Nav className="my-2 my-lg-0" navbar>
              <NavItem className="mt-2">
                <Search style={{color: '#6f7072',fontSize: '2em'}}/>
              </NavItem>
              <NavItem>
                <NavLink>
                  <PermIdentity style={{color: '#6f7072', fontSize: '2em'}} />
                </NavLink>
              </NavItem>
           </Nav> */}

            </div>
            </Navbar>

    );
  }
}

export default Header;
