import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RegisterProvider} from '../../providers/register/register.provider';
import { NG_VALIDATORS,Validator,
           Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import {ToasterService} from 'angular2-toaster';


@Component({
    selector: 'app-registration',
    templateUrl: './app/module/registration/registration.component.html',
    styleUrls: ['./app/module/registration/registration.component.css'],
    providers: [RegisterProvider]
})

export class RegistrationComponent{
    private registration : any = {};
    private registered : boolean = false;
    constructor(private registerProvider : RegisterProvider,
                private toastrService : ToasterService,
                private router : Router){}

    register(registerData : any) : void {
        this.registerProvider.register(registerData)
        .then((res) => {
            if(res.status === 200){
                this.registered = true;
            }else if(res.status === 101){
                // user already registered
                this.toastrService.pop('error', 'Already Registered !', 'The Email is already registered. Please register with different Email !');
            }else{
                // Server error
                // TODO: apply some theme to error page
                this.router.navigate(['/error']);
            }
        })
        .catch((err) => {
            this.router.navigate(['/error']);
        });
    }
}