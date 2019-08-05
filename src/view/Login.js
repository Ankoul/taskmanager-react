import React, {Component} from 'react';
import authenticationService from "../service/AuthenticationService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegisterMode: false,
        };
        this.credentials = {};
    }

    onChangeHandler = (e) => {
        let {name, value} = e.target;
        this.credentials[name] = value;
    };

    tryLogin = async (e) => {
        e.preventDefault();
        let username = _.trim(this.credentials.username);
        let password = _.trim(this.credentials.password);
        if (username && password) {
            await this.loginUser(username, password);
        }

    };

    register = async (e) => {
        e.preventDefault();
        for (let key in this.credentials) {
            if (!_.trim(key)) return;
        }
        let {password, confirmPassword, username} = this.credentials;
        if (confirmPassword !== password) {
            return;
        }
        try{
            await authenticationService.register(this.credentials);
            await this.loginUser(username, password);
        } catch (e) {
            console.error(e);
        }
    };

    loginUser = async (username, password) => {
        try {
            let user = await authenticationService.login(username, password);
            localStorage.setItem("user", JSON.stringify(user));
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    toggleRegistrationMode = () => {
        this.setState({isRegisterMode: !this.state.isRegisterMode});
    };

    render() {
        return (
            <Container>
            <Row>
                <Col/>
                <Card className={"mt-100"}>
                    <Form>
                        {this.state.isRegisterMode &&
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control size="sm"
                                              name={"name"}
                                              onChange={this.onChangeHandler}
                                />
                            </Form.Group>
                        }
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control size="sm"
                                          name={"username"}
                                          onChange={this.onChangeHandler}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control size="sm"
                                          type={"password"}
                                          name={"password"}
                                          onChange={this.onChangeHandler}
                            />
                        </Form.Group>
                        {this.state.isRegisterMode &&
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control size="sm"
                                              type={"password"}
                                              name={"confirmPassword"}
                                              onChange={this.onChangeHandler}
                                />
                            </Form.Group>
                        }
                        <Card.Footer>
                        {this.state.isRegisterMode ?
                            <Button type={"submit"} onClick={this.register} className={"float-right"}>Register</Button>
                        :
                            <Button type={"submit"} onClick={this.tryLogin} className={"float-right"}>Login</Button>
                        }
                        {this.state.isRegisterMode ?
                            <Button onClick={this.toggleRegistrationMode} variant={"link"} className={"float-left"}>
                                Already have an account? Try to login.
                            </Button>
                            :
                            <Button onClick={this.toggleRegistrationMode} variant={"link"} className={"float-left"}>
                                Don't have an account yet? Try to register.
                            </Button>
                        }
                        </Card.Footer>
                    </Form>
                </Card>
                <Col/>
            </Row>
            </Container>
        );
    }
}

export default Login;
