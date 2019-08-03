import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";


export default class ProjectCard extends Component {

    static propTypes = {
        project: PropTypes.object
    };

    render() {
        let {project} = this.props;

        return (
            <Card className="text-left">
                <Card.Header>{project.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    To Do
                                </Form.Label>
                                {project.tasks
                                    .filter((task)=> !task.finishDate)
                                    .map((task)=>
                                        <Form.Check type="checkbox" label={task.description} tooltip={task.creationDate}/>
                                    )
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Done
                                </Form.Label>
                                {project.tasks
                                    .filter((task)=> task.finishDate)
                                    .map((task)=>
                                        <Form.Check type="checkbox" checked
                                                    label={task.description}
                                                    tooltip={task.finishDate}/>
                                    )
                                }
                            </Form.Group>
                        </Form>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Form>
                        <Form.Row>
                            <Col md={9}>
                                <Form.Control placeholder={"Task"}/>
                            </Col>
                            <Col md={3}>
                                <Button variant="success">ADD</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Footer>
            </Card>
        );
    }
}
