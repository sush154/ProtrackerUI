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

    // This method will get the user id from cookies and will navigate to the page accordingly.
    // If user id found - navigate to Dashboard, otherwise navigate to Login Page
    getUserCookie() : void {
            var userCookie = this.commonService.getCookies("userId");
            if(userCookie !== ''){
                this.router.navigate(['/dashboard']);
            }else {
                this.router.navigate(['/login']);
            }

    }

    setCookies() : void {
        this.commonService.setCookies("userId","sushant",1);
    }

    ngOnInit() : void {
        this.getUserCookie();
        //this.commonService.deleteCookie("userId");
        //this.setCookies();
    }

}