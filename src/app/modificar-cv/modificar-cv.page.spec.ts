import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCvPage } from './modificar-cv.page';

describe('ModificarCvPage', () => {
  let component: ModificarCvPage;
  let fixture: ComponentFixture<ModificarCvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarCvPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarCvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
