/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DraftsComponent } from './drafts.component';

describe('DraftsComponent', () => {
  let component: DraftsComponent;
  let fixture: ComponentFixture<DraftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});