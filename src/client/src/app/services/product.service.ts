import { Injectable } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: ApiService) { }

  /*getProducts(category: string)
 {
   console.log(category)
   return this.api.post<{data: Product[]}, {category: string}>('products', {category}).pipe(map(res => res.data))
 }*/
 getProducts(category: string)
 {
   //console.log(category)
   return this.api.post<{data: Product[]},{category:string}>('products', {category}).pipe(map(res => res.data))
 }

 /*getProducts(category: string,subCategory: string)
 {
   return this.api.post<{data: Product[]}, {subCategory: string}>('products', {subCategory}).pipe(map(res => res.data))
 }*/
 
}
