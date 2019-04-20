using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using react_todo.Contracts;

namespace react_todo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController :  Controller
    {
        private readonly ITasksRepository _repository;
        public TaskController(ITasksRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<List<Models.Task>> GetTasks()
        {
            return await _repository.GetTasks();
        }

        [HttpPost("[action]")]
        public async Task Create(Models.Task task)
        {
            await _repository.CreateTask(task);
        }

        [HttpGet("[action]")]
        public async Task<Models.Task> GetTask(int iD)
        {
            return await _repository.GetTask(iD);
        }
    }
}
