import { TestBed } from '@angular/core/testing';

import { ComisionApiService } from './comision-api.service';

describe('ComisionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComisionApiService = TestBed.get(ComisionApiService);
    expect(service).toBeTruthy();
  });
});
