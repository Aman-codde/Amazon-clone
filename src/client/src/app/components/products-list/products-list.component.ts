import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
import { loadProducts } from 'src/app/store/actions/product/product.actions';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @Input() public products: Product[] = [];

  constructor(
    private productService: ProductService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) 
  { }

  ngOnInit(): void {
  
    this.route.queryParams.subscribe(params => {
      console.log(params , 'inside products-list');

  this.store.dispatch(loadProducts({data: params.categories}));
    })
  } 
  
  //this.router.navigate(['/products'], { queryParams: { price: '6.98' } });
  


}
