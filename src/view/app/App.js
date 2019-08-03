import React, {Component} from 'react';
import './App.css';
import ProjectCard from "../../component/ProjectCard";
import CardDeck from "react-bootstrap/CardDeck";
import AddProjectCard from "../../component/AddProjectCard";
import projects from "./projects.json";

class App extends Component {


    render() {

        return (
            <div className="App">
                <CardDeck>
                    {projects.map((project)=>
                        <ProjectCard project={project}/>
                    )}
                    <AddProjectCard/>
                </CardDeck>
            </div>
        );
    }
}

export default App;
