import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateParser'
})

export class DateParser implements PipeTransform{
    transform(record : any) :any {

        if((typeof record === 'string') && record !== undefined){
            let fullDate = record.split("T")[0];

            let yr = fullDate.split("-")[0];
            let mn = fullDate.split("-")[1];
            let dt = parseInt(fullDate.split("-")[2])+1;

            return dt + "/" + mn + "/" + yr;
        }
    }
}