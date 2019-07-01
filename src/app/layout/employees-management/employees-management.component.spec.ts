import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'hammerjs';
import { EmployeesManagementComponent } from './employees-management.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/shared/modules/material-module';
import { TranslateModule, TranslateService, TranslateStore, TranslatePipe } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationModule } from 'src/app/shared/modules/language-translation/language-translation.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from 'src/app/shared';
import { ApiService, HttpHelperService, ConfirmationDialogService } from 'src/app/shared/services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IEmployee } from 'src/app/shared/interfaces/employee.interface';

describe('EmployeesManagementComponent', () => {
    let component: EmployeesManagementComponent;
    let fixture: ComponentFixture<EmployeesManagementComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmployeesManagementComponent],
            imports: [
                CommonModule,
                BrowserModule,
                MaterialModule,
                TranslateModule,
                MatDialogModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                NgbModule.forRoot(),
                LanguageTranslationModule,
                AppRoutingModule,
                NgxLoadingModule.forRoot({}),
                ToastrModule.forRoot({
                    timeOut: 10000,
                    positionClass: 'toast-top-right',
                    preventDuplicates: true
                })
            ],
            providers: [
                TranslateService,
                TranslateStore,
                TranslatePipe,
                AuthGuard,
                ApiService,
                HttpHelperService,
                ConfirmationDialogService,
                Ng4LoadingSpinnerService,
                NgbActiveModal
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeesManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#getEmployees should return all employees from a rest api', (done: DoneFn) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 2500000;
        component.apiServ.getEmployees().subscribe((employees: IEmployee[]) => {
            expect(employees.length > 0).toBe(true);
            done();
        });
    });
});
