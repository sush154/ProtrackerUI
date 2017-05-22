import {Component, OnInit} from '@angular/core';
import {CommonAppService} from '../../sharedService/app.common-service';
import {Router} from '@angular/router';

import {LoginComponent} from '../login/login.component';


@Component({
    selector: 'protracker',
    template: '<router-outlet></router-outlet>',
    providers: [CommonAppService]
})

export class AppComponent implements OnInit{

    constructor(private commonService : CommonAppService, private router : Router){}


    ngOnInit() : void {
        this.router.navigate(['/dashboard']);
    }

}