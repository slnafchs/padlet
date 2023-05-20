import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Padlet, User} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";
import {UserFactory} from "../shared/user-factory";

@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: [
  ]
})
export class PadletFormComponent implements OnInit{

  padletForm: FormGroup;
  padlet: Padlet = PadletFactory.empty();
  errors: { [key: string]: string } = {};

  isUpdatingPadlet : boolean = false;
  isPublic: boolean = true;


  constructor(
    private fb: FormBuilder,
    private bs: PadletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.padletForm = this.fb.group({});
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingPadlet = true;
      this.bs.getSinglePadlet(id).subscribe(
        (res : Padlet) => {
          this.padlet = res;
          this.initPadlet();
        }
      );
    }
    this.initPadlet();
  }

  initPadlet() : void {
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      name: [this.padlet.name, Validators.required],
      is_public: this.padlet.is_public,
    });
    this.initPadlet();
    this.padletForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  updateErrorMessages() {
    console.log("Is form invalid? " + this.padletForm.invalid);
    this.errors = {};

    for (const message of PadletFormErrorMessages) {
      const control = this.padletForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  async submitForm() {
    this.padlet = PadletFactory.fromObject(this.padletForm.value);
    this.padlet.is_public = this.isPublic;
    let user_id : string = this.bs.getCurrentUserId();
    let user = await this.getUser(+user_id);
    this.padlet.user_id = +user_id;
    this.padlet.user = user;
    this.padlet.entries = [];

    if (this.isUpdatingPadlet) {
      this.bs.updatePadlet(this.padlet).subscribe(res => {
        this.router.navigate(["padlets", this.padlet.id]);
      });
    } else {
      this.bs.createPadlet(this.padlet).subscribe(res => {
        this.padlet = PadletFactory.empty();
        this.padletForm.reset(PadletFactory.empty());
        this.router.navigate(["padlets"]);
      });
    }
  }

  async getUser(id: number) : Promise<User> {
    return new Promise((resolve, reject) => {
      let response = this.bs.getUserById(id).subscribe((res: User) => {
          resolve(res);
      },
      error => {
        reject("Error getting user.")
      });
    })
  }

  toggleIsPublic(event : any) {
    this.isPublic = event.target.checked;
  }
}
