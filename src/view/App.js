import React, {Component} from 'react';
import ProjectCard from "../component/ProjectCard";
import CardDeck from "react-bootstrap/CardDeck";
import CreateProjectCard from "../component/CreateProjectCard";
import projectService from "../service/ProjectService";
import {IconContext} from "react-icons";
import Login from "./Login";
import authenticationService from "../service/AuthenticationService";
import Container from "react-bootstrap/Container";
import HeaderBar from "../component/HeaderBar";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    async componentDidMount() {
        if (authenticationService.isLoggedIn()) {
            await this.loadProjects();
        }
    }

    loadProjects = async () => {
        let projects = await projectService.listProjects();
        this.setState({projects});
    };

    render() {
        if (!authenticationService.isLoggedIn()) {
            return <Login/>;
        }

        return (
            <div>
                <HeaderBar />
                <Container className={"container-padding-margin"}>
                    <IconContext.Provider value={{color: "blue", size: "0.8em"}}>
                        <CardDeck>
                            {this.state.projects.map((project) =>
                                <ProjectCard project={project} key={project.id} onChange={this.loadProjects}/>
                            )}
                            <CreateProjectCard onCreate={this.loadProjects}/>
                        </CardDeck>
                    </IconContext.Provider>
                </Container>
            </div>
        );
    }
}

export default App;
