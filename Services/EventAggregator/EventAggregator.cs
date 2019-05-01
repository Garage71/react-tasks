using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_todo.Services.EventAggregator
{

    public enum SubscriptionType
    {
        Context,
        Singleton
    }
    public class EventAggregator : Contracts.IEventAggregator
    {
        private readonly object lockObj = new object();
        private readonly Dictionary<Type, IList> subscriber;

        public EventAggregator()
        {
            subscriber = new Dictionary<Type, IList>();
        }

        public void Publish<TMessageType>(TMessageType message)
        {
            Type t = typeof(TMessageType);
            IList sublst;
            if (subscriber.ContainsKey(t))
            {
                lock (lockObj)
                {
                    sublst = new List<Subscription<TMessageType>>(subscriber[t].Cast<Subscription<TMessageType>>());
                }

                foreach (Subscription<TMessageType> sub in sublst)
                {
                    sub.CreatAction()?.Invoke(message);
                }
            }
        }

        public Subscription<TMessageType> Subscribe<TMessageType>(Func<TMessageType, Task> action, SubscriptionType subscriptionType)
        {
            Type t = typeof(TMessageType);
            IList actionlst;
            var actiondetail = new Subscription<TMessageType>(action, this);

            lock (lockObj)
            {
                if (!subscriber.TryGetValue(t, out actionlst))
                {
                    actionlst = new List<Subscription<TMessageType>>();
                    actionlst.Add(actiondetail);
                    subscriber.Add(t, actionlst);
                }
                else
                {
                    if (subscriptionType != SubscriptionType.Singleton)
                    {
                        actionlst.Add(actiondetail);
                    }
                }
            }

            return actiondetail;
        }

        public void UnSbscribe<TMessageType>(Subscription<TMessageType> subscription)
        {
            Type t = typeof(TMessageType);
            if (subscriber.ContainsKey(t))
            {
                lock (lockObj)
                {
                    subscriber[t].Remove(subscription);
                }

                subscription.Dispose();
            }
        }
    }
}
