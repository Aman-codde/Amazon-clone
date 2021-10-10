import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { productsSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/product.model';


@Component({
  selector: 'app-page-products',
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.scss']
})
export class PageProductsComponent implements OnInit {
  products$: Observable<Product[]>

  constructor(private store: Store<AppState>) 
  { 
    this.products$ = this.store.select(productsSelector)
  }

  ngOnInit(): void {
  }

}
