import {Pipe, PipeTransform} from '@angular/core';
import {CRITICALITY} from '../../sharedService/app.criticality';

@Pipe({
    name: 'criticalityFilter'
})

export class CriticailityFilter implements PipeTransform{
    transform(record : any) :any {

        if(record !== undefined){
            for(let critic of CRITICALITY){
                if(parseInt(record) === critic.id){
                    return critic.value;
                }
            }
        }
    }
}