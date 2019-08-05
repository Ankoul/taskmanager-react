import Service from "./Service";


const URL = process.env.REACT_APP_REST_API + "/projects";
class ProjectService extends Service {

    listProjects = async () => {
        return await super.get(URL);
    };

    createProject = async (project) => {
        return await super.post(URL, project);
    };

    deleteProject = async (projectId) => {
        return await super.delete(`${URL}/${projectId}`);
    };

    updateProject = async (project) => {
        return await super.put(URL, project);
    };

}

export default new ProjectService();