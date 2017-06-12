import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ProjectProvider} from '../../providers/project/project.provider';
import {ClientProvider} from '../../providers/client/client.provider';
import {ToasterService} from 'angular2-toaster';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {IMyDpOptions} from 'mydatepicker';

@Component({
    selector : 'project-details',
    templateUrl : './app/module/projects/project.details.component.html',
    styleUrls: ['./app/module/projects/project.component.css'],
    providers: [ProjectProvider,ClientProvider]
})

export class ProjectDetailsComponent implements OnInit{

    private selectedProjectId : string;
    private clientsList : any;
    private projectDetails : any = {};
    private editableProject : any = {};

    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
    };

    private completionDate: Object = this.setDate('default');
    private expCompDate: Object = this.setDate('default');

    constructor(private location : Location,
                private currentRoute : ActivatedRoute,
                private projectProvider : ProjectProvider,
                private toastrService : ToasterService,
                private clientProvider : ClientProvider){}

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
                        day : parseInt(date.split("-")[2])
                    }
                }
            }

        }

        return returnedDate;
    }

    populateEditProject() : void {
        /*this.editableProject = this.projectDetails;
        this.editableProject.client = this.projectDetails.client._id;*/
        this.editableProject.projectName = this.projectDetails.projectName;
        this.editableProject.description = this.projectDetails.description;
        this.editableProject.client = this.projectDetails.client._id;
        this.editableProject.isCurrent = this.projectDetails.isCurrent;
        if(this.projectDetails.completionDate !== undefined){
            this.editableProject.completionDate = this.projectDetails.completionDate;
        }
        if(this.projectDetails.expCompDate !== undefined){
            this.editableProject.expCompDate = this.projectDetails.expCompDate;
        }

        if(this.editableProject.completionDate !== undefined){
            this.completionDate = this.setDate(this.editableProject.completionDate.split("T")[0]);
        }

        if(this.editableProject.expCompDate !== undefined) {
            this.expCompDate = this.setDate(this.editableProject.expCompDate.split("T")[0]);
        }

    }

    getAllClients() : void {
        this.clientProvider.getAllClient().then(res => {
            this.clientsList = res.clients;
        });
    }

    updateProject() : void {
        if(this.editableProject.expCompDate !== undefined && this.editableProject.expCompDate !== 'undefined')  this.editableProject.expCompDate = this.editableProject.expCompDate.formatted;
        if(this.editableProject.completionDate !== undefined && this.editableProject.completionDate !== null)  this.editableProject.completionDate = this.editableProject.completionDate.formatted;

        this.projectProvider.updateProject(this.editableProject)
            .then(res => {
                console.log(res);
            });
    }

    ngOnInit() : void {
        this.currentRoute.params.subscribe(params => {
            this.selectedProjectId = params['id'];
            this.projectProvider.getProjectDetails(this.selectedProjectId)
                .then(res => {
                    if(res.status === 200){
                        this.projectDetails = res.project;
                    }else{
                        this.toastrService.pop('success', 'Server Error', 'We encountered server error. Please try later !');
                    }

                });
        });
        this.getAllClients();
    }
}