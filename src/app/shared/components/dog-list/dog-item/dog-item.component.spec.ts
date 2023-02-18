import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import Dog from 'src/app/models/dog';

import { DogItemComponent } from './dog-item.component';

describe('DogItemComponent', () => {
  let component: DogItemComponent;
  let fixture: ComponentFixture<DogItemComponent>;

  const dog: Dog = {
    id: 7,
    availableQuantity: 10,
    name: 'The Akita',
    breed: 'Japanese Akita',
    genre: 'Female',
    price: 240.5,
    description: 'The Akita.',
    dateOfBirth: '2023-01-02',
    weight: 14,
    height: 25,
    width: 25,
    pictureUrl:
      'https://images.unsplash.com/photo-1613410180211-106788bd2d94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    sellerId: 3,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogItemComponent],
      imports: [MatIconModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DogItemComponent);
    component = fixture.componentInstance;

    component.dog = dog;
  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
