import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { CreateUserService } from './create-user-service';
import {FormArray, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms'
import { SocialAccount } from './models/social-account';
import { CreateUserRequest } from './models/create-user-request';
import { Guid } from 'guid-typescript';




@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  firstName: any;
  lastName: any;
  response: any;
  formdata: any;
  socialAccounts: SocialAccount[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  socialSkills: string[] = [];
  accountTypes: string[] = [];

  constructor(private createUserService: CreateUserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getSocialAccountTypes();
    this.initForm();
  }

  initForm(){

    this.formdata = new FormGroup({
      firstName:  new FormControl('', [
        Validators.required,
      ]),
      lastName:   new FormControl('', [
        Validators.required,
      ]),
      socialAccounts: this.formBuilder.array([])
    })

  }

  get socialAccountsAsArray(): any {
    return this.formdata.get('socialAccounts') as FormArray;
  } 

  getSocialAccountTypes(): void {
    this.createUserService.getSocialAccountTypes()
    .subscribe(types => this.accountTypes = types);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.socialSkills.push(value);
    }

    event.chipInput!.clear();
  }

  remove(skill: string): void {
    const index = this.socialSkills.indexOf(skill);

    if (index >= 0) {
      this.socialSkills.splice(index, 1);
    }
  }

  onSubmit(form: NgForm){
    if (form.valid) {

      var request = new CreateUserRequest();
      request.id = Guid.create().toString()
      request.firstName = form.value.firstName
      request.lastName = form.value.lastName
      request.socialSkills = this.socialSkills
      request.socialAccounts = form.value.socialAccounts

      this.createUserService.addUser(request).subscribe({
        next: (v) => this.response = v,
        error: (e) => this.response = e.error
      });
    }
  }

  account(): any {
    return this.formBuilder.group({
      type: this.formBuilder.control(''),
      address: this.formBuilder.control('')
    });
  }

  addAccount(){
    this.socialAccountsAsArray.push(this.account());
  }

}
