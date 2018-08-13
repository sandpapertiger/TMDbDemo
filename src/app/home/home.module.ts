import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';


@NgModule({
    imports: [
        CommonModule,
        NgbCollapseModule,
        RouterModule.forChild(HomeRoutes),
    ],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule {
}
