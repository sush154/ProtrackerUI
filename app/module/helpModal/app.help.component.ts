import {Component, Input} from '@angular/core';


@Component({
    selector : 'help-modal',
    templateUrl : './app/module/helpModal/app.help.component.html',
    styleUrls: ['./app/module/helpModal/app.help.component.css']
})

export class HelpModalComponent{

    @Input('pageName') pageName : String;

}