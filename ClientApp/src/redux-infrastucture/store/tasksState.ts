import moment from 'moment';
export interface ITask {
    taskId: number;
    priority: number;
    name: string;
    description: string;
    dateTimeToComplete: Date | moment.Moment | string;
    addedOn: Date | moment.Moment | string;
    isActive: boolean;
}

export interface ITasks {
    tasks: ITask[];
}