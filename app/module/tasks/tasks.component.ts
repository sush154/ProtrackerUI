import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskProvider} from '../../providers/task/task.provider';

@Component({
    selector: 'app-tasks',
    templateUrl: './app/module/tasks/tasks.component.html',
    styleUrls: ['./app/module/tasks/task.component.css'],
    providers: [TaskProvider]
})

export class TasksComponent implements OnInit{

    private taskList : any;

    constructor(private taskProvider : TaskProvider, private router : Router){}

    getAllTasks() : void {
        this.taskProvider.getAllTasks()
        .then((res) => {
            if(res.status === 401){
                this.router.navigate(['/login']);
            }
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

    ngOnInit() : void {
        this.getAllTasks();
    }
    
}