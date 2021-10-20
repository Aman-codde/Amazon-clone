import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductInputComponent } from './components/product-input/product-input.component';
import { PageProductsComponent } from './pages/page-products/page-products.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';

const routes: Routes = [
  {path: '', component: PageProductsComponent},
  {path: 'products', component: PageProductsComponent},
  {path: 'users', component: PageUsersComponent},
  {path: 'products/category/:categoriesName', component: PageProductsComponent},
  {path: 'addProduct', component: ProductInputComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
