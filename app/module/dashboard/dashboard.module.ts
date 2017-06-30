import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderModule} from '../appHeader/header.module';
import {DashboardComponent} from './dashboard.component';
import {DashboardTasks} from './dashboard-tasks.component';
import {DashboardProjects} from './dashboard-projects.component';
import {CriticalitySortModule} from '../../common/sort/criticality/criticality.sort.module';
import {FilterModule} from '../../common/filters/app.filter.module';
import {NgxPaginationModule} from 'ngx-pagination';

import {ProjectProvider} from '../../providers/project/project.provider';


@NgModule({
    imports:        [AppHeaderModule,CommonModule,CriticalitySortModule, FilterModule, NgxPaginationModule],
    declarations:   [DashboardComponent,DashboardTasks,DashboardProjects],
    providers:      [ProjectProvider],
    exports:        [DashboardComponent]
})

export class DashboardModule{}