import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import _ from "lodash";
import projectService from "../service/ProjectService";
import taskService from "../service/TaskService";


export default class ProjectCard extends Component {

    static propTypes = {
        project: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            newTaskName: "",
        };
    }

    toggleTask = async (e) => {
        let task = this.getTaskById(e.target.getAttribute("task-id"));
        if (task.finishDate) {
            task.finishDate = null;
        } else {
            task.finishDate = new Date();
        }
        await taskService.updateTask(task, this.props.project.id);
        this.forceUpdate();
    };

    getTaskById = (taskId) => {
        taskId = parseInt(taskId);
        for (let task of this.props.project.tasks) {
            if(task.id === taskId) return task;
        }
    };

    todoFilter = (task) => !task.finishDate;
    doneFilter = (task) => task.finishDate;

    newTaskNameChangeHandler = (e) => {
        this.setState({newTaskName: e.target.value});
    };

    addTask = async () => {
        let newTaskName = _.trim(this.state.newTaskName);
        if(!newTaskName){
            return;
        }
        await taskService.createTask({description: newTaskName}, this.props.project.id);
        this.setState({newTaskName: ""});
    };

    render() {
        let {project} = this.props;

        return (
            <Card className="text-left">
                <Card.Header>{project.name}</Card.Header>
                <Card.Body>

                    <Form.Group>
                        <Form.Label>
                            To Do
                        </Form.Label>
                        {project.tasks
                            .filter(this.todoFilter)
                            .map((task) =>
                                <Form.Check key={task.id}
                                            type="checkbox"
                                            task-id={task.id}
                                            label={task.description}
                                            title={`Created on ${task.createDate}`}
                                            onClick={this.toggleTask}
                                />
                            )
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Done
                        </Form.Label>
                        {project.tasks
                            .filter(this.doneFilter)
                            .map((task) =>
                                <Form.Check key={task.id} defaultChecked
                                            type="checkbox"
                                            task-id={task.id}
                                            label={task.description}
                                            title={`Finished on ${task.finishDate}`}
                                            onClick={this.toggleTask}
                                />
                            )
                        }
                    </Form.Group>

                </Card.Body>
                <Card.Footer className="text-muted">
                    <Form>
                        <Form.Row>
                            <Col md={9}>
                                <Form.Control placeholder={"Task"} value={this.state.newTaskName}
                                              onChange={this.newTaskNameChangeHandler}
                                />
                            </Col>
                            <Col md={3}>
                                <Button variant="success" onClick={this.addTask}>ADD</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Footer>
            </Card>
        );
    }
}
