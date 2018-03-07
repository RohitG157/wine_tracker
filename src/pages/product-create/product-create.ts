import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Brands } from '../../models/brand/brand.interface';
import { Category } from '../../models/category/category.interface';
import { Supplier } from '../../models/suppliers/supplier.interface';
/**
 * Generated class for the ProductCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface ProductInterface {
	$key?: string,
	name: string,
	quantity: number,
	brandId: string,
	categoryId: string,
	purchase_price: number,
	sales_price: number,
	size: number,
	measure_in: string,
	image: string,
	origin: string,
	sku: string,
	supplierId: string,
	hsn_code: string,
	code: string,
	notes: string
}

@Component({
  selector: 'page-product-create',
  templateUrl: 'product-create.html',
})
export class ProductCreatePage {

	product: ProductInterface = {
		name: '',
		quantity: null,
		brandId: '',
		categoryId: '',
		purchase_price: null,
		sales_price: null,
		size: null,
		measure_in: '',
		image: '',
		origin: '',
		sku: '',
		hsn_code: '',
		supplierId: '',
		code: '',
		notes: ''
	};
	submitted = false;
	productRef$: FirebaseListObservable<ProductInterface[]>;
	brandRef$: FirebaseListObservable<Brands[]>;
	categoryRef$: FirebaseListObservable<Category[]>;
	supplierRef$: FirebaseListObservable<Supplier[]>;
	isEdit = false;
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public fileChooser: FileChooser,
		private database: AngularFireDatabase,
		private camera: Camera) {

		const options: CameraOptions = {
		  quality: 100,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
		}
		this.brandRef$ = this.database.list('brand-list');
		this.categoryRef$ = this.database.list('categories');
		this.supplierRef$ = this.database.list('suppliers');
		this.productRef$ = this.database.list('products');
	}

	ionViewDidLoad() {
	  	console.log('ionViewDidLoad ProductCreatePage');
	}

	saveProduct(form: NgForm) {
		this.submitted = true;
		if(form.valid) {
			
		}
	}

	selectPhoto() {
		this.fileChooser.open().then(uri => console.log(uri)).catch(err => console.log(err));
	}

}
