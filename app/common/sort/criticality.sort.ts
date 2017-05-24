import {Pipe, PipeTransform} from '@angular/core';

import {Task} from '../../model/task';


@Pipe({
    name: 'criticalitySort'
})

export class CriticalitySort implements PipeTransform {
    transform(records: any): any {
        var finalArr : any = [];
        if(records !== undefined){
            let showStopperArr : any = [];
            let criticalArr : any = [];
            let majorArr : any = [];
            let minorArr : any = [];
            let cosmeticArr : any = [];

            for(let record of records){
                if(record.criticality.toLowerCase() === 'show stopper'){
                    showStopperArr.push(record);
                }

                else if(record.criticality.toLowerCase() === 'critical'){
                    criticalArr.push(record);
                }

                else if(record.criticality.toLowerCase() === 'major'){
                    majorArr.push(record);
                }

                else if(record.criticality.toLowerCase() === 'minor'){
                    minorArr.push(record);
                }

                else if(record.criticality.toLowerCase() === 'cosmetic'){
                    cosmeticArr.push(record);
                }
            }

            if(showStopperArr.length !== 0){
                for(let showStopper of showStopperArr){
                    finalArr.push(showStopper);
                }
            }
            if(criticalArr.length !== 0){
                 for(let critical of criticalArr){
                    finalArr.push(critical);
                 }
            }
            if(majorArr.length !== 0){
                 for(let major of majorArr){
                    finalArr.push(major);
                 }
            }
            if(minorArr.length !== 0){
                 for(let minor of minorArr){
                    finalArr.push(minor);
                 }
            }
            if(cosmeticArr.length !== 0){
                 for(let cosmetic of cosmeticArr){
                    finalArr.push(cosmetic);
                 }
            }
        }

        return finalArr;
    }
}