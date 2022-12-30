import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsCollectionComponent } from './dogs-collection.component';

describe('DogsCollectionComponent', () => {
  let component: DogsCollectionComponent;
  let fixture: ComponentFixture<DogsCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogsCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
