import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { EmployeesManagementComponent } from './employees-management/employees-management.component';
import { MaterialModule } from '../shared/modules/material-module';
import { CreateEmployeesComponent } from './components/dialogs/create-employees/create-employees.component';
import { EditEmploymentDetailsComponent } from './components/dialogs/edit-employment-details/edit-employment-details.component';
import { EditPersonalDetailsComponent } from './components/dialogs/edit-personal-details/edit-personal-details.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        CommonModule,
        NgxLoadingModule.forRoot({}),
        NgbModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,
        MaterialModule,
        NgbDropdownModule
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        EmployeesManagementComponent,
        CreateEmployeesComponent,
        EditEmploymentDetailsComponent,
        EditPersonalDetailsComponent
    ],
    entryComponents: [CreateEmployeesComponent, EditEmploymentDetailsComponent, EditPersonalDetailsComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {}
