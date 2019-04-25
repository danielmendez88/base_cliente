import { TestBed } from '@angular/core/testing';

import { ListaComisionService } from './lista-comision.service';

describe('ListaComisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaComisionService = TestBed.get(ListaComisionService);
    expect(service).toBeTruthy();
  });
});
