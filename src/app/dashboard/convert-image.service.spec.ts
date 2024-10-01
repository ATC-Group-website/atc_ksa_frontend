import { TestBed } from '@angular/core/testing';

import { ConvertImageService } from './convert-image.service';

describe('ConvertImageService', () => {
  let service: ConvertImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
