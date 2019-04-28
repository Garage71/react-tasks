using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace react_todo.Models
{
    public class TaskId
    {
        [JsonProperty("taskId")]
        public int Id { get; set; }
    }
}
