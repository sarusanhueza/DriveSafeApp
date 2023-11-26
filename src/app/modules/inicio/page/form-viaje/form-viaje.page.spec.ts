import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormViajePage } from './form-viaje.page';

describe('FormViajePage', () => {
  let component: FormViajePage;
  let fixture: ComponentFixture<FormViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
