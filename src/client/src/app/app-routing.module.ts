import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { PageProductsComponent } from './pages/page-products/page-products.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';

const routes: Routes = [
  {path: 'users', component: PageUsersComponent},
  {path: 'products/category/:categoryName', component: PageProductsComponent},
  // {path: 'products/subCategory/:subCategoryName', component: PageProductsComponent},
  //{path: 'products/category/:categoryName/:subCategoryName', component: PageProductsComponent},
  {path: '', component: PageProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
