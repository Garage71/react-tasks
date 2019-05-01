using Microsoft.AspNetCore.SignalR;
using react_todo.Contracts;
using react_todo.Services.EventAggregator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_todo.Hubs
{
    public class TaskHub : Hub, IDisposable
    {
        private readonly IEventAggregator eventAggregator;
        private Subscription<TaskMessage> subscription;
        IHubContext<TaskHub> hubContext = null;
        public TaskHub(IEventAggregator eventAggregator, IHubContext<TaskHub> hubContext)
        {
            this.eventAggregator = eventAggregator;
            subscription = this.eventAggregator.Subscribe<TaskMessage>(TaskMessageReceived, SubscriptionType.Singleton);
            this.hubContext = hubContext;
        }

        private async Task TaskMessageReceived(TaskMessage message)
        {
            var type = message.Type.ToString();
            await hubContext.Clients.All.SendAsync(type, message.Task);
        }

        public new void Dispose()
        {
            base.Dispose();
            this.eventAggregator.UnSbscribe(subscription);
        }
    }
}
