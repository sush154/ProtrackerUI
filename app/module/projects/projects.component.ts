import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectProvider} from '../../providers/project/project.provider';
import {ClientProvider} from '../../providers/client/client.provider';
import {ToasterService} from 'angular2-toaster';
import {Project} from '../../model/project';
import {ClientDomainList} from '../../sharedService/app.clients.domain';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {IMyDpOptions} from 'mydatepicker';

@Component({
    selector: 'app-projects',
    templateUrl: './app/module/projects/projects.component.html',
    styleUrls: ['./app/module/projects/project.component.css'],
    providers: [ProjectProvider,ClientProvider]
})

export class ProjectsComponent{

    private projectsList : any;
    private clientsList : any;
    private newProject : any = {};
    private newClient : any = {};
    private clientStyling = "#757575";
    private addClientFlag : boolean = true;
    private clientDomainList : any = ClientDomainList;
    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
    };

    constructor(private projectProvider : ProjectProvider,
                private router : Router,
                private toastrService : ToasterService,
                private clientProvider : ClientProvider){}

    getAllProjects() : void {

        this.projectProvider.getAllProjects().then(res => {
            if(res.status === 401){
                this.router.navigate(['/login']);
            }
            if(res.status === 201){
                this.toastrService.pop('error', 'Current Project', 'You cannot mark two projects as current at same time. Please mark one project as complete.');
            }
            this.projectsList = res.projects;
        });

    }

    getAllClients() : void {
        this.clientProvider.getAllClient().then(res => {
            this.clientsList = res.clients;
        });
    }

    changeStyling(client : string) : void {
        if(client !== 'undefined'){
            this.clientStyling = "#000";
        }else{
            this.clientStyling = "#757575";
        }
    }

    toggleAddClient() : void {
        if(this.addClientFlag){
            this.addClientFlag = false;
        }else {
            this.addClientFlag = true;
        }
    }

    addClient() : void {
        this.clientProvider.addClient(this.newClient).then(res => {
            this.toastrService.pop('success', 'Client Added', 'The Client is added successfully !');
            this.getAllClients()
            this.toggleAddClient();
        });
    }

    addProject() : void {

        if(this.newProject.expComDate !== undefined && this.newProject.expComDate !== 'undefined')  this.newProject.expComDate = this.newProject.expComDate.formatted;
        if(this.newProject.completionDateDate !== undefined && this.newProject.completionDateDate !== 'undefined')  this.newProject.completionDateDate = this.newProject.completionDateDate.formatted;


        this.projectProvider.addProject(this.newProject).then(res => {
            if(res.status === 200){

                (<HTMLFormElement>document.getElementById("addProjectForm")).reset();
                $("#addProjectSm").modal('hide');
                this.toastrService.pop('success', 'Project Added', 'The Project is added successfully !');
                this.getAllProjects();
            }
            else if(res.status === 201){
                this.toastrService.pop('error', 'Current Project', 'You cannot mark two projects as current at same time. Please mark one project as complete.');
            }
        });

    }

    ngOnInit(): void {
        this.getAllProjects();
        this.getAllClients();
    }

}