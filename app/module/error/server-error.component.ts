import {Component} from '@angular/core';

@Component({
    selector:   'server-error',
    template:   `
                    <div class="col-lg-4"></div>
                    <div class="col-lg-4">
                        <div>
                            <h1 class="alignment">Server Error</h1>
                        </div>
                    </div>
                    <div class="col-lg-4"></div>
                `,
    styles:     [`
                    .alignment {
                        text-align: center;
                        margin-top: 100px;
                    }

                `]
})

export class ServerErrorComponent {

}