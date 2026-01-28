import { TestBed } from '@angular/core/testing';

import { Apiservices } from './apiservices';

describe('Apiservices', () => {
  let service: Apiservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apiservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
