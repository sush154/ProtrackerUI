import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {URL} from './service.url';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CommonAppService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http : Http){}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    authenticate() : Promise<any> {
        let serviceUrl = URL + "/authenticate";
        return this.http
            .get(serviceUrl, {headers: this.headers,withCredentials: true})
            .toPromise()
            .then((res) => {return res.json();})
            .catch((err) => {
                this.handleError(err);
            });
    }


}