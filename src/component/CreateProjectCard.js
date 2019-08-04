import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import projectService from "../service/ProjectService";
import _ from "lodash";

export default class CreateProjectCard extends Component {

    static propTypes = {
        project: PropTypes.object,
        onCreate: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
        };
    }


    onProjectNameChangeHandler = (e) => {
        this.setState({projectName: e.target.value});
    };

    addNewProject = async (e) => {
        e.preventDefault();
        let projectName = _.trim(this.state.projectName);
        if (!projectName) {
            return;
        }
        let project = await projectService.createProject({name: projectName});
        this.setState({projectName: ""}, ()=>{
            this.props.onCreate(project);
        });
    };

    render() {
        return (
            <Card className="text-center">
                <Card.Body className={"align-self-center"}>
                    <Card.Title>Create a new project</Card.Title>
                    <Form>
                        <Form.Control placeholder={"Project Name"} className={"mb-2"} value={this.state.projectName}
                                      onChange={this.onProjectNameChangeHandler}/>
                        <Button type={"submit"} variant="primary" block onClick={this.addNewProject}>Create Project</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}
