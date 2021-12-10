import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @Input() selectedProduct: Product| null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
