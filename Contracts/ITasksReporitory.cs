using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task = react_todo.Models.Task;

namespace react_todo.Contracts
{
    public interface ITasksRepository
    {
        Task<List<Task>> GetTasks();
        System.Threading.Tasks.Task CreateTask(Task task);
        Task<Task> GetTask(int taskId);
    }
}
