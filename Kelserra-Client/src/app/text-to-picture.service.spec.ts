import { TestBed } from '@angular/core/testing';

import { TextToPictureService } from './text-to-picture.service';

describe('TextToPictureService', () => {
  let service: TextToPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextToPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
