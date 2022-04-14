import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../../../../shared/models/product.model';
import {loadProduct, loadProductsSuccess, loadProductSuccess, selectProductAction, selectProductToBeUpdatedAction } from '../../actions/product/product.actions';


export const productFeatureKey = 'product';

export interface State {
  products: Product[];
  product: Product | null;
  selectedProduct: Product | null;
  selectProductToBeUpdated: Product | null
}

export const initialState: State = {
  products : [],
  product: null,
  selectedProduct: null,
  selectProductToBeUpdated: null
};


export const reducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return {...state, products: action.data}
  }),

  on(loadProductSuccess, (state, action) => {
    return {...state, product: action.data}
  }),

  on(selectProductAction, (state,action) => {
    return  {...state, selectedProduct: action.data}
  }),
  on(selectProductToBeUpdatedAction, (state,action) => {
    return {...state, selectProductToBeUpdated: action.data}
  })
  
);

/*on(createProductSuccess, (state, action) => {
    const products = [...state.products];
    products.push(action.data);
    return {...state, products}
  })*/
