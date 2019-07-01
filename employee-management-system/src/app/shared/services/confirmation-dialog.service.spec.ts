import { TestBed } from '@angular/core/testing';

import { ConfirmationDialogService } from './confirmation-dialog.service';
import { MaterialModule } from '../modules/material-module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ConfirmationDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    MaterialModule,
    NgbModule.forRoot(),
],
providers: [
    NgbActiveModal
], }));

  it('should be created', () => {
    const service: ConfirmationDialogService = TestBed.get(ConfirmationDialogService);
    expect(service).toBeTruthy();
  });
});
