import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './module/mainModule/app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);