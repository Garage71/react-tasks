using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task = react_todo.Models.Task;

namespace react_todo.Services.EventAggregator
{
    public enum MessageType
    {
        Create,
        Remove,
        Complete
    }
    public class TaskMessage
    {
        public MessageType Type { get; set; }
        public Task Task { get; set; }
    }
}
