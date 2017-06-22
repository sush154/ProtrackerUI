import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {TaskProvider} from '../../providers/task/task.provider';

@Component({
    selector: 'task-details',
    templateUrl : './app/module/tasks/tasks.details.component.html',
    styleUrls: ['./app/module/tasks/task.component.css'],
    providers: [TaskProvider]
})

export class TaskDetailsComponent implements OnInit{
    private selectedTaskId : string;
    private taskDetails : any = {};

    constructor(private location : Location,
                private currentRoute : ActivatedRoute,
                private taskProvider : TaskProvider){}


    backNavigation() : void {
        this.location.back();
    }

    ngOnInit() : void {
        this.currentRoute.params.subscribe(params => {
            this.selectedTaskId = params['id'];
            this.taskProvider.getTaskDetails(this.selectedTaskId)
                .then(res => {
                    if(res.status === 200){
                        this.taskDetails = res.task;
                    }else{
                        this.toastrService.pop('success', 'Server Error', 'We encountered server error. Please try later !');
                    }

                });
        });
    }
}