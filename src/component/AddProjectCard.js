import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

export default class ProjectCard extends Component {

    static propTypes = {
        project: PropTypes.object
    };

    render() {
        return (
            <Card className="text-center">
                <Card.Body className={"align-self-center"}>
                    <Card.Title>Create a new project</Card.Title>
                    <Card.Text>
                        <Form>
                            <Form.Control placeholder={"Project Name"}/>
                            <Button variant="primary" block>Create Project</Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
