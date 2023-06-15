import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoJuegosComponent } from './resultado-juegos.component';

describe('ResultadoJuegosComponent', () => {
  let component: ResultadoJuegosComponent;
  let fixture: ComponentFixture<ResultadoJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoJuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
