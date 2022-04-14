import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
import { selectProductToBeUpdatedAction } from 'src/app/store/actions/product/product.actions';
import { selectedProductToBeUpdatedSelector } from 'src/app/store/selectors/product/product.selectors';
import { Category } from '../../../../../shared/models/category.model';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  $selectedProduct: Observable<Product>;
  products$: Observable<Product[]>;
  $categories: Observable<Category[]>;
  addCategory: FormGroup;
  categoryId = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private store:Store<AppState>,
    private router: Router
  ) 
  { 

    this.addCategory = this.fb.group({
      categoryName: ['', Validators.required]
    })

    this.$selectedProduct = this.productService.getSelectedProduct("6172e72a2eae3ae2efa07556")

    this.$categories = this.productService.getCategories();

    this.products$ = this.productService.getProducts('');
  }

  ngOnInit(): void {
  }
  
  changeCategory(e: any){
    console.log(e.target.value);
  }

  addCategoryToProduct(productId: any) {
    this.categoryId = "616778df84fcfd3c6c822978"
    console.log("category to be added: ",this.categoryId);
    this.productService.addCategoryToProduct(productId,this.categoryId).subscribe();
  }

  editProduct(product: any) {
    this.router.navigate([`/edit-product/${product._id}`]);
    this.store.dispatch(selectProductToBeUpdatedAction({data: product}))
  }

}
