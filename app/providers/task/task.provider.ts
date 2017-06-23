import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {URL} from '../../sharedService/service.url';

@Injectable()

export class TaskProvider{

    constructor(private http : Http){}

    private headers = new Headers({'Content-Type': 'application/json'});

    private serviceUrl = URL + "/task";

    private handleError(error: any): Promise<any> {
         console.error('An error occurred', error); // for demo purposes only
         return Promise.reject(error.message || error);
     }

    getProjectTasks() : Promise<any>{
        let url = this.serviceUrl + "/getProjectTasks";
        return this.http
            .get(url, {headers : this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            })
    }

    addTask(newTask : any) : Promise<any> {
        let url = this.serviceUrl + "/addTask";

        return this.http
            .post(url, JSON.stringify(newTask), {headers : this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            });
    }

    getTaskDetails(taskId : string) : Promise<any> {
        let url = this.serviceUrl + "/getTask/"+taskId;

        return this.http
            .get(url, {headers : this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            });
    }

    updateTask(updatedTask : any) : Promise<any> {
        let url = this.serviceUrl + "/updateTask";

        return this.http
            .post(url, JSON.stringify(updatedTask), {headers : this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            });
    }

    addComment(newComment : any) : Promise<any> {
        let url = this.serviceUrl + "/addComment";

        return this.http
            .post(url, JSON.stringify(newComment), {headers : this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            })
    }

    updateComment(updatedComment : any) : Promise<any> {
        console.log(updatedComment);

        let url = this.serviceUrl + "/updateComment";

        return this.http
            .post(url, JSON.stringify(updatedComment), {headers : this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            })
    }

    deleteComment(deleteComment : any) : Promise<any> {
        console.log(deleteComment);
        let url = this.serviceUrl + "/deleteComment";

        return this.http
            .post(url, JSON.stringify(deleteComment), {headers : this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            });
    }

}