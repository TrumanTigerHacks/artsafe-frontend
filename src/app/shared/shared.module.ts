import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ShellComponent } from './shell/shell.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { AddContribComponent } from './dropper/add-contrib/add-contrib.component';
import { AddContribComponentDialog } from './dropper/add-contrib/add-contrib.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { DropperModule } from './dropper/dropper.module';

const components = [
  ShellComponent, DeleteButtonComponent
];

const modules = [
  CommonModule,
  RouterModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  ReactiveFormsModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules,
    DropperModule,
  ],
  exports: [
    ...components,
    ...modules
  ],
})
export class SharedModule {}
