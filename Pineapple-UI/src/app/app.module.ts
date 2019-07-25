import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes } from '@angular/router';

import { MainModule } from './main/main.module';
import { MaterialModule } from './core/material-module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainLayoutComponent } from './main/main-layout/main-layout.component';
import { UserService } from './service/user.service';
import { CookieService } from 'ngx-cookie-service';

const appRoutes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full'},
    { path: 'main', component: MainLayoutComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LayoutModule,
        RouterModule.forRoot(appRoutes, {useHash: false}),
        MainModule,
        MaterialModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        UserService,
        CookieService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
