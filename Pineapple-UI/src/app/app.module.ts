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
import { SecondComponent } from './second/second.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import {UserService} from './service/user.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import {CookieService} from 'ngx-cookie-service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', data: { title: 'First Component' }, pathMatch: 'full' },
  {
    path: 'login', component: LoginLayoutComponent, data: {title: 'First Component'},
    children: [
      {path: '', component: LoginComponent}
    ]
  },
  {path: 'register', component: LoginLayoutComponent, data: {title: 'First Component'}, children: [{path: '', component: RegisterComponent}]
  },
  { path: 'main', component: HomeLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'second', component: SecondComponent }
    ]
  },
  {path: 'users',
  component: UserListComponent},
  {
    path: 'user-add',
    component: UserEditComponent
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent
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
    SecondComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    UserEditComponent,
    UserListComponent
  ],
  providers: [UserService, CookieService],
  bootstrap: [AppComponent]
})

export class AppModule {}
