import {Component, OnInit} from '@angular/core';
import {Project} from '../../model/project';
import {ProjectProvider} from '../../providers/project/project.provider';
import {Router} from '@angular/router';


@Component({
    selector: 'dashboard-projects',
    templateUrl: './app/module/dashboard/dashboard-projects.html',
    styleUrls:      ['./app/module/dashboard/dashboard.component.css'],
    providers:      [ProjectProvider]
})

export class DashboardProjects implements OnInit{


    private projectsList : any;

    constructor(private projectProvider : ProjectProvider, private router : Router){}

    getAllProjects() : void {

        this.projectProvider.getAllProjects().then(res => {
            if(res.status === 401){
                this.router.navigate(['/login']);
            }
            this.projectsList = res.projects;
        });

    }

    ngOnInit(): void {
        this.getAllProjects();
    }
}