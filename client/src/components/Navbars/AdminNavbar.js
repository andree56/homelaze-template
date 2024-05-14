/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Media,
} from "reactstrap";
import React from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';


const AdminNavbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth/login'); // Adjust as necessary
    };

return (
    <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
            <Container fluid>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            </Form>
            <Nav className="align-items-center d-none d-md-flex" navbar>
                <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                        <img
                        alt="..."
                        src={require("../../assets/img/theme/van.png")}
                        />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold">
                        Van Carlo Labanan
                        </span>
                    </Media>
                    </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem onClick={handleLogout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                    </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
            </Container>
        </Navbar>
        </>
    );
};

export default AdminNavbar;
