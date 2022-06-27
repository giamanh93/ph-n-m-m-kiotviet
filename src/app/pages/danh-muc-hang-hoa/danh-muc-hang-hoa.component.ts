import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup } from '@angular/forms'
import { DataService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-danh-muc-hang-hoa',
  templateUrl: './danh-muc-hang-hoa.component.html',
  styleUrls: ['./danh-muc-hang-hoa.component.css']
})
export class DanhMucHangHoaComponent implements OnInit {
  formProduction: FormGroup;
  listProduction: any;
  page: any = 3
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formProduction = this.formBuilder.group({
      name: [''],
      price: [0],
      product_type: [''],
      productImage: [''],
      producer_id: [''],
      code: [''],
      trademark: [''],
      sell_price: [''],
    })
    this.getListProduct();
  }
  getListProduct() {
    this.dataService
      .listProduct<any[]>()
      .subscribe((data: any[]) => this.listProduction = data,
        error => () => {
        },
        () => {

        });

  }
  showModalCreateProduct(i, id) {
    this.formProduction.reset();
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'Tạo Khách Hàng';
    modalRef.componentInstance.form = this.formProduction;
    if (id) {
      modalRef.componentInstance.dataEdit = this.listProduction.list[i];
    }
    modalRef.componentInstance.arrForm = [{
      type: 'name',
      name: 'Tên Sản Phẩm',
      key: 'input'
    },
    {
      type: 'code',
      name: 'Mã sản phẩm',
      key: 'input'
    },
    {
      type: 'product_type',
      name: 'loại sản phẩm',
      key: 'select'
    },
    {
      type: 'price',
      name: 'Đơn giá',
      key: 'input'
    },
    {
      type: 'sell_price',
      name: 'Đơn giá bán',
      key: 'input'
    },
    {
      type: 'trademark',
      name: 'Thương hiệu',
      key: 'select'
    },
    
    ];
    modalRef.componentInstance.save.subscribe((receivedEntry) => {
      if (id) {
        this.dataService
          .updateProduct<any[]>(id, receivedEntry)
          .subscribe((data: any[]) => console.log("Oke"),
            error => () => {
              console.log(error)
            },
            () => {
              this.getListProduct()
              this.formProduction.reset();
            });

      } else {
        this.dataService
          .addProduct<any[]>(receivedEntry)
          .subscribe((data: any[]) => console.log("Oke"),
            error => () => {
              console.log(error)
            },
            () => {
              this.getListProduct()
              this.formProduction.reset();
            });
      }
    })
  }
  onDelete(id) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'Xóa Thông Tin Sản Phẩm';
    modalRef.componentInstance.content = 'Bạn muốn xóa thông tin Sản Phẩm này không';
    modalRef.componentInstance.form = null;
    modalRef.componentInstance.submit.subscribe((receivedEntry) => {
      this.dataService
        .deleteProduct<any[]>(id)
        .subscribe((data: any[]) => console.log("DELETE Oke"),
          error => () => {
            console.log(error)
          },
          () => {
            this.getListProduct();
            // this.formCustomer.reset();
          });
    })

  }
}
