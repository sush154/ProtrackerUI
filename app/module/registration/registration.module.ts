import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {ServerErrorModule} from '../error/server-error.module';
import {CommonModule} from '@angular/common';

import {RegistrationComponent} from './registration.component';

import {RegisterProvider} from '../../providers/register/register.provider';
import {EqualValidator} from '../../common/validation/password.match.directive';

@NgModule({
    imports:        [RouterModule, FormsModule, ToasterModule, CommonModule],
    declarations:   [RegistrationComponent, EqualValidator],
    providers:      [RegisterProvider],
    bootstrap:      [RegistrationComponent],
    exports:        [RegistrationComponent]
})

export class RegistrationModule{}