import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TasksComponent} from './tasks.component';
import {TaskDetailsComponent} from './task.details.component';
import {AppHeaderModule} from '../appHeader/header.module';
import {CriticalitySortModule} from '../../common/sort/criticality/criticality.sort.module';
import {DateParserModule} from '../../common/dateParser/app.date.parser.module';
import {FilterModule} from '../../common/filters/app.filter.module';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports:        [AppHeaderModule,CriticalitySortModule,CommonModule,
                        FormsModule,MyDatePickerModule,ToasterModule,
                        DateParserModule, FilterModule],
    declarations:   [TasksComponent, TaskDetailsComponent],
    providers:      [],
    exports:        [TasksComponent, TaskDetailsComponent]
})

export class TasksModule{}