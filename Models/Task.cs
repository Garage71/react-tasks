using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace react_todo.Models
{
    public class Task
    {
        [JsonIgnore]
        public int TaskId { get; set; }
        [JsonProperty("priority")]
        public int Priority { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("dateTimeToComplete")]
        public DateTime DateTimeToComplete { get; set; }
    }
}
