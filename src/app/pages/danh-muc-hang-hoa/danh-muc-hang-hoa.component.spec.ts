import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucHangHoaComponent } from './danh-muc-hang-hoa.component';

describe('DanhMucHangHoaComponent', () => {
  let component: DanhMucHangHoaComponent;
  let fixture: ComponentFixture<DanhMucHangHoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhMucHangHoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucHangHoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
