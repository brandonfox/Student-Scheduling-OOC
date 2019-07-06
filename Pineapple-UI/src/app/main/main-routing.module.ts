import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { AddeventComponent } from './addevent/addevent.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    { path: 'main',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '',
                canActivateChild: [AuthGuard],
                children: [
                    {path: 'home', component: HomeComponent},
                    {path: 'add', component: AddeventComponent}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
