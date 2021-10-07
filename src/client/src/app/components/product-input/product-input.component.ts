import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.scss']
})
export class ProductInputComponent implements OnInit {
  addProduct: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) 
  { 
    this.addProduct = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['',Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }

  ngOnInit(): void {}

  postUser(){
    
  }

}
