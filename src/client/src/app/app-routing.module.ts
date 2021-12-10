import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductInputComponent } from './components/product-input/product-input.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { PageProductsComponent } from './pages/page-products/page-products.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';

const routes: Routes = [
  {path: '', component: PageProductsComponent},
  {path: 'products', component: PageProductsComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'users', component: PageUsersComponent},
  {path: 'login', component: SignInComponent},
  {path: 'products/category/:categoriesName', component: PageProductsComponent},
  {path: 'addProduct', component: ProductInputComponent},
  {path: 'addCategory', component: AddCategoryComponent},
  {path: 'updateProduct', component: UpdateProductComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path: 'editProduct', component: EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
