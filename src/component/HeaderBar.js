import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import {FiTrash2} from "react-icons/fi";
import IconButton from "./IconButton";
import _ from "lodash";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import authenticationService from "../service/AuthenticationService";
import NavDropdown from "react-bootstrap/NavDropdown";


export default class HeaderBar extends Component {


    constructor(props) {
        super(props);
        this.loggedUser = authenticationService.getLoggedUser();
    }

    doLogout = ()=>{
        authenticationService.logout();
    };

    render() {
        return (
            <Navbar>
                <Navbar.Brand >{"EDirectInsure TODO List"}</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <span>{this.loggedUser.name}</span>
                    </Navbar.Text>
                    <NavDropdown title="Menu" id="collasible-nav-dropdown">
                        <NavDropdown.Item onClick={this.doLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}