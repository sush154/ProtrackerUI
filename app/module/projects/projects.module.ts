import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppHeaderModule} from '../appHeader/header.module';
import {ProjectsComponent} from './projects.component';
import {ProjectSortModule} from '../../common/sort/project/project.sort.module';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {MyDatePickerModule} from 'mydatepicker';

@NgModule({
    imports:        [AppHeaderModule, CommonModule, ProjectSortModule, ToasterModule, FormsModule, MyDatePickerModule],
    declarations:   [ProjectsComponent],
    providers:      [],
    exports:        [ProjectsComponent]
})

export class ProjectsModule{}