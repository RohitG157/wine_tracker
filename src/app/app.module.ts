import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BrandPage } from '../pages/brand/brand';
import { ProductPage } from '../pages/product/product';
import { SupplierPage } from '../pages/supplier/supplier';
import { CategoryPage } from '../pages/category/category';
import { StaffPage } from '../pages/staff/staff';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BrandPage,
    ProductPage,
    SupplierPage,
    CategoryPage,
    StaffPage,
    AccountPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        {component: BrandPage, name: 'BrandPage', segment: 'brands'},
        {component: ProductPage, name: 'ProductPage', segment: 'products'},
        {component: SupplierPage, name: 'SupplierPage', segment: 'suppliers'},
        {component: CategoryPage, name: 'CategoryPage', segment: 'categories'},
        {component: StaffPage, name: 'StaffPage', segment: 'staffs'},
        {component:AccountPage, name: 'AccountPage', segment: 'account'},
        {component:LoginPage, name: 'LoginPage', segment: 'login'}
      ]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BrandPage,
    ProductPage,
    SupplierPage,
    CategoryPage,
    StaffPage,
    AccountPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
