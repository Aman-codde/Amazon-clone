import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from '../../actions/product/product.actions';



@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap( (action) => 
        this.productService.getProducts(action.data).pipe(
          map((data) => loadProductsSuccess({data})),
          catchError((error) => of(loadProductsFailure({error})))
        ))
    )
  );


  constructor(private actions$: Actions, private productService: ProductService) {}

}
