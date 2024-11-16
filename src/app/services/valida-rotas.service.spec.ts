import { TestBed } from '@angular/core/testing';

import { ValidaRotasService } from './valida-rotas.service';

describe('ValidaRotasService', () => {
  let service: ValidaRotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidaRotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
