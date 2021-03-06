import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {URL} from '../../sharedService/service.url';
import {Project} from '../../model/project';


@Injectable()

export class ProjectProvider {

    constructor(private http : Http){}

    private headers = new Headers({'Content-Type': 'application/json'});

    private serviceUrl = URL + "/project";

    private handleError(error: any): Promise<any> {
         console.error('An error occurred', error); // for demo purposes only
         return Promise.reject(error.message || error);
     }

    getAllProjects() : Promise<any> {
        let url = this.serviceUrl + "/getAllProjects";
        return this.http
            .get(url,{headers: this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                if(res.json().data.status === 401){
                    return res.json().data;
                }
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            });
    }

    addProject(project : any) : Promise<any> {
        let url = this.serviceUrl + "/addProject";

        return this.http
            .post(url, JSON.stringify(project),{headers: this.headers,withCredentials: true})
            .toPromise()
            .then(res => {
                return res.json().data;
            })
            .catch(err => {
                this.handleError(err);
            });
    }

    deleteProject(projectId : string) : Promise<any> {
        let url = this.serviceUrl + "/deleteProject";
        let data = {"projectId" : projectId};
        return this.http
            .post(url, JSON.stringify(data), {headers: this.headers,withCredentials: true})
            .toPromise()
            .then(res => {
                return res.json().data;
            })
            .catch( err => {
                this.handleError(err);
            });
    }

    getProjectDetails(projectId : string) : Promise<any> {
        let url = this.serviceUrl + "/getProject/"+projectId;

        return this.http
            .get(url, {headers: this.headers,withCredentials: true})
            .toPromise()
            .then(res => {
                return res.json().data;
            })
            .catch(err => {
                this.handleError(err);
            });
    }

    updateProject(project : any) : Promise<any> {

        let url = this.serviceUrl + "/updateProject";

        return this.http
            .post(url, JSON.stringify(project), {headers: this.headers,withCredentials: true})
            .toPromise()
            .then(res => {
                return res.json().data;
            })
            .catch(err => {
                this.handleError(err);
            });
    }

    applyProjectIdFilter(filterValue : string, filterType : string) : Promise<any> {
        let url = this.serviceUrl + "/projectFilter";

        let data = {'filterType' : filterType, 'filterValue' : filterValue}

        return this.http
            .post(url,JSON.stringify(data), {headers: this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {
                return res.json().data;
            })
            .catch((err) => {
                this.handleError(err);
            });
    }

}
