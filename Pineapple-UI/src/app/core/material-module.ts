import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatSidenavModule,
    MatNativeDateModule
} from '@angular/material';

import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatIconModule,
        MatTabsModule,
        MatListModule,
        ButtonModule,
        MatSidenavModule,
        MatNativeDateModule
    ],
    exports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatIconModule,
        MatTabsModule,
        MatListModule,
        ButtonModule,
        MatSidenavModule,
        MatNativeDateModule
    ],
    providers: [
        MatDatepickerModule
    ]
})
export class MaterialModule {}
