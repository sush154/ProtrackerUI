import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TasksComponent} from './tasks.component';
import {AppHeaderModule} from '../appHeader/header.module';
import {CriticalitySortModule} from '../../common/sort/criticality/criticality.sort.module';

@NgModule({
    imports:        [AppHeaderModule,CriticalitySortModule,CommonModule],
    declarations:   [TasksComponent],
    providers:      [],
    exports:        [TasksComponent]
})

export class TasksModule{}