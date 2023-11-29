import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRecordatorioPage } from './form-recordatorio.page';

describe('FormRecordatorioPage', () => {
  let component: FormRecordatorioPage;
  let fixture: ComponentFixture<FormRecordatorioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormRecordatorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
