import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NOTESTTYPES} from '../../sharedService/app.notes.types';
import {ToasterService} from 'angular2-toaster';
import {NoteProvider} from '../../providers/note/note.provider';

@Component({
    selector:       'app-notes',
    templateUrl:    './app/module/notes/notes.component.html',
    styleUrls :     ['./app/module/notes/notes.component.css'],
    providers :     [NoteProvider]
})

export class NotesComponent implements OnInit{

    private notesTypesList : any = NOTESTTYPES;
    private dropdownStyling : string = "#757575";
    private newNote : any = {};
    private credenList : any;
    private urlsList : any;
    private serverList : any;
    private miscList : any;
    private editNote : any = {};

    constructor(private toastrService : ToasterService,
                private noteProvider : NoteProvider,
                private router : Router){}

    changeStyling(data : string) : void {
        if(data !== 'undefined'){
            this.dropdownStyling = "#000";
        }else{
            this.dropdownStyling= "#757575";
        }
    }

    populateLists(notesList : any) : void {
        this.credenList = new Array();
        this.urlsList = new Array();
        this.serverList = new Array();
        this.miscList = new Array();

        if(notesList !== undefined){
            for(let note of notesList) {
                if(note.noteType === '0'){
                    this.credenList.push(note);
                }else if(note.noteType === '1'){
                    this.urlsList.push(note);
                }else if(note.noteType === '2') {
                    this.serverList.push(note);
                }else if(note.noteType === '3') {
                    this.miscList.push(note);
                }
            }
        }

    };

    populateEditNote(note : any) : void {
        this.editNote._id = note._id;
        this.editNote.note = note.note.replace(/<br ?\/?>/g, "\n");
        this.editNote.noteType = note.noteType;
    }

    getAllNotes() : void {
        this.noteProvider.getAllNotes()
            .then((res) => {
                if(res.status === 200){
                    this.populateLists(res.notes);
                }else if(res.status === 401) {
                    this.router.navigate(['/login']);
                }else {
                    this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
                }
            })
    };

    addNote() : void {
        this.noteProvider.addNote(this.newNote)
            .then((res) => {
                if(res.status === 200){
                    this.toastrService.pop('success', 'Note Added', 'The Note is added successfully !');
                    (<HTMLFormElement>document.getElementById("addNotesForm")).reset();
                    $("#addNotesSm").modal('hide');
                    this.getAllNotes();
                }else if(res.status === 401) {
                    this.router.navigate(['/login']);
                }else {
                    this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
                }
            })
    };

    updateNote() : void {
        this.noteProvider.updateNote(this.editNote)
            .then((res) => {
                if(res.status === 200){
                    this.toastrService.pop('success', 'Note Updated', 'The Note is updated successfully !');
                    $("#editNoteSm").modal('hide');
                    this.getAllNotes();
                }else if(res.status === 401) {
                    this.router.navigate(['/login']);
                }else {
                    this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
                }
            })
    };

    deleteNote() : void {
        this.noteProvider.deleteNote(this.editNote._id)
            .then((res) => {
                if(res.status === 200) {
                    this.toastrService.pop('success', 'Note Deleted', 'The Note is deleted successfully !');
                    $("#deleteNoteSm").modal('hide');
                    this.getAllNotes();
                }else if (res.status === 401) {
                    this.router.navigate(['/login']);
                }else {
                    this.toastrService.pop('error', 'Server Error', 'We encountered server error. Please try later !');
                }

            })
    }

    ngOnInit() : void {
        this.getAllNotes();
    }
}