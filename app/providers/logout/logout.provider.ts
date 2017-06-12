import {Injectable} from '@angular/core';
import {URL} from '../../sharedService/service.url';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()


export class LogoutProvider {

    private headers = new Headers({'Content-Type': 'application/json'});

    private logoutUrl = URL + "/user/logout";

    constructor(private http : Http){}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    logout() : Promise<any> {
        return this.http
            .post(this.logoutUrl, {}, {headers: this.headers,withCredentials: true})
            .toPromise()
            .then(res => {
                return res.json().data;
            })
            .catch(err => {
                this.handleError(err);
            });
    }

}