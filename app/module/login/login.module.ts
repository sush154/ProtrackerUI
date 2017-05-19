import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {LoginComponent} from '../login/login.component'
import {LoginProvider} from '../../providers/login/login.provider';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [RouterModule, ToasterModule, FormsModule, CommonModule],
    declarations: [LoginComponent],
    providers: [LoginProvider],
    bootstrap: [LoginComponent]
})

export class LoginModule{}