import {Component, OnInit} from '@angular/core';
import {ProjectProvider} from '../../providers/project/project.provider';

import {Project} from '../../model/project';


@Component({
    selector:       'dashboard',
    templateUrl:    './app/module/dashboard/dashboard.component.html',
    providers:      [ProjectProvider],
    styleUrls:      ['./app/module/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit{

    private projectsList : any;

    constructor(private projectProvider : ProjectProvider){}


    getAllProjects() : void {
        let projects : any;
        this.projectProvider.getAllProjects().then(res => this.projectsList = res);

    }

    ngOnInit(): void {
        this.getAllProjects();
    }
}