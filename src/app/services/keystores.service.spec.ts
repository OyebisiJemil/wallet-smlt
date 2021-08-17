import { TestBed } from '@angular/core/testing';

import { KeystoresService } from './keystores.service';

describe('KeystoresService', () => {
  let service: KeystoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeystoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
