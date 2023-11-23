import { TestBed } from '@angular/core/testing';

import { ServiceVehiculoService } from './service-vehiculo.service';

describe('ServiceVehiculoService', () => {
  let service: ServiceVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
