import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the SupplierCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Supplier {
	$key?: string,
  company_name: string,
  name: string,
  code: string,
	address: string,
	phone: string,
  email: string
}

@Component({
  selector: 'page-supplier-create',
  templateUrl: 'supplier-create.html',
})
export class SupplierCreatePage {
  
  supplier: Supplier = {
    company_name: '',
  	name: '',
    code: '',
  	address: '',
  	phone: '',
    email: ''
  };
  submitted = false;
  supplierRef$: FirebaseListObservable<Supplier[]>;
  isEdit = false;
  supplierId = '';
  updateSupplierRef$: FirebaseObjectObservable<Supplier>;
  supplierSubscription: Subscription;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.supplierRef$ = this.database.list('suppliers');
    this.isEdit = this.navParams.get('edit');
    if(this.isEdit) {
      this.supplierId = this.navParams.get('supplierID');
      this.updateSupplierRef$ = this.database.object(`suppliers/${this.supplierId}`);
      this.supplierSubscription = this.updateSupplierRef$.subscribe(
        supplier => this.supplier = supplier);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierCreatePage');
  }
  
  saveSupplier(form:NgForm) {
  	this.submitted = true;
    if(form.valid) {
      this.supplierRef$.push(form.value);
      this.navCtrl.pop();
    }
  }

  updateSupplier(form: NgForm) {
    this.submitted = true;
    if(form.valid) {
      this.updateSupplierRef$.update(form.value);
      this.supplierSubscription.unsubscribe();
      this.navCtrl.pop();
    }
  }

  deleteSupplier() {
    this.updateSupplierRef$.remove();
    this.supplierSubscription.unsubscribe();
    this.navCtrl.pop();
  }

}
