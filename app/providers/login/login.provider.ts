import {Injectable} from '@angular/core';
import {URL} from '../../sharedService/service.url';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class LoginProvider{

    private headers = new Headers({'Content-Type': 'application/json'});
    private loginUrl = URL + "/user/login";

    constructor(private http : Http){}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    login(loginForm : any) : Promise<any> {
        console.log("login provider", loginForm);
        return this.http
        .post(this.loginUrl, JSON.stringify(loginForm), {headers: this.headers})
        .toPromise()
        .then(
            (res) => {
                return res.json();
            }
        )
        .catch(this.handleError);
    }

}