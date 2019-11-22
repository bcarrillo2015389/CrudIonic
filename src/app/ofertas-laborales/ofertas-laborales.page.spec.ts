import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasLaboralesPage } from './ofertas-laborales.page';

describe('OfertasLaboralesPage', () => {
  let component: OfertasLaboralesPage;
  let fixture: ComponentFixture<OfertasLaboralesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertasLaboralesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasLaboralesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
