import { TestBed } from '@angular/core/testing';

import { MergePdfService } from './merge-pdf.service';

describe('MergePdfService', () => {
  let service: MergePdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MergePdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
