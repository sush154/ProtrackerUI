import {NgModule} from '@angular/core';

import {NotesComponent} from './notes.component';
import {AppHeaderModule} from '../appHeader/header.module';

@NgModule({
    imports:        [AppHeaderModule],
    declarations:   [NotesComponent],
    providers:      [],
    bootstrap:      [NotesComponent],
    exports:        [NotesComponent]
})

export class NotesModule {}