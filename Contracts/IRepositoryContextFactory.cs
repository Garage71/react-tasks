using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react_todo.Services.Repositories;

namespace react_todo.Contracts
{
    public interface IRepositoryContextFactory
    {
        RepositoryContext CreateDbContext(string connectionString);
    }
}
