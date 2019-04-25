import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionesListaComponent } from './comisiones-lista.component';

describe('ComisionesListaComponent', () => {
  let component: ComisionesListaComponent;
  let fixture: ComponentFixture<ComisionesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
