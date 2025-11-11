import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesPollutions } from './liste-des-pollutions';

describe('ListeDesPollutions', () => {
  let component: ListeDesPollutions;
  let fixture: ComponentFixture<ListeDesPollutions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDesPollutions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDesPollutions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
