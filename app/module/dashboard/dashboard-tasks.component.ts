import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskProvider} from '../../providers/task/task.provider';


@Component({
    selector: 'dashboard-tasks',
    templateUrl: './app/module/dashboard/dashboard-tasks.html',
    styleUrls:      ['./app/module/dashboard/dashboard.component.css'],
    providers:  [TaskProvider]
})

export class DashboardTasks implements OnInit{

    private taskList : any;

    constructor(private taskService : TaskProvider, private router : Router){}

    getAllTasks() : void {
        this.taskService.getProjectTasks()
        .then((res) => {
            this.taskList = res.tasks;
        });
    }

    isInDanger(expectedComDate : any, taskStatus : any): boolean{
        var parts = expectedComDate.split("T")[0].split("-");
        if(new Date(parts[0], parts[1]-1, parts[2]).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)){
            if(taskStatus !== "Completed"){
                return true;
            }
        }

        return false;
    }

    openTaskDetails(taskId : string) : void {
        this.router.navigate(['/tasks', taskId]);
    }

    ngOnInit() : void {
        this.getAllTasks();
    }
}