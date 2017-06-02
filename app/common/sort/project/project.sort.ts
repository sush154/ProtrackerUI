import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'projectSort'
})

export class ProjectSort implements PipeTransform{

    transform(records: any): any {

        var finalArr : any = [];

        if(records !== undefined){
            for(let record of records){
                if(record.isCurrent || record.isCurrent == 'true'){
                    finalArr.push(record);
                    records.splice(records.indexOf(record),1);
                    break;
                }
            }
            for(let record of records){
                finalArr.push(record);
            }
        }

        return finalArr;
    }
}