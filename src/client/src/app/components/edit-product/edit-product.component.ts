import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
import { selectedProductToBeUpdatedSelector } from 'src/app/store/selectors/product/product.selectors';
import { Category } from '../../../../../shared/models/category.model';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  addCategoryToProductForm: FormGroup;
  categories$: Observable<Category[]>;
  $updateProduct: Observable<Product | null>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private store: Store<AppState>
  ) 
  { 
    this.addCategoryToProductForm = this.fb.group({
      categoryIdArray: this.fb.array([])
    });

    this.categories$ = this.productService.getCategories();

    this.$updateProduct = this.store.select(selectedProductToBeUpdatedSelector)
  }

  ngOnInit(): void {
  }

  onCheckboxChange(e:any) {
    console.log(e.target.value);

    const categoryIdArray: FormArray = this.addCategoryToProductForm.get('categoryIdArray') as FormArray;
    if(e.target.checked) {
      categoryIdArray.push(new FormControl(e.target.value));
    }
    else {
      let i: number = 0;
      categoryIdArray.controls.forEach((item) => {
        if(item.value == e.target.value) {
          categoryIdArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  addProductCategory(product: Product) {
    console.log(" Product ",product._id);
    console.log("-------->",this.addCategoryToProductForm.value,)
    this.productService.addCategoriesToProduct(product,this.addCategoryToProductForm.value);
  }
}
