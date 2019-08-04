import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import _ from "lodash";
import projectService from "../service/ProjectService";
import taskService from "../service/TaskService";
import {FaPencilAlt} from "react-icons/fa";
import {FiTrash2} from "react-icons/fi";
import TaskItem from "./TaskItem";
import IconButton from "./IconButton";
import InputGroup from "react-bootstrap/InputGroup";


export default class ProjectCard extends Component {

    static propTypes = {
        project: PropTypes.object,
        onDelete: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            newTaskName: "",
            isEditable: false,
        };
    }

    startEditingProjectName = async () => {
        this.setState({isEditable: true}, ()=>{
            this.projectNameInput.focus();
        });
    };

    finishEditingProjectName = async (e) => {
        let projectName = e.target.value;
        this.setState({isEditable: false}, async ()=>{
            if(projectName === this.props.project.name) {
                return;
            }
            this.props.project.name = projectName;
            await projectService.updateProject(this.props.project);
            this.forceUpdate();
        });
    };

    onProjectDeleteHandler = async ()=>{
        await projectService.deleteProject(this.props.project.id);
        this.props.onDelete(this.props.project);
    };

    todoFilter = (task) => !task.finishDate;
    doneFilter = (task) => task.finishDate;

    newTaskNameChangeHandler = (e) => {
        this.setState({newTaskName: e.target.value});
    };

    onTaskAddHandler = async (e) => {
        e.preventDefault();
        let newTaskName = _.trim(this.state.newTaskName);
        if (!newTaskName) {
            return;
        }
        await taskService.createTask({description: newTaskName}, this.props.project.id);
        this.setState({newTaskName: ""});
    };

    onTaskChangeHandler = async (task) => {
        await taskService.updateTask(task, this.props.project.id);
        this.forceUpdate();
    };

    onTaskDeleteHandler = async (task) => {
        await taskService.deleteTask(task.id, this.props.project.id);
        this.forceUpdate();
    };

    render() {
        let {project} = this.props;

        return (
            <Card className="text-left">
                <Card.Header>
                    <InputGroup size="sm">
                        <Form.Control onBlur={this.finishEditingProjectName}
                                      ref={(input) => { this.projectNameInput = input; }}
                                      size="sm" plaintext
                                      readOnly={!this.state.isEditable}
                                      defaultValue={project.name}/>
                        <InputGroup.Append>
                            <IconButton onClick={this.startEditingProjectName} className={"ml-2"}>
                                <FaPencilAlt/>
                            </IconButton>
                            <IconButton onClick={this.onProjectDeleteHandler} className={"ml-2"}>
                                <FiTrash2/>
                            </IconButton>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Header>
                <Card.Body style={{overflow: "hidden"}}>

                    <Form.Group>
                        <Form.Label>
                            <strong>To Do</strong>
                        </Form.Label>
                        {project.tasks
                            .filter(this.todoFilter)
                            .map((task) =>
                                <TaskItem task={task} key={task.id}
                                          onChange={this.onTaskChangeHandler}
                                          onDelete={this.onTaskDeleteHandler}/>
                            )
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <strong>Done</strong>
                        </Form.Label>
                        {project.tasks
                            .filter(this.doneFilter)
                            .map((task) =>
                                <TaskItem task={task} key={task.id}
                                          onChange={this.onTaskChangeHandler}
                                          onDelete={this.onTaskDeleteHandler}/>
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
                                <Button type={"submit"} variant="success" onClick={this.onTaskAddHandler}>Add</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Footer>
            </Card>
        );
    }
}
