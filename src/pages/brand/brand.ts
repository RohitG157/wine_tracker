import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BrandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Brands {
	name: string
}

@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html',
})
export class BrandPage {
	brand: Brands = { name: '' };
	submitted = false;
	brandName = {};
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.brandName = [
			{name : 'RoyalStag'},
			{name : 'RoyalStag'},
			{name : 'RoyalStag'},
			{name : 'RoyalStag'},
			{name : 'RoyalStag'},
			{name : 'RoyalStag'}
		];
	}

	saveBrand(form: NgForm) {
		this.submitted = true;
		if(form.valid) {
			console.log('Listening Save Function');
		}
	}
	edit() {
		console.log("Edit ...");
	}

	delete() {
		console.log("Deleted ...");
	}
}
