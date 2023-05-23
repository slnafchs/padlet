import { Component, Input, OnInit } from '@angular/core';
import { Invite } from '../shared/invite';
import { InviteFactory } from '../shared/invite-factory';
import { PadletService } from '../shared/padlet.service';
import { UserFactory } from '../shared/user-factory';
import { PadletFactory } from '../shared/padlet-factory';
import { User } from '../shared/user';
import { Padlet } from '../shared/entrie';
import { Userright } from '../shared/userright';

@Component({
  selector: 'bs-invite-item',
  templateUrl: './invite-item.component.html',
  styles: [
  ]
})
export class InviteItemComponent implements OnInit{
  @Input() invite : Invite = InviteFactory.empty();
  padlet : Padlet = PadletFactory.empty();

  constructor( private bs : PadletService) {}

  ngOnInit(): void {
    this.bs.getSinglePadlet(this.invite.padlet_id).subscribe((res: Padlet) => {
      this.padlet = res;
    })
  }

  accept() : void {
    let userright = new Userright(this.invite.user_id, this.padlet.id, this.invite.read, this.invite.edit, this.invite.Delete);
    this.bs.createUserright(userright).subscribe(() => {
      this.bs.deleteInvite(this.invite.id.toString()).subscribe(() => {
        this.invite = InviteFactory.empty();
        window.location.reload()
      });
    });
  }

  decline() : void {
    this.bs.deleteInvite(this.invite.id.toString()).subscribe(() => {
      this.invite = InviteFactory.empty()
      window.location.reload()
    });
  }
}
