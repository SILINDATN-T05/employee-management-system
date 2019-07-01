import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './shared/modules/material-module';
import { ApiService, HttpHelperService, ConfirmationDialogService } from './shared/services';
import { ConfirmComponent } from './layout/components/dialogs/confirm/confirm.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule, TranslateService, TranslateStore, TranslatePipe, TranslateLoader } from '@ngx-translate/core';

import 'hammerjs';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        MaterialModule,
        TranslateModule,
        BrowserAnimationsModule,
        HttpClientModule,
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
    entryComponents: [ConfirmComponent],
    declarations: [AppComponent, ConfirmComponent],
    providers: [
        TranslateService,
        TranslateStore,
        TranslatePipe,
        AuthGuard,
        ApiService,
        HttpHelperService,
        ConfirmationDialogService,
        NgbActiveModal
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
