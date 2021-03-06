import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromUser from './store/reducers/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user/user.effects';
import { PageUsersComponent } from './pages/page-users/page-users.component';
import { ProductInputComponent } from './components/product-input/product-input.component';
import * as fromProduct from './store/reducers/product/product.reducer';
import { ProductEffects } from './store/effects/product/product.effects';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { PageProductsComponent } from './pages/page-products/page-products.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserInputComponent,
    PageUsersComponent,
    ProductInputComponent,
    PageProductsComponent,
    ProductsListComponent,
    HeaderComponent,
    ProductDetailsComponent,
    FooterComponent,
    SignInComponent,
    CategoriesListComponent,
    AddCategoryComponent,
    UpdateProductComponent,
    SidebarComponent,
    EditProductComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forRoot([UserEffects, ProductEffects]),
    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.reducer),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
