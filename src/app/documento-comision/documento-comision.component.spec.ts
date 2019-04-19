import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoComisionComponent } from './documento-comision.component';

describe('DocumentoComisionComponent', () => {
  let component: DocumentoComisionComponent;
  let fixture: ComponentFixture<DocumentoComisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoComisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
