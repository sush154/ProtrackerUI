import {NgModule} from '@angular/core';

import {AppHeaderModule} from '../appHeader/header.module';
import {ProjectsComponent} from './projects.component';

@NgModule({
    imports:        [AppHeaderModule],
    declarations:   [ProjectsComponent],
    providers:      [],
    exports:        [ProjectsComponent]
})

export class ProjectsModule{}