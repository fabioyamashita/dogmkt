import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CollectionService } from 'src/app/services/collection.service';
import { RoutesService } from 'src/app/services/routes.service';
import { LocalStorageUtils } from 'src/app/utils/localStorage';
import { Store } from 'src/app/app.store';

import { DogDetailsComponent } from './dog-details.component';
import { FooterComponent } from '../../footer/footer.component';
import { QuantityBoxComponent } from '../quantity-box/quantity-box.component';
import Cart from 'src/app/models/cart';
import DogCart from 'src/app/models/dogCart';
import Dog from 'src/app/models/dog';

describe('DogDetailsComponent', () => {
  let component: DogDetailsComponent;
  let fixture: ComponentFixture<DogDetailsComponent>;

  const checkoutService = jasmine.createSpyObj<CheckoutService>('CheckoutService', ['getCart', 'updateCart']);
  const collectionService = jasmine.createSpyObj<CollectionService>('CollectionService', ['getById', 'updateDog']);
  const routesService = jasmine.createSpyObj<RoutesService>('RoutesService', ['navigateToCart']);
  const localStorageUtils = jasmine.createSpyObj<LocalStorageUtils>('LocalStorageUtils', ['getUserId']);
  const store = jasmine.createSpyObj<Store>('Store', ['getCart$', 'getUser$']);
  
  const cart: Cart = {
    id: 1,
    userId: 1,
    summary: 240.5,
    discount: 0,
    total: 240.5,
    dogs: [{ dogId: 7, quantity: 1 }],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DogDetailsComponent,
        FooterComponent,
        QuantityBoxComponent,
      ],
      imports: [RouterTestingModule, HttpClientTestingModule, MatIconModule],
      providers: [
        { provide: CheckoutService, useValue: checkoutService },
        { provide: CollectionService, useValue: collectionService },
        { provide: RoutesService, useValue: routesService },
        { provide: LocalStorageUtils, useValue: localStorageUtils },
        { provide: Store, useValue: store },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogDetailsComponent);
    component = fixture.componentInstance;

    component.dog = {
      id: 7,
      availableQuantity: 10,
      name: "The Akita",
      breed: "Japanese Akita",
      genre: "Female",
      price: 240.5,
      description: "The Akita.",
      dateOfBirth: "2023-01-02",
      weight: 14,
      height: 25,
      width: 25,
      pictureUrl: "https://images.unsplash.com/photo-1613410180211-106788bd2d94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      sellerId: 3
    };

    component.updatedDog = component.dog;

    component.sellerName = "Seller Name";

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dog description by default', () => {
    fixture.detectChanges();

    const dogDescriptionDiv = fixture.debugElement.query(By.css('.dog-info-text'));
    const dogDetailsDiv = fixture.debugElement.query(By.css('.details-table'));

    expect(dogDescriptionDiv).not.toBeNull();
    expect(dogDetailsDiv).toBeNull();
  });

  it('should render dog details when option is clicked', () => {
    const event = { target: { value: 'dog-details' } };
    component.onMoreInfoChange(event);

    fixture.detectChanges();

    const dogDescriptionDiv = fixture.debugElement.query(By.css('.dog-info-text'));
    const dogDetailsDiv = fixture.debugElement.query(By.css('.details-table'));

    expect(dogDescriptionDiv).toBeNull();
    expect(dogDetailsDiv).not.toBeNull();
  });
});
