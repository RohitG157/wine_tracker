import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { User } from '../../models/users/user.interface';
import { StaffCreatePage } from '../staff-create/staff-create';
/**
 * Generated class for the StaffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html',
})
export class StaffPage {
  
  userRef$: FirebaseListObservable<User[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
  	this.userRef$ = this.database.list('users');
  }
  
  addStaff() {
  	this.navCtrl.push(StaffCreatePage);
  }

  editUser(user: User) {
  	this.navCtrl.push(StaffCreatePage, {
  		edit: true,
  		userID: user.$key
  	});
  }
}
