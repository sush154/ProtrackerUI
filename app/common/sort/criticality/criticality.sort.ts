import {Pipe, PipeTransform} from '@angular/core';

import {Task} from '../../../model/task';


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
            let completedArr : any = [];

            for(let record of records){
                if(record.criticality === "1"){
                    if(record.taskStatus !== 'Completed'){
                        showStopperArr.push(record);
                    }
                    else {
                        completedArr.push(record);
                    }
                }

                else if(record.criticality === "2"){
                    if(record.taskStatus !== 'Completed'){
                        criticalArr.push(record);
                    }
                    else {
                        completedArr.push(record);
                    }
                }

                else if(record.criticality === "3"){
                    if(record.taskStatus !== 'Completed'){
                        majorArr.push(record);
                    }
                    else {
                        completedArr.push(record);
                    }
                }

                else if(record.criticality === "4"){
                    if(record.taskStatus !== 'Completed'){
                        minorArr.push(record);
                    }
                    else {
                        completedArr.push(record);
                    }
                }

                else if(record.criticality === "5"){
                    if(record.taskStatus !== 'Completed'){
                        cosmeticArr.push(record);
                    }
                    else {
                        completedArr.push(record);
                    }
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

            if(completedArr.length !== 0){
                for(let complete of completedArr){
                    finalArr.push(complete);
                }
            }

        }

        return finalArr;
    }
}