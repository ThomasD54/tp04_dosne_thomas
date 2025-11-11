import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePollution } from './formulaire-pollution';

describe('FormulairePollution', () => {
  let component: FormulairePollution;
  let fixture: ComponentFixture<FormulairePollution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulairePollution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulairePollution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
