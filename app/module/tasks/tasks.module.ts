import {NgModule} from '@angular/core';

import {TasksComponent} from './tasks.component';
import {AppHeaderModule} from '../appHeader/header.module';

@NgModule({
    imports:        [AppHeaderModule],
    declarations:   [TasksComponent],
    providers:      [],
    exports:        [TasksComponent]
})

export class TasksModule{}