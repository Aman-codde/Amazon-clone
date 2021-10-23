import { Injectable } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { Category } from '../../../../shared/models/category.model';
import { ApiService } from './api.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: ApiService) { }

  getProducts(categories: string)
  {
    console.log(categories)
    return this.api.post<{data: Product[]},{categories:string}>('products', {categories}).pipe(map(res => res.data))
  }

  getProduct(productId: string){
    console.log(productId);
    return this.api.post<{data: Product},{productId: string}>('product', {productId}).pipe(map( res => res.data));
  }

  createProduct(product: Product) {
    console.log(product)
    return this.api.post<{data:Product},Product>('create-product',product)
  }

  getCategories() {
    return this.api.get<{data: Category[]}>('categories').pipe(map(res => res.data),tap(data => console.log('product service data', data)));
  }

 
}
