import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
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

  const mockCart: Cart = {
    id: 1,
    userId: 1,
    summary: 100,
    discount: 0,
    total: 100,
    dogs: [{ dogId: 1, quantity: 2 }],
  };

  const mockUser: User = {
    id: 1,
    name: 'John',
    email: 'john@gmail.com',
    isSeller: true,
  };

  const store = jasmine.createSpyObj<Store>('Store', ['getCart$', 'getUser$']);
  const localStorageUtils = jasmine.createSpyObj<LocalStorageUtils>(
    'LocalStorageUtils',
    ['getUserId', 'removeCredentials']
  );
  const routesService = jasmine.createSpyObj<RoutesService>('RoutesService', [
    'navigateToLogin',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: Store, useValue: store },
        { provide: LocalStorageUtils, useValue: localStorageUtils },
        { provide: RoutesService, useValue: routesService },
      ],
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

    localStorageUtils.getUserId.and.returnValue('1');
    store.getCart$.and.returnValue(of(mockCart));
    store.getUser$.and.returnValue(of([mockUser]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart and countDogsInCart', () => {
    fixture.detectChanges();

    expect(component.cart).toEqual(mockCart);
    expect(component.countDogsInCart).toBe(2);
  });

  it('should initialize user', () => {
    fixture.detectChanges();

    expect(component.user).toEqual(mockUser);
  });

  it('should call removeCredentials and navigateToLogin on logout', () => {
    component.logout();

    expect(localStorageUtils.removeCredentials).toHaveBeenCalled();
    expect(routesService.navigateToLogin).toHaveBeenCalled();
  });

  it('should render the updated number of dogs in cart (located at header as CART(5))', () => {
    const mockCartUpdated: Cart = {
      id: 1,
      userId: 1,
      summary: 100,
      discount: 0,
      total: 100,
      dogs: [{ dogId: 1, quantity: 5 }],
    };

    store.getCart$.and.returnValue(of(mockCartUpdated));

    fixture.detectChanges();

    const cartCounter =
      fixture.debugElement.nativeElement.querySelector('.cart-counter');
    expect(cartCounter.textContent.trim()).toBe('CART(5)');
  });
});
