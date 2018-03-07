import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { FileChooser } from '@ionic-native/file-chooser';
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
import { ProductCreatePage } from '../pages/product-create/product-create';
import { SupplierCreatePage } from '../pages/supplier-create/supplier-create';
import { StaffCreatePage } from '../pages/staff-create/staff-create';
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
    LoginPage,
    ProductCreatePage,
    SupplierCreatePage,
    StaffCreatePage
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
        {component:LoginPage, name: 'LoginPage', segment: 'login'},
        {component:ProductCreatePage, name: 'ProductCreatePage', segment: 'create-product'},
        {component:SupplierCreatePage, name: 'SupplierCreatePage', segment: 'create-supplier'},
        {component:StaffCreatePage, name: 'StaffCreatePage', segment: 'add-staff'}
      ]
    }),
    // Initialise AngularFire with credentials from the dashboard
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    //Import AngularFireDatabaseModule to use Database interaction
    AngularFireDatabaseModule
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
    LoginPage,
    ProductCreatePage,
    SupplierCreatePage,
    StaffCreatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileChooser,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
