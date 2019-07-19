import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AuthGuard } from '../guards/auth.guard';
import {FriendListComponent} from './friend-list/friend-list.component';
import {EditEventComponent} from './edit-event/edit-event.component';
import {CalendarComponent} from './calendar/calendar.component';
import {UserGroupComponent} from './user-group/user-group.component';

const routes: Routes = [
    { path: 'main',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent},
            { path: 'add', component: AddEventComponent},
            { path: 'friends', component: FriendListComponent },
            { path: 'edit', component: EditEventComponent},
            { path: 'calendar', component: CalendarComponent},
            { path: 'user-groups', component: UserGroupComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
