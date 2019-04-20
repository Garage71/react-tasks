using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react_todo.Contracts;

namespace react_todo.Services.Repositories
{
    public abstract class BaseRepository
    {
        protected string ConnectionString { get; }
        protected IRepositoryContextFactory ContextFactory { get; }
        public BaseRepository(string connectionString, IRepositoryContextFactory contextFactory)
        {
            ConnectionString = connectionString;
            ContextFactory = contextFactory;
        }
    }
}
