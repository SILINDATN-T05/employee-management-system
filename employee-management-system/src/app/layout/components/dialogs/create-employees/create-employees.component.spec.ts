import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'hammerjs';
import { CreateEmployeesComponent } from './create-employees.component';
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
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateEmployeesComponent', () => {
  let component: CreateEmployeesComponent;
  let fixture: ComponentFixture<CreateEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmployeesComponent ],
      imports: [
        CommonModule,
        BrowserModule,
        MatDialogModule,
        MaterialModule,
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
        {provide: MatDialogRef, useValue: {}},
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
