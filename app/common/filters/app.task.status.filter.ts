import {Pipe, PipeTransform} from '@angular/core';

import {TASKSTATUS} from '../../sharedService/app.task.status';

@Pipe({
    name: 'taskStatusFilter'
})

export class TaskStatusFilter implements PipeTransform{
    transform(record : any) :any {

        if(record !== undefined){
            for(let status of TASKSTATUS){
                if(status.id === parseInt(record)){
                    return status.value;
                }
            }
        }
    }
}