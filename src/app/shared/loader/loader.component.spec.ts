import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { LoaderComponent } from './loader.component';
import { LoaderService } from 'src/app/services/loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: jasmine.SpyObj<LoaderService>;
  let isLoadingSubject: BehaviorSubject<boolean>;

  beforeEach(waitForAsync(() => {
    isLoadingSubject = new BehaviorSubject<boolean>(false);

    loaderService = jasmine.createSpyObj('LoaderService', [''], {
      isLoading$: isLoadingSubject.asObservable(),
    });

    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [{ provide: LoaderService, useValue: loaderService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the loading spinner when isLoading$ is true', () => {
    isLoadingSubject.next(true);
    fixture.detectChanges();

    const loadingSpinner =
      fixture.nativeElement.querySelector('.lds-dual-ring');
    expect(loadingSpinner).toBeTruthy();
  });

  it('should hide the loading spinner when isLoading$ is false', () => {
    isLoadingSubject.next(false);
    fixture.detectChanges();

    const loadingSpinner =
      fixture.nativeElement.querySelector('.lds-dual-ring');
    expect(loadingSpinner).toBeFalsy();
  });
});
