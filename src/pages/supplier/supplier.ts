import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Supplier } from '../../models/suppliers/supplier.interface';
import { SupplierCreatePage } from '../supplier-create/supplier-create';

/**
 * Generated class for the SupplierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-supplier',
  templateUrl: 'supplier.html',
})
export class SupplierPage {

  supplierRef$: FirebaseListObservable<Supplier[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
  	this.supplierRef$ = this.database.list('suppliers');
  }

  createSupplier() {
	this.navCtrl.push(SupplierCreatePage);
  }

  editSupplier(supplier: Supplier) {
  	this.navCtrl.push(SupplierCreatePage, {
  		edit: true,
  		supplierID: supplier.$key
  	});
  }
}
