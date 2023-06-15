import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunteriaComponent } from './punteria.component';

describe('PunteriaComponent', () => {
  let component: PunteriaComponent;
  let fixture: ComponentFixture<PunteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
