import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGastosPage } from './form-gastos.page';

describe('FormGastosPage', () => {
  let component: FormGastosPage;
  let fixture: ComponentFixture<FormGastosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormGastosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
