import {Component, Input} from '@angular/core';
import {Project} from '../../model/project';


@Component({
    selector: 'dashboard-projects',
    templateUrl: './app/module/dashboard/dashboard-projects.html',
    styleUrls:      ['./app/module/dashboard/dashboard.component.css']
})

export class DashboardProjects {

    @Input() projectsList : Project[];
}