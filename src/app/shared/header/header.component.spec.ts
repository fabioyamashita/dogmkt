import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { RoutesService } from 'src/app/services/routes.service';
import { LocalStorageUtils } from 'src/app/utils/localStorage';
import { Store } from 'src/app/app.store';
import Cart from 'src/app/models/cart';
import User from 'src/app/models/user';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRoutesService: RoutesService;
  let mockStore: Store;
  let mockLocalStorageUtils: LocalStorageUtils;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [Store, RoutesService, LocalStorageUtils],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    mockStore = TestBed.inject(Store);
    mockRoutesService = TestBed.inject(RoutesService);
    mockLocalStorageUtils = TestBed.inject(LocalStorageUtils);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart and countDogsInCart', () => {
    const mockCart: Cart = {
      id: 1,
      userId: 1,
      summary: 100,
      discount: 0,
      total: 100,
      dogs: [{ dogId: 1, quantity: 2 }],
    };
    spyOn(mockStore, 'getCart$').and.returnValue(of(mockCart));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.cart).toEqual(mockCart);
    expect(component.countDogsInCart).toBe(2);
  });

  it('should initialize user', () => {
    const mockUser: User = { id: 1, name: 'John' };
    spyOn(mockStore, 'getUser$').and.returnValue(of([mockUser]));
    spyOn(mockLocalStorageUtils, 'getUserId').and.returnValue('1');

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.user).toEqual(mockUser);
  });

  it('should call removeCredentials and navigateToLogin on logout', () => {
    spyOn(mockLocalStorageUtils, 'removeCredentials');
    spyOn(mockRoutesService, 'navigateToLogin');

    component.logout();

    expect(mockLocalStorageUtils.removeCredentials).toHaveBeenCalled();
    expect(mockRoutesService.navigateToLogin).toHaveBeenCalled();
  });
});
