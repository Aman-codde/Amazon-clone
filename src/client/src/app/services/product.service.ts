import { Injectable } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: ApiService) { }

  getProduct(productId: string){
    console.log(productId);
    return this.api.post<{data: Product[]},{productId: string}>('products', {productId}).pipe(map( res => res.data));
  }
  
  getProducts(category: string)
  {
    //console.log(category)
    return this.api.post<{data: Product[]},{category:string}>('products', {category}).pipe(map(res => res.data))
  }

 
 
}
