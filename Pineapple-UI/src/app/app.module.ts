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
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DemoMaterialModule } from './core/material-module';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { UserService } from './service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { AddeventComponent } from './addevent/addevent.component';
import {EventListTestComponent} from './event-list-test/event-list-test.component';
import {EventAddTestComponent} from './event-add-test/event-add-test.component';
import { TaskComponent } from './task/task.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', data: { title: 'First Component' }, pathMatch: 'full' },
  {path: 'events', component: EventListTestComponent},
  {path: 'events/add', component: EventAddTestComponent},
  { path: 'login', component: LoginComponent, data: {title: 'First Component'}},
  { path: 'register', component: RegisterComponent, data: {title: 'First Component'}},
  { path: 'main', component: HomeLayoutComponent,
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
    HomeLayoutComponent,
    AddeventComponent,
    EventAddTestComponent,
    EventListTestComponent,
    TaskComponent,
  ],
  providers: [UserService, CookieService],
  bootstrap: [AppComponent]
})

export class AppModule {}
