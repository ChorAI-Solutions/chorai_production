import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Legalprivacy } from './legalprivacy';

describe('Legalprivacy', () => {
  let component: Legalprivacy;
  let fixture: ComponentFixture<Legalprivacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Legalprivacy],
    }).compileComponents();

    fixture = TestBed.createComponent(Legalprivacy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
