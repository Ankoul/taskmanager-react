import Service from "./Service";

const URL = process.env.REACT_APP_REST_API + "/tasks";
class TaskService extends Service {

    createTask = async (task) => {
        return await super.post(URL, task);
    };

    deleteTask = async (taskId) => {
        return await super.delete(`${URL}/${taskId}`);
    };

    updateTask = async (task) => {
        return await super.put(URL, task);
    };

}

export default new TaskService();