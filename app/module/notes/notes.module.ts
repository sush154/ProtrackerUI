import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NotesComponent} from './notes.component';
import {AppHeaderModule} from '../appHeader/header.module';
import {NoteProvider} from '../../providers/note/note.provider';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@NgModule({
    imports:        [AppHeaderModule, CommonModule, FormsModule, ToasterModule],
    declarations:   [NotesComponent],
    providers:      [NoteProvider],
    exports:        [NotesComponent]
})

export class NotesModule {}