using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react_todo.Services.EventAggregator;

namespace react_todo.Contracts
{
    public interface IEventAggregator
    {
        void Publish<TMessageType>(TMessageType message);
        Subscription<TMessageType> Subscribe<TMessageType>(Func<TMessageType, Task> action, SubscriptionType subscriptionType);
        void UnSbscribe<TMessageType>(Subscription<TMessageType> subscription);

    }
}
