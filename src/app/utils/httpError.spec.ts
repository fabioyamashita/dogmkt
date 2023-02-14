import { TestBed } from '@angular/core/testing';
import { HttpError } from './httpError';
import { RoutesService } from '../services/routes.service';

describe('HttpError', () => {
  let httpError: HttpError;
  let routesService: RoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpError, RoutesService],
    });

    httpError = TestBed.inject(HttpError);
    routesService = TestBed.inject(RoutesService);
  });

  it('should navigate to login when error status is 401', () => {
    spyOn(routesService, 'navigateToLogin');
    httpError.process('401');
    expect(routesService.navigateToLogin).toHaveBeenCalled();
  });

  it('should not navigate to login when error status is not 401', () => {
    spyOn(routesService, 'navigateToLogin');
    httpError.process('200');
    expect(routesService.navigateToLogin).not.toHaveBeenCalled();
  });
});
