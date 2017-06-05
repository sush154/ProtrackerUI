import {NgModule} from '@angular/core';
import {HelpModalComponent} from './app.help.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports : [CommonModule],
    declarations : [HelpModalComponent],
    exports : [HelpModalComponent]
})

export class HelpModule{}