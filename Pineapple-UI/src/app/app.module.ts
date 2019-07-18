import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// used to create fake backend

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { DemoMaterialModule } from './core/material-module';
import { MainLayoutComponent } from './main/main-layout/main-layout.component';
import { UserService } from './service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MainModule } from './main/main.module';
import { FriendListComponent } from './main/friend-list/friend-list.component';
import { ButtonModule} from 'primeng/button';
import { GroupComponent } from './group/group.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { Globals} from './model/globals';

const appRoutes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full'},
    { path: 'main', component: MainLayoutComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { useHash: false } ),
        LayoutModule,
        FormsModule,
        DemoMaterialModule,
        MainModule,
        ButtonModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        FriendListComponent,
        GroupComponent,
        AddMemberComponent,
    ],
    providers: [UserService, CookieService, Globals],
    bootstrap: [AppComponent]
})

export class AppModule {}
