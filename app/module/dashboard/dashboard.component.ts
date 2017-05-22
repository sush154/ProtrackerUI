import {Component, OnInit} from '@angular/core';
import {ProjectProvider} from '../../providers/project/project.provider';
import {Router} from '@angular/router';
import {Project} from '../../model/project';


@Component({
    selector:       'dashboard',
    templateUrl:    './app/module/dashboard/dashboard.component.html',
    providers:      [ProjectProvider],
    styleUrls:      ['./app/module/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit{

    private projectsList : any;

    constructor(private projectProvider : ProjectProvider, private router : Router){}


    getAllProjects() : void {
        let projects : any;
        this.projectProvider.getAllProjects().then(res => {
            if(res.status === 401){
                this.router.navigate(['/login']);
            }
            this.projectsList = res;
        });

    }

    ngOnInit(): void {
        this.getAllProjects();
    }
}