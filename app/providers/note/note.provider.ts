import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {URL} from '../../sharedService/service.url';

@Injectable()


export class NoteProvider{

    constructor(private http : Http){}

    private headers = new Headers({'Content-Type': 'application/json'});

    private serviceUrl = URL + "/notes";

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getAllNotes() : Promise<any> {
        let url = this.serviceUrl + '/getAllNotes';

        return this.http
            .get(url, {headers: this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            });
    }

    addNote(newNote : any) : Promise<any> {
        let url = this.serviceUrl + '/addNote';

        return this.http
            .post(url, JSON.stringify(newNote), {headers: this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            });
    }

    updateNote(updatedNote : any) : Promise<any> {
        let url = this.serviceUrl + "/updateNote";

        return this.http
            .post(url, JSON.stringify(updatedNote), {headers: this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            })
    };

    deleteNote(noteId : string) : Promise<any> {
        let url = this.serviceUrl + "/deleteNote";

        var data = {"noteId" : noteId};

        return this.http
            .post(url, JSON.stringify(data), {headers: this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            });
    }
}