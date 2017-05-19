import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {CommonAppService} from '../../sharedService/app.common-service';

@Component({
    selector: 'app-header',
    templateUrl: './app/module/appHeader/header.component.html',
    styleUrls:  ['./app/module/appHeader/app.header.style.css']
})

export class AppHeaderComponent implements OnInit{

    selectedPage : string;
    private menuDisplay : boolean = false;

    constructor(private router : Router,
                private location : Location,
                private commonService : CommonAppService){}

    navigate(pageName: string) : void {
        let navigationPage = "/"+pageName;
        this.router.navigate([navigationPage]);
    }

    ngOnInit() : void {
        this.selectedPage = this.location.path().split("/")[1];

    }

    toggleMenu() : void {
        if(!this.menuDisplay) this.menuDisplay = true;
        else this.menuDisplay = false;
    }
}