import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BrandPage } from '../pages/brand/brand';
import { ProductPage } from '../pages/product/product';
import { StaffPage } from '../pages/staff/staff';
import { SupplierPage } from '../pages/supplier/supplier';
import { CategoryPage } from '../pages/category/category';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { ProductCreatePage } from '../pages/product-create/product-create';
import { SupplierCreatePage } from '../pages/supplier-create/supplier-create';
import { StaffCreatePage } from '../pages/staff-create/staff-create';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  inventoryPages: PageInterface[] = [
    { title: 'Brand', name: 'BrandPage', component: BrandPage, index: 0, icon: 'beer' },
    { title: 'Product', name: 'ProductPage', component: ProductPage, index: 1, icon: 'wine' },
    { title: 'Supplier', name: 'SupplierPage', component: SupplierPage, index: 2, icon: 'man' },
    { title: 'Category', name: 'CategoryPage', component: CategoryPage, index: 3, icon: 'list' },
    { title: 'Staff', name: 'StaffPage', component: StaffPage, index: 4, icon: 'people'}
  ];

  loggedInPages: PageInterface[] = [
    { title: 'Account', name: 'AccountPage', component: AccountPage, index: 5, icon: 'person' },
    { title: 'Login', name: 'LoginPage', component: LoginPage, index: 5, icon: 'log-in' }
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, index: 5, icon: 'log-in' }
  ];

  rootPage: any = HomePage;

  // pages: Array<{title: string, component: any}>;

  constructor(public events: Events, public menu: MenuController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];
    this.menu.enable(true, 'loggedInMenu');
    this.menu.enable(false, 'loggedOutMenu');
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let params = {};
    if(page.index) {
      params = { tabIndex: page.index };
    }
    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if(this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
  }
}
