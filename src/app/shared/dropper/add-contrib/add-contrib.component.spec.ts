import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContribComponent } from './add-contrib.component';

describe('AddContribComponent', () => {
  let component: AddContribComponent;
  let fixture: ComponentFixture<AddContribComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContribComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContribComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
