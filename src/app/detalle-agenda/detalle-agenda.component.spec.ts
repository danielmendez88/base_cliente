import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAgendaComponent } from './detalle-agenda.component';

describe('DetalleAgendaComponent', () => {
  let component: DetalleAgendaComponent;
  let fixture: ComponentFixture<DetalleAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
