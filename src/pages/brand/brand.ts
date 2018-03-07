import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the BrandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Brands {
	$key?: string,
	name: string
}

@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html',
})
export class BrandPage {
	brand: Brands = { name: '' };
	submitted = false;
	brandListSubscription: Subscription;
	brandRef$: FirebaseListObservable<Brands[]>;
	updateBrandRef$: FirebaseObjectObservable<Brands>;
	isEdit = false;
	constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
		//Fetch the Data from Firebase using Brand List
		this.brandRef$ = this.database.list('brand-list');
	}
	/*
		Save Brand into Firebase
	*/
	saveBrand(form: NgForm) {
		this.submitted = true;
		if(form.valid) {
			this.brandRef$.push({
				name: form.value.name
			});
			// Fetching Brand List From Firebase
			this.brandRef$ = this.database.list('brand-list');
			this.submitted = false;
			this.brand = {name: ''} as Brands;
		}
	}

	/*
		Get the Brand Info From Firebase using Brand Key
	*/
	edit(brand: Brands) {
		this.isEdit = true;
		this.updateBrandRef$ = this.database.object(`brand-list/${brand.$key}`);
		//Store Subscription in the variable to unsubscribe later on
		this.brandListSubscription = this.updateBrandRef$.subscribe(
			brandList => this.brand = brandList);
	}
	/*
		Delete Brand From Firebase
	*/
	delete(brand: Brands) {
		this.brandRef$.remove(brand.$key);
		this.submitted = false;
		this.brand = {name:''} as Brands;
	}

	/*
		Update Brand Function
	*/
	updateBrand(form: NgForm) {
		this.submitted = true;
		if(form.valid) {
			this.updateBrandRef$.update(form.value);
			this.isEdit = false;
			this.submitted = false;
			this.brand = {name: ''} as Brands;
			//Unsubscribe from the Observable after Update Complete
			this.brandListSubscription.unsubscribe();
		}
	}
}
