import {Component, OnInit} from '@angular/core';
import {Padlet, User} from '../shared/padlet';
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {Rating} from "../shared/rating";
import {Comment} from "../shared/comment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Invite} from "../shared/invite";
import {InviteFactory} from "../shared/invite-factory";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})

export class PadletDetailsComponent implements OnInit {

  padlet: Padlet = PadletFactory.empty();
  inviteForm: FormGroup;

  invite : Invite = InviteFactory.empty();
  invite_usermail : string = "";
  isMenuOpen : boolean = false;

  constructor(
    private bs: PadletService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.inviteForm = this.fb.group({});
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSinglePadlet(params['id'])
      .subscribe((p: Padlet) => {
        this.padlet = p;
        this.getRatings();
        this.getComments();
      });
    this.initInvite();
  }

  initInvite() : void {
    this.inviteForm = this.fb.group({
      id: this.invite.id,
      user: [this.invite_usermail, Validators.required],
      read: this.invite.read,
      edit: this.invite.edit,
      Delete: this.invite.Delete
    });
  }

  getRatings() : void {
    for(let entrie of this.padlet?.entries) {
      this.bs.getRatingsForEntrie(entrie.id).subscribe((res: Rating[]) => {
        entrie.ratings = res;
      })
    }
  }

  getComments() : void {
    for (let entrie of this.padlet?.entries) {
      this.bs.getCommentsForEntrie(entrie.id).subscribe((res: Comment[]) => {
        entrie.comments = res;
      });
    }
  }

  toggleMenu() : void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  delete() : void {
    let padlet_id = this.padlet.id.toString();
    let user_id = this.padlet.id.toString();
    if(confirm("Möchten Sie das Padlet wirklich löschen?")) {
      this.bs.deletePadlet(this.padlet.id.toString()).subscribe(res => {
        this.router.navigateByUrl('/public');
      });
    }
  }

  inviteUser() : void {
    const modalElement = document.getElementById(`padlet-modal`);
    console.log(modalElement)
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = "block";
    }
  }

  modalClose() : void {
    document.querySelectorAll<HTMLElement> ('.modal').forEach(it => {
      it.classList.remove('show');
      it.style.display = "none";
    });
  }

  async submitInviteForm() {

    if (this.inviteForm.valid) {
      this.invite_usermail = this.inviteForm.get('user')!.value;

      let user = await this.getUserByMail(this.invite_usermail);
      if(user.id) {
        this.invite = InviteFactory.fromObject(this.inviteForm.value);
        this.invite.user_id = user.id;
        this.invite.padlet_id = this.padlet.id;

        let check = await this.deleteInviteIfExists(this.invite);

        this.bs.createInvite(this.invite).subscribe(res => {
          this.invite = InviteFactory.empty();
          this.modalClose();
        });
      }
      else {
        window.alert(`Benutzer mit E-Mail ${this.invite_usermail} konnte nicht gefunden werden.`)
      }
    }

  }

  async deleteInviteIfExists(invite : Invite) : Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.bs.getInviteIfExists(invite.padlet_id, invite.user_id).subscribe({
        next: (res: Invite ) => {
          if(res.id) {
            this.bs.deleteInvite(res.id.toString()).subscribe(res => resolve(null));
          }
          resolve(null)
        },
        error: (error) => {
          if (error.status === 404) {
            reject("Error getting user.");
          }
        },
        complete: () => {
        }
      });
    });
  }

  async getUserByMail(mail: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.bs.getUserByEmail(mail).subscribe({
        next: (res: User) => {
          resolve(res);
        },
        error: (error) => {
          if (error.status === 404) {
            reject("Error getting user.");
          }
        },
        complete: () => {
        }
      });
    });
  }


}
