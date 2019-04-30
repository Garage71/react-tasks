import moment from 'moment';
import { ITask } from '../store/tasksState';


export default class MoqServer {
  private static id = 100;

  private static formatTime = (time: moment.Moment) : string  => {
    return time.format('YYYY-MM-DDTHH:mm:ss');
  }
  
  private static nextId = () : number => {
    MoqServer.id++;
    return MoqServer.id;
  }
  
  public static getTasks = () : ITask[] => {
    const tasks = [];
    const now = moment();
    for(let i=0; i < 50; i++) {
      tasks.push({
        taskId: MoqServer.nextId(),
        addedOn: MoqServer.formatTime(now),
        dateTimeToComplete: MoqServer.formatTime(now.add(i, 'minutes')),
        priority: 100,
        description: `This is a test ${MoqServer.id}`,
        name: `TestTask ${MoqServer.id}`,
        isActive: true,
      });
    }
    return tasks;
  }

  public static addTask = (task: ITask) : ITask => {
    return {
      ...task,
      taskId: MoqServer.nextId(),
    };
  }
}