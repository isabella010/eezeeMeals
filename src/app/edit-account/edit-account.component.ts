import { Component } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css'],
  providers: [AccountsService]
})
export class EditAccountComponent 
{
  tmp : any = {};

  showPassword: boolean = false;
  showNewPassword: boolean = false;
  showRetypePassword: boolean = false;
  showCurrentPassword: boolean = false;

  showPasswordForm: boolean = false;
  isFormValidPassword: boolean = true;
  isFormPasswordMatch: boolean = true;
  isFormPasswordMatchAccount: boolean = true;
  isFormNewPasswordsMatch: boolean = true;

  isFormValid: boolean = true;
  isFormValidShipping: boolean = true;
  newPassword: string = '';
  retypePassword: string = '';
  currentPassword: string = '';
  currentPasswordAccountForm: string = '';
  showAccountDetails: boolean = false;
  showAccountPassword: boolean = false;
  showShippingDetails: boolean = false;

  postalRegex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;

  constructor(private _acc: AccountsService){}

  ngOnInit(): void 
  {
    console.log("IN ngOnInit EditAccount")
    this._acc.viewAccountDetails().subscribe(resCartData => {
      this.tmp = resCartData;
      console.log("Current Account:", this.tmp)
    });
  }

  onSubmit() {
    // check if any required field is empty
    if (!this.tmp.account_name || !this.tmp.first_name || !this.tmp.last_name) {
      console.log('Please fill in all required fields');
      this.isFormValid = false;
      return;
    }
    if (this.tmp.password != this.currentPasswordAccountForm)
    {
      console.log('Please enter the correct password')
      this.isFormPasswordMatchAccount= false;
      return;
    }
    // if all required fields are filled, submit the form
    this._acc.updateAccount(this.tmp).subscribe(
      (response) => {
        console.log('Account updated successfully:', response);
        // Handle any other action or UI updates here
        
      },
      (error) => {
        console.error('Error updating account:', error);
        // Handle any error message or UI updates here
      }
    );
  }

  onSubmitShipping() {
    // check if any required field is empty
    if (!this.tmp.street || !this.tmp.number || !this.tmp.city || !this.tmp.postal || !this.tmp.phone) {
      console.log('Please fill in all required fields');
      this.isFormValidShipping = false;
      return;
    }
    if (this.tmp.password != this.currentPasswordAccountForm)
    {
      console.log('Please enter the correct password')
      this.isFormPasswordMatchAccount= false;
      return;
    }
    else if (!/^[a-zA-Z\s]+$/.test(this.tmp.street) || !/\S/.test(this.tmp.street)) {
      alert('Please enter a valid street name (letters only)');
      return;
    }
    else if (!/^\d+$/.test(this.tmp.number)) {
      alert('Please enter a valid address number');
      return;
    }

    else if (!/^[a-zA-Z\s]+$/.test(this.tmp.city) || !/\S/.test(this.tmp.city)) {
      alert('Please enter a valid city name (letters only)');
      return;
    }

    else if (!(this.postalRegex.test(this.tmp.postal))) {
      alert('Please enter a valid postal code');
      return;
    }

    else if (!/^\d{10}$/.test(this.tmp.phone)) {
      alert('Please enter a valid phone number');
      return;
    }
    // if all required fields are filled, submit the form
    this._acc.updateAccount(this.tmp).subscribe(
      (response) => {
        console.log('Account updated successfully:', response);
        // Handle any other action or UI updates here
        
      },
      (error) => {
        console.error('Error updating account:', error);
        // Handle any error message or UI updates here
      }
    );
  }

  
  
  onSubmitPassword() 
  {
    // check if any required field is empty
    if (!this.newPassword || !this.retypePassword || !this.currentPassword) {
      console.log('Please fill in all required fields');
      this.isFormValidPassword = false;
      return;
    }

    if (this.newPassword != this.retypePassword)
    {
      console.log('Passwords do not match');
      this.isFormNewPasswordsMatch = false;
      return;
    }

    if (this.tmp.password != this.currentPassword)
    {
      console.log('Please enter the correct password')
      this.isFormPasswordMatch= false;
      return;
    }

    this.tmp.password = this.newPassword;
    this._acc.updateAccount(this.tmp).subscribe(
      (response) => {
        console.log('Account updated successfully:', response);
        // Handle any other action or UI updates here
        
      },
      (error) => {
        console.error('Error updating account:', error);
        // Handle any error message or UI updates here
      }
    );
  }
  clearShippingInfo(): void {
    this.tmp.street = '';
    this.tmp.number = '';
    this.tmp.unit = '';
    this.tmp.city = '';
    this.tmp.postal = '';
    this.tmp.phone = '';
    this._acc.updateAccount(this.tmp).subscribe(
      (response) => {
        console.log('Account updated successfully:', response);
        // Handle any other action or UI updates here
        
      },
      (error) => {
        console.error('Error updating account:', error);
        // Handle any error message or UI updates here
      }
    );
  }

  togglePasswordDetails()
  {
    this.showAccountPassword = !this.showAccountPassword;
  }
  toggleAccountDetails() {
    this.showAccountDetails = !this.showAccountDetails;
  }
  toggleShippingDetails()
  {
    this.showShippingDetails = !this.showShippingDetails;
  }
}