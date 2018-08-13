import { NgModule } from '@angular/core';
import { DataService } from './data-services/data.service';

@NgModule({
    providers: [
        DataService
    ]
})
export class CoreModule {
}
