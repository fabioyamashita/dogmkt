import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBoxComponent } from './purchase-box.component';

describe('PurchaseBoxComponent', () => {
  let component: PurchaseBoxComponent;
  let fixture: ComponentFixture<PurchaseBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
