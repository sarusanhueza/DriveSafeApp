import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCombustiblePage } from './form-combustible.page';

describe('FormCombustiblePage', () => {
  let component: FormCombustiblePage;
  let fixture: ComponentFixture<FormCombustiblePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormCombustiblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
