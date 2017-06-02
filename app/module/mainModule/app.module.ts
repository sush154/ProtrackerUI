// Angular dependencies
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

// Application Components Dependencies
import {AppComponent} from './app.component';


// Application Module Dependencies
import {LoginModule} from '../login/login.module';
import {AppRoutingModule} from '../router/app.router-module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {RegistrationModule} from '../registration/registration.module';
import {TasksModule} from '../tasks/tasks.module';
import {ProjectsModule} from '../projects/projects.module';
import {NotesModule} from '../notes/notes.module';
import {ManagePasswordModule} from '../managePassword/app.manage-password.module';
import {ServerErrorModule} from '../error/server-error.module';


// Application Service Dependencies
import {CommonAppService} from '../../sharedService/app.common-service';


@NgModule({
    imports: [BrowserModule,LoginModule,AppRoutingModule,
                DashboardModule,RegistrationModule,
                TasksModule,ProjectsModule,NotesModule,
                ManagePasswordModule,HttpModule,ServerErrorModule],
    declarations: [AppComponent],
    providers: [CommonAppService],
    bootstrap: [AppComponent]
})

export class AppModule {}