import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { loadProducts } from 'src/app/store/actions/product/product.actions';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  $categories: Observable<any[]>
  constructor(private productServices: ProductService,
    private route: ActivatedRoute,
    private store: Store) {
    this.$categories = this.productServices.getCategories();
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params , 'inside categories-list ');
    this.store.dispatch(loadProducts({data: params.categories}));
    })
  
  }
  /*goToCategory(categories_array: string[] ) {
    this.route.navigate(['/products'], { queryParams: {categories: [categories_array]  } });
  }*/


}
