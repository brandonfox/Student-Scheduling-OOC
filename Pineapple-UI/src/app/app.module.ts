import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// used to create fake backend

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { DemoMaterialModule } from './core/material-module';
import { UserService } from './service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { EventListTestComponent } from './main/event-list-test/event-list-test.component';
import { EventAddTestComponent } from './main/event-add-test/event-add-test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainModule } from './main/main.module';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', data: { title: 'First Component' }, pathMatch: 'full' },
    {path: 'events', component: EventListTestComponent},
    {path: 'events/add', component: EventAddTestComponent},
    { path: 'login', component: LoginComponent, data: {title: 'First Component'}},
    { path: 'register', component: RegisterComponent, data: {title: 'First Component'}}
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes,
            { useHash: false } // <-- debugging purposes only
        ),
        LayoutModule,
        FormsModule,
        DemoMaterialModule,
        MainModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        EventAddTestComponent,
        EventListTestComponent,
        PageNotFoundComponent,
    ],
    providers: [UserService, CookieService],
    bootstrap: [AppComponent]
})

export class AppModule {}
