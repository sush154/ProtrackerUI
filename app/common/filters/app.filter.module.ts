import {NgModule} from '@angular/core';
import {CriticailityFilter} from './app.task.criticality.filter';
import {TaskStatusFilter} from './app.task.status.filter';

@NgModule({
    imports : [],
    declarations : [CriticailityFilter, TaskStatusFilter],
    exports : [CriticailityFilter, TaskStatusFilter]
})

export class FilterModule {}