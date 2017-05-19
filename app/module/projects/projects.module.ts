import {NgModule} from '@angular/core';

import {AppHeaderModule} from '../appHeader/header.module';
import {ProjectsComponent} from './projects.component';

@NgModule({
    imports:        [AppHeaderModule],
    declarations:   [ProjectsComponent],
    providers:      [],
    bootstrap:      [ProjectsComponent],
    exports:        [ProjectsComponent]
})

export class ProjectsModule{}