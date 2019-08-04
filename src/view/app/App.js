import React, {Component} from 'react';
import ProjectCard from "../../component/ProjectCard";
import CardDeck from "react-bootstrap/CardDeck";
import CreateProjectCard from "../../component/CreateProjectCard";
import projectService from "../../service/ProjectService";
import {IconContext} from "react-icons";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    async componentDidMount() {
        await this.loadProjects();
    }

    loadProjects = async () => {
        let projects = await projectService.listProjects();
        this.setState({projects});
    };

    render() {
        return (
            <div>
                <IconContext.Provider value={{color: "blue", size: "0.8em"}}>
                    <CardDeck>
                        {this.state.projects.map((project) =>
                            <ProjectCard project={project} key={project.id} onDelete={this.loadProjects}/>
                        )}
                        <CreateProjectCard onCreate={this.loadProjects}/>
                    </CardDeck>
                </IconContext.Provider>
            </div>
        );
    }
}

export default App;
