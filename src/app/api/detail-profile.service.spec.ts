import { TestBed } from '@angular/core/testing';

import { DetailProfileService } from './detail-profile.service';

describe('DetailProfileService', () => {
  let service: DetailProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
