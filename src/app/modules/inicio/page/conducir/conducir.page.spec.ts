import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConducirPage } from './conducir.page';

describe('ConducirPage', () => {
  let component: ConducirPage;
  let fixture: ComponentFixture<ConducirPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConducirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
