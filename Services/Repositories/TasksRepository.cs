using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using react_todo.Contracts;
using Task = react_todo.Models.Task;

namespace react_todo.Services.Repositories
{
    public class TaskRepository : BaseRepository, ITasksRepository
    {
        public TaskRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory)
        {

        }
        public async Task<List<Task>> GetTasks()
        {
            List<Task> result;

            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var query = context.Tasks.AsQueryable();

                result = await query.ToListAsync();
            }

            return result;
        }

        public async Task<Task> CreateTask(Task task)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var newTask = context.Tasks.Add(task);
                var result = await context.SaveChangesAsync();
                return task;
            }
        }

        public async Task<Task> GetTask(int taskId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Tasks.FindAsync(taskId);
            }
        }

        public async Task<bool> CompleteTask(int taskId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var task = await context.Tasks.FindAsync(taskId);
                if (task != null)
                {
                    task.IsActive = false;
                    await context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
        }

        public async Task<bool> RemoveTask(int taskId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var task = await context.Tasks.FindAsync(taskId);
                if (task != null)
                {
                    context.Tasks.Remove(task);
                    await context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
        }

    }
}
