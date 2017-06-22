import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskProvider} from '../../providers/task/task.provider';
import {ToasterService} from 'angular2-toaster';
import {IMyDpOptions} from 'mydatepicker';
import {ProjectProvider} from '../../providers/project/project.provider';
import {CRITICALITY} from '../../sharedService/app.criticality';

@Component({
    selector: 'app-tasks',
    templateUrl: './app/module/tasks/tasks.component.html',
    styleUrls: ['./app/module/tasks/task.component.css'],
    providers: [TaskProvider, ProjectProvider]
})

export class TasksComponent implements OnInit{

    private taskList : any;
    private projectStyling = "#000";
    private criticalStyling = "#757575";
    private newTask : any = {};
    private projectsList : any;
    private criticalityList : any = CRITICALITY;
    private differentProject : boolean = false;

    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
    };

    constructor(private taskProvider : TaskProvider,
                private router : Router,
                private projectProvider : ProjectProvider,
                private toastrService : ToasterService){}

    private expCompDate: Object;

    setDate(date : string) : Object {
        var returnedDate = {};
        if(date === 'default'){
            let dt = new Date();
           returnedDate = {date: {
                    year: dt.getFullYear(),
                    month: dt.getMonth() + 1,
                    day: dt.getDate()
                    }}

        }else {
            if(date !== undefined){
                returnedDate = {
                    date : {
                        year : parseInt(date.split("-")[0]),
                        month : parseInt(date.split("-")[1]),
                        day : parseInt(date.split("-")[2])
                    }
                }
            }

        }

        return returnedDate;
    }

    formatDate(date : any) : string {
        return date.formatted;
    }

    changeStyling(data : string, dropdownid : string) : void {
        if(data !== 'undefined'){
            if(dropdownid === 'projectStyling') this.projectStyling = "#000";
            if(dropdownid === 'criticalStyling') this.criticalStyling = "#000";
        }/*else{
            this.dropdownid = "#757575";
        }*/
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

    populateNewTask() : void {
        var cookies = document.cookie.split(';');
        for(let c of cookies){
            if(c.split('=')[0].trim() === 'currentProject'){
                this.newTask.projectId = c.split('=')[1].trim();
            }
        }
    }

    getProjectTasks() : void {
        this.taskProvider.getProjectTasks()
        .then((res) => {
            if(res.status === 401){
                this.router.navigate(['/login']);
            }if (res.status === 200){
                this.taskList = res.tasks;
            }else {
                this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
            }
        });
    }

    getAllProjects() : void {
        this.projectProvider.getAllProjects()
            .then((res) => {
                if(res.status === 200){
                    this.projectsList = res.projects;
                }
            });
    }

    addTask() : void {
        if(this.expCompDate !== undefined && this.expCompDate !== 'undefined') this.newTask.expectedComDate = this.formatDate(this.expCompDate);
        this.newTask.taskStatus = 0;
        this.taskProvider.addTask(this.newTask)
            .then((res) => {
                if(res.status === 200){
                    this.toastrService.pop('success', 'Task Added', 'The Task is added successfully !');
                    (<HTMLFormElement>document.getElementById("addTaskForm")).reset();
                    $("#addTaskSm").modal('hide');
                    this.getProjectTasks();
                }else if(res.status === 401){
                    this.router.navigate(['/login']);
                }else {
                    this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
                }
        });
    }

    ngOnInit() : void {
        this.getProjectTasks();
        this.getAllProjects();

    }
    
}