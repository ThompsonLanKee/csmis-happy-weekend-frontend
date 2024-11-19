import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorMainComponent } from './operator-main.component';

describe('OperatorMainComponent', () => {
  let component: OperatorMainComponent;
  let fixture: ComponentFixture<OperatorMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperatorMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
