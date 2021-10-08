import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../../../../shared/models/product.model';
import { createProductSuccess, loadProducts, loadProductsFailure, loadProductsSuccess } from '../../actions/product/product.actions';


export const productFeatureKey = 'product';

export interface State {
  products: Product[];
}

export const initialState: State = {
  products : []
};


export const reducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return {...state, products: action.data}
  }),
  on(createProductSuccess, (state, action) => {
    const products = [...state.products];
    products.push(action.data);
    return {...state, products}
  })
);

