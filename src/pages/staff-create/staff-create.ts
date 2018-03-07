import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the StaffCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Staff {
  $key?: string,
	name: string,
	address: string,
	phone: string,
	username: string,
  role: string
}

@Component({
  selector: 'page-staff-create',
  templateUrl: 'staff-create.html',
})
export class StaffCreatePage {

  staff: Staff = {
  	name: '',
  	address: '',
  	phone: '',
  	username: '',
    role: ''
  };
  submitted = false;
  userRef$: FirebaseListObservable<Staff[]>;
  updateUserRef$: FirebaseObjectObservable<Staff>;
  isEdit = false;
  userSubscription: Subscription;
  userId = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.userRef$ = this.database.list('users');
    this.isEdit = this.navParams.get('edit');
    if(this.isEdit) {
      this.userId = this.navParams.get('userID');
      this.updateUserRef$ = this.database.object(`users/${this.userId}`);
      this.userSubscription = this.updateUserRef$.subscribe(
        user => this.staff = user);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffCreatePage');
  }

  saveStaff(staffForm:NgForm) {
  	this.submitted = true;
    if(staffForm.valid) {
       this.userRef$.push(staffForm.value);
       this.navCtrl.pop();
    }
  }

  updateStaff(staffForm: NgForm) {
    this.submitted = true;
    if(staffForm.valid) {
      this.updateUserRef$.update(staffForm.value);
      //Unsubscribe from the firebase after Update Complete
      this.userSubscription.unsubscribe();
      this.navCtrl.pop();
    }
  }

  deleteStaff(userId: any) {
    this.updateUserRef$.remove();
    this.userSubscription.unsubscribe();
    this.navCtrl.pop();
  }

}
