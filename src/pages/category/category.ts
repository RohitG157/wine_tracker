import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Category {
	$key?: string,
	name: string
}

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

	category: Category = {name:''};
	submitted = false;
	categoryListSubscription: Subscription;
	categoryRef$: FirebaseListObservable<Category[]>;
	updateCategoryRef$: FirebaseObjectObservable<Category>;
	isEdit = false;
	constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
		this.categoryRef$ = this.database.list('categories');
	}
	/*
		Save Category in the Firebase
	*/
	saveCategory(form:NgForm) {
		this.submitted = true;
		if(form.valid) {
			this.categoryRef$.push({
				name: form.value.name
			});
			this.submitted = false;
			this.category = {name: ''} as Category;
		}
	}
	/*
		Get the Category Value from Firebase
	*/
	edit(category: Category) {
		this.isEdit = true;
		this.updateCategoryRef$ = this.database.object(`categories/${category.$key}`);
		// Store Subscription in the variable to unsubscribe later on
		this.categoryListSubscription = this.updateCategoryRef$.subscribe(
			categories => this.category = categories);
	}
	/*
		Delete Category From Firebase
	*/
	delete(category: Category) {
		this.categoryRef$.remove(category.$key);
		this.submitted = false;
		this.category = {name: ''} as Category;
	}

	/*
		Update Category in the Firebase
	*/
	updateCategory(cateForm: NgForm) {
		this.submitted = true;
		if(cateForm.valid) {
			this.updateCategoryRef$.update(cateForm.value);
			this.isEdit = false;
			this.submitted = false;
			this.category = {name: ''} as Category;
			//Unsubscribe from the Observable after Update Complete
			this.categoryListSubscription.unsubscribe();
		}	
	}

}
