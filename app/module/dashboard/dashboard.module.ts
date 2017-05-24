import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderModule} from '../appHeader/header.module';
import {DashboardComponent} from './dashboard.component';
import {DashboardTasks} from './dashboard-tasks.component';
import {DashboardProjects} from './dashboard-projects.component';
import {CriticalitySort} from '../../common/sort/criticality.sort';

import {ProjectProvider} from '../../providers/project/project.provider';


@NgModule({
    imports:        [AppHeaderModule,CommonModule],
    declarations:   [DashboardComponent,DashboardTasks,DashboardProjects,CriticalitySort],
    providers:      [ProjectProvider],
    exports:        [DashboardComponent]
})

export class DashboardModule{}