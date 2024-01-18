import { TestBed } from '@angular/core/testing';

import { ChatTutorProfileService } from './chat-tutor-profile.service';

describe('ChatTutorProfileService', () => {
  let service: ChatTutorProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatTutorProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
