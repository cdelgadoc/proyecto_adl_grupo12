import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTableComponent } from './file-table.component';

describe('FileTableComponent', () => {
  let component: FileTableComponent;
  let fixture: ComponentFixture<FileTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileTableComponent]
    });
    fixture = TestBed.createComponent(FileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
