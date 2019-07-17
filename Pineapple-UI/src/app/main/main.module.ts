import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AddEventComponent } from './add-event/add-event.component';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DemoMaterialModule } from '../core/material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditEventComponent } from './edit-event/edit-event.component';
import { GroupComponent } from './group/group.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        BrowserModule,
        FormsModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        NgbModalModule,
        BrowserModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        })
    ],
    declarations: [
        AddEventComponent,
        HomeComponent,
        MainLayoutComponent,
        NavigationComponent,
        EditEventComponent,
        GroupComponent,
        CalendarComponent,
        UserProfileComponent,
    ]
})
export class MainModule { }
