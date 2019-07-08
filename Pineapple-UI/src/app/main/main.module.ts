import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AddEventComponent } from './add-event/add-event.component';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DemoMaterialModule } from '../core/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskComponent } from '../task/task.component';

@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        DemoMaterialModule,
        ReactiveFormsModule
    ],
    declarations: [
        AddEventComponent,
        HomeComponent,
        MainLayoutComponent,
        NavigationComponent,
        TaskComponent,
        AddTaskComponent,
    ]
})
export class MainModule { }
