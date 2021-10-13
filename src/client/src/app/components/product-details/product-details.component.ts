import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductService } from 'src/app/services/product.service';
import { loadProducts } from 'src/app/store/actions/product/product.actions';
import { AppState } from 'src/app/store/index.js';
import { Product } from '../../../../../shared/models/product.model.js';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  //@Input() selected_product: Product;

  constructor(
    private productService: ProductService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) 
  { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
     this.store.dispatch(loadProducts({data: params.productId}));
    })
  }



}
