import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsmisDoorlogImportComponent } from './csmis-doorlog-import.component';

describe('CsmisDoorlogImportComponent', () => {
  let component: CsmisDoorlogImportComponent;
  let fixture: ComponentFixture<CsmisDoorlogImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CsmisDoorlogImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsmisDoorlogImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
