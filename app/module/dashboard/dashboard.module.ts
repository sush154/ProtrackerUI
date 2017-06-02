import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderModule} from '../appHeader/header.module';
import {DashboardComponent} from './dashboard.component';
import {DashboardTasks} from './dashboard-tasks.component';
import {DashboardProjects} from './dashboard-projects.component';
import {CriticalitySortModule} from '../../common/sort/criticality/criticality.sort.module';

import {ProjectProvider} from '../../providers/project/project.provider';


@NgModule({
    imports:        [AppHeaderModule,CommonModule,CriticalitySortModule],
    declarations:   [DashboardComponent,DashboardTasks,DashboardProjects],
    providers:      [ProjectProvider],
    exports:        [DashboardComponent]
})

export class DashboardModule{}