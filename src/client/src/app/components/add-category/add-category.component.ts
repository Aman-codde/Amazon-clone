import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Category } from '../../../../../shared/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  $categories: Observable<Category[]>;
  addCategoryForm: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
    ) 
  { 
    this.addCategoryForm = this.fb.group({
      category_name: ['', Validators.required],
      parent_category: ['']
    });

    this.$categories = this.productService.getCategories();

  }

  ngOnInit(): void {
  }

  //choose category using select dropdown
  changeCategory(e: any) {
      console.log(e.target.value);   
  }
  
  createCategory() {
    return this.productService.createCategory(this.addCategoryForm.value).subscribe();
  }

}
