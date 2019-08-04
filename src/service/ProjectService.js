import projects from "./projects.json";
import _ from "lodash";

class ProjectService {

    listProjects = async () => {
        return [...projects];
    };

    createProject = async (project) => {
        project = _.clone(project);
        project.id = _.add(_.max(_.map(projects, (p) => p.id)), 1);
        project.tasks = [];
        projects.push(project);
        return project;
    };

    deleteProject = async (projectId) => {
        _.remove(projects, (project) => project.id === projectId);
    };

    updateProject = async (project) => {
        let p = this.findProjectById(project.id);
        _.assign(p, project);
    };

    findProjectById = async (id) => {
        return _.find(projects, {id: id});
    };
}

export default new ProjectService();