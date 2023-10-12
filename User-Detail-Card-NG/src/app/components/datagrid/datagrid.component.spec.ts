import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridComponent } from './datagrid.component';

describe('DatagridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataGridComponent]
    });
    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
