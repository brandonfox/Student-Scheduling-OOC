import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../core/material-module';
import { CalendarModule } from 'angular-calendar';

import { AddEventComponent } from './add-event/add-event.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LayoutModule,
        MainRoutingModule,
        MaterialModule,
        CalendarModule
    ],
    declarations: [
        AddEventComponent,
        CalendarComponent,
        EditEventComponent,
        FriendListComponent,
        HomeComponent,
        MainLayoutComponent,
        NavigationComponent,
        UserGroupComponent,
        UserProfileComponent
    ],
    exports: [CalendarComponent]
})
export class MainModule { }
