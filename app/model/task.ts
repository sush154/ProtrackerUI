import {Comment} from './comment';

export class Task {
    taskId: string;
    summary: string;
    criticality: string;
    raisedType: string;
    description: string;
    stepsReproduce: string;
    taskType: string;
    comments : Comment[];
    taskStatus: string;
    assignedTo: string;
    inDanger : boolean;
}