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
        dateFormat: 'dd/mm/yyyy',
    };

    constructor(private location : Location,
                private currentRoute : ActivatedRoute,
                private projectProvider : ProjectProvider,
                private toastrService : ToasterService,
                private clientProvider : ClientProvider){}

    backNavigation() : void {
        this.location.back();
    }

    populateEditProject() : void {
        this.editableProject = this.projectDetails;
        this.editableProject.client = this.projectDetails.client._id;
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