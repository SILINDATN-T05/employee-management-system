import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'hammerjs';
import { EditEmploymentDetailsComponent } from './edit-employment-details.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/shared/modules/material-module';
import { TranslateModule, TranslateService, TranslateStore, TranslatePipe } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationModule } from 'src/app/shared/modules/language-translation/language-translation.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from 'src/app/shared';
import { ApiService, HttpHelperService, ConfirmationDialogService } from 'src/app/shared/services';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEmployee } from 'src/app/shared/interfaces/employee.interface';

describe('EditEmploymentDetailsComponent', () => {
    let component: EditEmploymentDetailsComponent;
    let fixture: ComponentFixture<EditEmploymentDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditEmploymentDetailsComponent],
            imports: [
                CommonModule,
                BrowserModule,
                MaterialModule,
                MatDialogModule,
                TranslateModule,
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
                NgbActiveModal,
                { provide: MatDialogRef, useValue: {} },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {}
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditEmploymentDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Empty form Validations should fail', () => {
        component.ngOnInit();
        // fixture.detectChanges();
        const form = component.detailsForm;

        // employedDate is required
        expect(form.get('employeeNumber').invalid).toEqual(true);

        // // employedDate Text is required
        expect(form.get('employedDate').invalid).toEqual(false);

        // // terminatedDate Text is required
        expect(form.get('terminatedDate').invalid).toEqual(false);
        expect(form.valid).toEqual(false);
    });

    it('Form Validations with data should pass', () => {
        const data: IEmployee = {
            employeeId: 0,
            personId: 0,
            employeeNumber: '1234567',
            employedDate: '2019-05-27T00:00:00',
            terminatedDate: '2019-05-27T00:00:00',
            person: {
                personId: 0,
                lastName: 'Makwakwa TTTT',
                firstName: 'Peter MO',
                birthDate: '2018-12-17T00:00:00'
            }
        };
        component.data = data;
        component.ngOnInit();
        const form = component.detailsForm;

        // employedDate is required
        expect(form.get('employeeNumber').valid).toEqual(true);

        // employedDate Text is required
        expect(form.get('employedDate').valid).toEqual(false, 'Because its disabled');

        // terminatedDate Text is required
        expect(form.get('terminatedDate').valid).toEqual(false, 'Because its disabled');
        expect(form.valid).toEqual(true);


        spyOn(component, 'updateDetails').and.callThrough();

        const button = fixture.debugElement.nativeElement.querySelector('button');

        // expect(button);
        button.click();
        // fixture.detectChanges();

        // fixture.whenStable().then(() => {
          // expect(component.updateDetails).toHaveBeenCalled();
        // });
    });
});
