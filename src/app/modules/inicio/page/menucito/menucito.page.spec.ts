import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenucitoPage } from './menucito.page';

describe('MenucitoPage', () => {
  let component: MenucitoPage;
  let fixture: ComponentFixture<MenucitoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenucitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
