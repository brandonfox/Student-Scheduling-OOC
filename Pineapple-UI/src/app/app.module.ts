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
import { HomeComponent } from './main/home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DemoMaterialModule } from './core/material-module';
import { NavigationComponent } from './main/navigation/navigation.component';
import { MainLayoutComponent } from './main/main-layout/main-layout.component';
import { UserService } from './service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { AddeventComponent } from './main/addevent/addevent.component';
import { EventListTestComponent } from './main/event-list-test/event-list-test.component';
import { EventAddTestComponent } from './main/event-add-test/event-add-test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: 'events', component: EventListTestComponent},
    { path: 'events/add', component: EventAddTestComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'add', component: AddeventComponent }
        ]
    }
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
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        NavigationComponent,
        MainLayoutComponent,
        AddeventComponent,
        EventAddTestComponent,
        EventListTestComponent,
        PageNotFoundComponent,
    ],
    providers: [UserService, CookieService],
    bootstrap: [AppComponent]
})

export class AppModule {}
