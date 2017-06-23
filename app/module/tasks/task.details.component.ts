import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {TaskProvider} from '../../providers/task/task.provider';
import {ToasterService} from 'angular2-toaster';
import {IMyDpOptions} from 'mydatepicker';
import {CRITICALITY} from '../../sharedService/app.criticality';
import {ProjectProvider} from '../../providers/project/project.provider';

@Component({
    selector: 'task-details',
    templateUrl : './app/module/tasks/tasks.details.component.html',
    styleUrls: ['./app/module/tasks/task.component.css'],
    providers: [TaskProvider]
})

export class TaskDetailsComponent implements OnInit{
    private selectedTaskId : string;
    private taskDetails : any = {};
    private expCompDate: Object;
    private editableTasks : any = {};
    private criticalityList : any = CRITICALITY;
    private projectStyling = "#000";
    private criticalStyling = "#000";
    private newComment : any = {};
    private updatedComment : any = {};

    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
    };

    constructor(private location : Location,
                private currentRoute : ActivatedRoute,
                private taskProvider : TaskProvider,
                private toastrService : ToasterService,
                private projectProvider : ProjectProvider){}


    backNavigation() : void {
        this.location.back();
    }

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
                        day : parseInt(date.split("-")[2])+1
                    }
                }
            }

        }

        return returnedDate;
    }

    changeStyling(data : string) : void {
        if(data !== 'select'){
           this.criticalStyling = "#000";
        }else{
            this.criticalStyling = "#757575";
        }
    }

    formatDate(date : any) : string {

        if(date.formatted){
            return date.formatted;
        }
        else{
            let returnedDate = '';
            if(date.date.month < 10){
                returnedDate = date.date.day + "/0" + date.date.month + "/" + date.date.year;
            }else {
                returnedDate = date.date.day + "/" + date.date.month + "/" + date.date.year;
            }
            return returnedDate;
        }
    }

    getTaskDetails() : void {
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

    getAllProjects() : void {
        this.projectProvider.getAllProjects()
            .then((res) => {
                if(res.status === 200){
                    this.projectsList = res.projects;
                }
            });
    }

    EditTaskDetails() : void {
        this.editableTasks._id = this.taskDetails._id;
        this.editableTasks.taskSummary = this.taskDetails.taskSummary;
        this.editableTasks.description = this.taskDetails.description;
        this.editableTasks.projectId = this.taskDetails.project._id;
        this.editableTasks.criticality = this.taskDetails.criticality;
        this.expCompDate = this.setDate(this.taskDetails.expectedComDate.split("T")[0]);
    }

    updateTask() : void {
        if(this.expCompDate !== undefined && this.expCompDate !== 'undefined') this.editableTasks.expectedComDate = this.formatDate(this.expCompDate);
        this.taskProvider.updateTask(this.editableTasks)
            .then((res) => {
                if(res.status === 200){
                    $("#editTaskSm").modal('hide');
                    this.toastrService.pop('success', 'Project Updated', 'The Task is updated successfully !');
                    this.getTaskDetails();
                }else {
                    this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
                }
            })
    }

    addComment() : void {
        this.newComment.taskId = this.taskDetails._id;
        this.taskProvider.addComment(this.newComment)
            .then((res) => {
                if(res.status === 200){
                    $("#addCommentSm").modal('hide');
                    this.toastrService.pop('success', 'Comment Added', 'The Comment is added successfully !');
                    this.getTaskDetails();
                }else{
                    this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
                }
            });
    }

    populateComment(updatedComment : any) : void {
        this.updatedComment.comment = updatedComment.comment;
        this.updatedComment._id = updatedComment._id;
    }

    updateComment() : void {
        this.taskProvider.updateComment(this.updatedComment)
            .then((res) => {
                if(res.status === 200){
                    $("#editCommentSm").modal('hide');
                    this.toastrService.pop('success', 'Comment Updated', 'The Comment is updated successfully !');
                    this.getTaskDetails();
                }else {
                    this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
                }
            });
    }

    deleteComment(deleteComment : any) : void {
        deleteComment.taskId = this.taskDetails._id;
        this.taskProvider.deleteComment(deleteComment)
            .then((res) => {
                if(res.status === 200){
                    this.toastrService.pop('success', 'Comment Deleted', 'The Comment is deleted successfully !');
                    this.getTaskDetails();
                }else {
                    this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
                }
            });
    }

    ngOnInit() : void {
        this.getTaskDetails();
        this.getAllProjects();
    }
}