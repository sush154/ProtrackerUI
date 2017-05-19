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

    getAllProjects() : Promise<Project[]> {
        let url = this.serviceUrl + "/getAllProjects";
        return this.http
            .get(url)
            .toPromise()
            .then((res) => {
                return res.json().data.projects as Project[];
            })
            .catch((err) => {
                this.handleError(err);
            });
    }

}
