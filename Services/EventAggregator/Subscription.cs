using System;
using System.Reflection;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react_todo.Contracts;

namespace react_todo.Services.EventAggregator
{
    public class Subscription<TMessage> : IDisposable
    {
        public readonly MethodInfo MethodInfo;
        private readonly IEventAggregator EventAggregator;
        public readonly WeakReference TargetObjet;
        public readonly bool IsStatic;

        private bool isDisposed;
        public Subscription(Func<TMessage, Task> action, IEventAggregator eventAggregator)
        {
            MethodInfo = action.Method;
            if (action.Target == null)
                IsStatic = true;
            TargetObjet = new WeakReference(action.Target);
            EventAggregator = eventAggregator;
        }

        ~Subscription()
        {
            if (!isDisposed)
                Dispose();
        }

        public void Dispose()
        {
            EventAggregator.UnSbscribe(this);
            isDisposed = true;
        }

        public Func<TMessage, Task> CreatAction()
        {
            if (TargetObjet.Target != null && TargetObjet.IsAlive)
                return (Func<TMessage, Task>)Delegate.CreateDelegate(typeof(Func<TMessage, Task>), TargetObjet.Target, MethodInfo);
            if (this.IsStatic)
                return (Func<TMessage, Task>)Delegate.CreateDelegate(typeof(Func<TMessage, Task>), MethodInfo);

            return null;
        }
    }
}
