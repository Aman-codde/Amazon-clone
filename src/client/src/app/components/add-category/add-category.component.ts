import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Category } from '../../../../../shared/models/category.model';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  $categories: Observable<Category[]>;
  $products: Observable<Product[]>;
  $selectedProduct!: Observable<Product>;
  productId = '';
  addCategory: FormGroup;
  updateProduct: FormGroup;


  constructor(
    private productService: ProductService,
    private fb: FormBuilder
    ) 
  { 
    this.addCategory = this.fb.group({
      categoryName: ['', Validators.required]
    });

    this.updateProduct = this.fb.group({
      productName: ['', Validators.required]
    })

    this.$categories = this.productService.getCategories();
    this.$products  = this.productService.getProducts('');
    this.$selectedProduct = this.productService.getProduct("615fd7d99aeb2d41a7659a96");
  }

  ngOnInit(): void {
  }

  //choose category using select dropdown
  changeCategory(e: any) {
      console.log(e.target.value);   
  }

  get categoryName() {
    return this.addCategory.get('categoryName');
  }

  //choose product using select dropdown
  changeProduct(e: any) {
    console.log(e.target.value);
    this.productId = "615fd7d99aeb2d41a7659a96";
    // this.updateProduct.productName.setValue(e.target.value, {
    //   onlySelf: true
    // })
    console.log("selected Product id:",this.productId);
    //this.$selectedProduct = this.productService.getProduct("615fd7d99aeb2d41a7659a96");
  }

}
