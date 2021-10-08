import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  ) 
  { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.store.dispatch(loadProducts({data: params.categoryName}));
    })
  }

}
