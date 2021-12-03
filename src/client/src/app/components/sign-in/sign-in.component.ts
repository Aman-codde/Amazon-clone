import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginUser } from 'src/app/store/actions/user/user.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  authUser: FormGroup;

  constructor(private fb: FormBuilder,
    private store: Store) 
    {
    this.authUser = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
   }

   ngOnInit(): void {
  }

  login() {
    this.store.dispatch(loginUser({data: this.authUser.value}))
  }
}
