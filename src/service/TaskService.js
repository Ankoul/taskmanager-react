import _ from "lodash";
import projectService from "./ProjectService";
import moment from "moment";

class TaskService {

    createTask = async (task, projectId) => {
        let project = await projectService.findProjectById(projectId);
        task = _.clone(task);
        task.id = _.add(_.max(_.map(project.tasks, (t) => t.id)), 1);
        task.createDate = moment();
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

    finishtask = async (task, projectId) => {
        task.finishDate = moment();
        await this.updateTask(task, projectId);

    }
}

export default new TaskService();