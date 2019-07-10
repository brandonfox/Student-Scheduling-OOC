import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AddEventComponent } from './add-event/add-event.component';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DemoMaterialModule } from '../core/material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { GroupComponent } from './group/group.component';
import { CalenderComponent } from './calender/calender.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        NgbModalModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        FormsModule
    ],
    declarations: [
        AddEventComponent,
        HomeComponent,
        MainLayoutComponent,
        NavigationComponent,
        AddTaskComponent,
        EditEventComponent,
        GroupComponent,
        CalenderComponent,
    ]
})
export class MainModule { }
