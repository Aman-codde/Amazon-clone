import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProduct } from 'src/app/store/actions/product/product.actions';
import { AppState } from 'src/app/store/index.js';
import { productSelector, selectedProductSelector } from 'src/app/store/selectors/product/product.selectors.js';

import { Product } from '../../../../../shared/models/product.model.js';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  //product$: Observable<Product | null>;
  //selectedProduct$: Observable<Product | null>
  //selectedProduct : Product| null = null; // new

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) 
  { 
    //this.product$ = this.store.select(productSelector);
    //this.selectedProduct$ = this.store.select(selectedProductSelector);
   
  }

  ngOnInit(): void {
    //this.selectedProduct$.subscribe(data => this.selectedProduct = data);
    //const id = ""+this.selectedProduct?._id
    //this.store.dispatch(loadProduct({data: id}))

    
  }



}
