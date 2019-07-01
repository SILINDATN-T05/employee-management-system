import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../modules/material-module';
import { TranslateModule, TranslateService, TranslateStore, TranslatePipe } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationModule } from '../modules/language-translation/language-translation.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from '..';
import { HttpHelperService, ConfirmationDialogService } from '.';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IEmployee } from '../interfaces/employee.interface';
import { HttpClientModule } from '@angular/common/http';

describe('ApiService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            providers: [HttpHelperService]
        })
    );

    it('should be created', () => {
        const service = TestBed.get(ApiService);
        expect(service).toBeTruthy();
    });
});
