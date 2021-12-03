import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { createProduct } from 'src/app/store/actions/product/product.actions';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.scss']
})
export class ProductInputComponent implements OnInit {
  addProductForm: FormGroup;
  url: any;

  constructor(private fb: FormBuilder, private store: Store<AppState>) 
  { 
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],// default: 0??
      quantity: ['',Validators.required],
      imgUrl: ['']
    })
  }

  ngOnInit(): void {}

  onFileSelect(event: any){
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files)
    reader.onload = (event: any) => {
      this.url = event.target.value
    }
    this.addProductForm.get('imgUrl')?.setValue(file);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('imgUrl',this.addProductForm.get('imgUrl')?.value);
    formData.append('name',this.addProductForm.get('name')?.value);
    formData.append('price',this.addProductForm.get('price')?.value);
    formData.append('quantity',this.addProductForm.get('quantity')?.value);
    this.store.dispatch(createProduct({data : this.addProductForm.value}));
  }

  // postProduct(){
  //   this.store.dispatch(createProduct({data : this.addProductForm.value}));
  // }

}
