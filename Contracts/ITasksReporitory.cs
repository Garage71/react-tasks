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
        Task<Task> CreateTask(Task task);
        Task<Task> GetTask(int taskId);

        Task<bool> CompleteTask(int taskId);
        Task<bool> RemoveTask(int taskId);
    }
}
