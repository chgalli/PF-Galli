import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';

import { FullNamePipe } from './pipes/fullname.pipe';
import { TitleSizeDirective } from './directives/TitleSize.directive';


@NgModule({
  declarations: [
    FullNamePipe,
    TitleSizeDirective
  ],
  imports: [
    ],
  exports: [
    CommonModule,

    BrowserModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTabsModule,
    MatGridListModule,

    FormsModule,
    ReactiveFormsModule,

    FullNamePipe,
    TitleSizeDirective,
    ]
})
export class SharedModule { }
