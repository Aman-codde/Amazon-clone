import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
import { loadProducts, selectProductAction } from 'src/app/store/actions/product/product.actions';
import { selectedProductSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @Input() public products: Product[] = [];
  selectedProduct$: Observable<Product | null>;
  selectedProduct : Product| null = null;

  constructor(
    
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) 
  { 
    this.selectedProduct$ = this.store.select(selectedProductSelector);
  }

  ngOnInit(): void {
  
    this.route.queryParams.subscribe(params => 
      {
        console.log(params , 'inside products-list');
        this.store.dispatch(loadProducts({data: params.categories}));
      }
    )

    this.selectedProduct$.subscribe(data => this.selectedProduct=data);
  } 
  
  selectProduct(product: Product, selectedProduct: Product | null) {
    this.store.dispatch(selectProductAction({data: this.isSelected(selectedProduct, product)? null: product}))
    return this.router.navigate(['/product/',product._id])
  }

  isSelected(selectedProduct: Product | null, product: Product){
    return selectedProduct?._id === product._id;
  }

  //goToProduct(id: any) {
    //console.log('goToProduct',id)
    //this.router.navigate(['/product/'], {queryParams: {_id: id}})
    
    //return this.router.navigate(['/product/',id])
  //}
  
}
