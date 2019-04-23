export interface ITask {
    taskId: number;
    priority: number;
    name: string;
    description: string;
    dateTimeToComplete: Date;
    addedOn: Date;
    isActive: boolean;
}

export interface ITasks {
    tasks: ITask[];
}