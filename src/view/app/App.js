import React, {Component} from 'react';
import ProjectCard from "../../component/ProjectCard";
import CardDeck from "react-bootstrap/CardDeck";
import AddProjectCard from "../../component/AddProjectCard";
import projectService from "../../service/ProjectService";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    async componentDidMount() {
        let projects = await projectService.listProjects();
        this.setState({projects});
    }

    render() {

        return (
            <div className="App">
                <CardDeck>
                    {this.state.projects.map((project)=>
                        <ProjectCard project={project} key={project.id}/>
                    )}
                    <AddProjectCard/>
                </CardDeck>
            </div>
        );
    }
}

export default App;
