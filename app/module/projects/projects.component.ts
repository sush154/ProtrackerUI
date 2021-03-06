import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectProvider} from '../../providers/project/project.provider';
import {ClientProvider} from '../../providers/client/client.provider';
import {ToasterService} from 'angular2-toaster';
import {Project} from '../../model/project';
import {ClientDomainList} from '../../sharedService/app.clients.domain';
//import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
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
    private noProject : boolean = true;

    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
    };

    private selectedProjectId : string;

    //let date = new Date();

    private completionDate: Object = this.setDate('default');
    private expCompDate: Object = this.setDate('2017-06-07');

    constructor(private projectProvider : ProjectProvider,
                private router : Router,
                private toastrService : ToasterService,
                private clientProvider : ClientProvider){}

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

    getAllProjects() : void {

        this.projectProvider.getAllProjects().then(res => {
            if(res.status === 401){
                this.router.navigate(['/login']);
            }
            if(res.status === 201){
                this.toastrService.pop('error', 'Current Project', 'You cannot mark two projects as current at same time. Please mark one project as complete.');
            }else{
                this.projectsList = res.projects;

                if(res.projects.length > 0){
                    this.noProject = false;
                }else if(res.projects.length === 0) {
                    this.noProject = true;
                }
            }

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

    selectProject(projectId : string) : void {
        this.selectedProjectId = projectId;
    }

    addClient() : void {
        this.clientProvider.addClient(this.newClient).then(res => {
            if(res.status === 200) {
                this.toastrService.pop('success', 'Client Added', 'The Client is added successfully !');
                this.getAllClients()
                this.toggleAddClient();
            }
        });
    }

    formatDate(date : any) : string {
        return date.formatted;
    }

    addProject() : void {

        if(this.expCompDate)  this.newProject.expCompDate = this.formatDate(this.expCompDate);
        if(this.completionDate)  this.newProject.completionDate = this.formatDate(this.completionDate);

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

    deleteProject() : void {
        $("#deleteProjectSm").modal('hide');
        this.projectProvider.deleteProject(this.selectedProjectId).then(res => {
            if(res.status === 200) {
                this.toastrService.pop('success', 'Project Deleted', 'The Project is deleted successfully !');
                this.getAllProjects();
            }else{
                this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
            }
        });
    }

    openProjectDetails(projectId : any) : void {
        this.router.navigate(['/projects', projectId]);
    }

    applyFilter(filterType : string, filterValue : string) : void {
        this.projectProvider.applyProjectIdFilter(filterValue, filterType)
            .then((res) => {
                if(res.status === 401){
                    this.router.navigate(['/login']);
                }
                if(res.status === 200){
                    this.projectsList = res.projects;

                    if(res.projects.length === 0){
                        this.noProject = true;
                    }else if(res.projects.length > 0){
                        this.noProject = false;
                    }
                }else{
                    this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
                }
            })
    }

    getValue() : void {
        console.log("asdasd");
    }

    ngOnInit(): void {
        this.getAllProjects();
        this.getAllClients();
    }

}