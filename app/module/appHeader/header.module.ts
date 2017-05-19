import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderComponent} from './header.component';


@NgModule({
    imports:        [CommonModule],
    declarations:   [AppHeaderComponent],
    providers:      [],
    exports:        [AppHeaderComponent]
})

export class AppHeaderModule{}