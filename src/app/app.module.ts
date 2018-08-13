import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import 'hammerjs';

import { TBDbAppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { DataService } from './core/data-services/data.service';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CoreModule,
        HomeModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(AppRoutes)
    ],
    declarations: [
        TBDbAppComponent
    ],
    bootstrap: [
        TBDbAppComponent
    ],
    providers: [
        DataService
    ]
})
export class TMDbAppModule {
}
