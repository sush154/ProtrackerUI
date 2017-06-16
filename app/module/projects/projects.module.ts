import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppHeaderModule} from '../appHeader/header.module';
import {HelpModule} from '../helpModal/app.help.module';
import {ProjectsComponent} from './projects.component';
import {ProjectDetailsComponent} from './project.details.component';
import {ProjectSortModule} from '../../common/sort/project/project.sort.module';
import {DateParserModule} from '../../common/dateParser/app.date.parser.module';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
    imports:        [AppHeaderModule, CommonModule, ProjectSortModule, ToasterModule,
                        FormsModule, HelpModule,
                        DateParserModule, MyDatePickerModule],
    declarations:   [ProjectsComponent, ProjectDetailsComponent],
    providers:      [],
    exports:        [ProjectsComponent, ProjectDetailsComponent]
})

export class ProjectsModule{}