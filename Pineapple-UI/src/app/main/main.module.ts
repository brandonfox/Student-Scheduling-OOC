import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AddeventComponent } from './addevent/addevent.component';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import {DemoMaterialModule} from '../core/material-module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AddeventComponent,
        HomeComponent,
        MainLayoutComponent,
        NavigationComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        DemoMaterialModule,
        ReactiveFormsModule
    ]
})
export class MainModule { }
