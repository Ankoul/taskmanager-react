import _ from "lodash";
import projectService from "./ProjectService";

class TaskService {

    createTask = async (task, projectId) => {
        let project = await projectService.findProjectById(projectId);
        task = _.clone(task);
        task.id = _.maxBy(project.tasks, (t) => t.id).id + 1;
        task.createDate = new Date();
        task.finishDate = null;
        project.tasks.push(task);
        return task;
    };

    deleteTask = async (taskId, projectId) => {
        let project = await projectService.findProjectById(projectId);
        _.remove(project.tasks, (task)=> task.id === taskId);
    };

    updateTask = async (task, projectId) => {
        let project = await projectService.findProjectById(projectId);
        let t = _.find(project.tasks, {id: task.id});
        _.assign(t, task);
    };
}

export default new TaskService();