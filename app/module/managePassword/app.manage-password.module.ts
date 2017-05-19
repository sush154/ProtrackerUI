///2 component forgot password and change password


import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ForgotPasswordComponent} from './forgot-password.component';

@NgModule({
    imports:        [RouterModule],
    declarations:   [ForgotPasswordComponent],
    providers:      [],
    bootstrap:      [],
    exports:        []
})

export class ManagePasswordModule{}