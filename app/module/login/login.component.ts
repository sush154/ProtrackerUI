import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import { NG_VALIDATORS,Validator,
           Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import {LoginProvider} from '../../providers/login/login.provider';
import {CommonAppService} from '../../sharedService/app.common-service';


@Component({
    selector : 'login',
    templateUrl: './app/module/login/login.component.html',
    styleUrls: ['./app/module/login/login.component.css'],
    providers: [LoginProvider, CommonAppService]
})

export class LoginComponent{

    private loginFrm : any = {};

    constructor(private loginProvider : LoginProvider,
                private router : Router,
                private toastrProvider : ToasterService,
                private commonService: CommonAppService){}


    login(login : any) : void {

        this.loginProvider.login(login)
        .then((res) => {
            if(res.status === 200){
                this.router.navigate(['/dashboard']);
            }else if(res.status === 401){
                //TODO: toastr for unauthorised
                this.toastrProvider.pop('error',)
            }else {
                this.router.navigate(['/error']);
            }
        })
        .catch((err) => {
            this.router.navigate(['/error']);
        });
    }
}