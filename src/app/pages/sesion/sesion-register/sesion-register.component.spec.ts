import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionRegisterComponent } from './sesion-register.component';

describe('SesionRegisterComponent', () => {
  let component: SesionRegisterComponent;
  let fixture: ComponentFixture<SesionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
