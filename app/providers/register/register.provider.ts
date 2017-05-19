import {Injectable} from '@angular/core';
import {URL} from '../../sharedService/service.url';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisterProvider {

    constructor(private http : Http){}

    private headers = new Headers({'Content-Type': 'application/json'});
    private registrationUrl = URL + "/user/register";

     private handleError(error: any): Promise<any> {
         console.error('An error occurred', error); // for demo purposes only
         return Promise.reject(error.message || error);
     }

    register(registerData: any) : Promise<any> {
        return this.http
        .post(this.registrationUrl, JSON.stringify(registerData), {headers: this.headers})
        .toPromise()
        .then((res) => {
            return res.json().data;
        })
        .catch(this.handleError);
    }
}