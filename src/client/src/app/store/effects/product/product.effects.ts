import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure, createProduct, createProductSuccess, createProductFailure, loadProduct, loadProductSuccess, loadProductFailure } from '../../actions/product/product.actions';



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

  //for one product
  loadProduct$ = createEffect(() => 
    this.actions$
    .pipe(
      ofType(loadProduct),
      mergeMap((action) => this.productService.getProduct(action.data)
      .pipe(
        map(data => loadProductSuccess({data})),
        catchError(err => of(loadProductFailure({error: err})))
      )
      )
    )
  )

  createProduct$ = createEffect(() => 
    this.actions$
    .pipe(
      ofType(createProduct),
      mergeMap( (action) => 
      this.productService.createProduct(action.data).pipe(
        //tap(d => console.log("product created: ",d)),
        map((data) => createProductSuccess(data)),
        catchError((err) => of(createProductFailure({err})))
      ) )
    )
  );

  constructor(private actions$: Actions, private productService: ProductService) {}

}
