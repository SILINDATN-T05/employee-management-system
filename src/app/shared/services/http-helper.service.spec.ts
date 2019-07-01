import { TestBed } from '@angular/core/testing';

import { HttpHelperService } from './http-helper.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HttpHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
  ]
  }));

  it('should be created', () => {
    const service: HttpHelperService = TestBed.get(HttpHelperService);
    expect(service).toBeTruthy();
  });
});
