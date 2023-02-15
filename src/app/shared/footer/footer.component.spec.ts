import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo text', () => {
    const logo = fixture.nativeElement.querySelector('.logo');
    expect(logo.textContent).toContain('DOGMKT');
  });

  it('should render the created by text', () => {
    const createdBy = fixture.nativeElement.querySelector('.created-by');
    expect(createdBy.textContent).toContain('Created by Fabio Yamashita');
  });
});
