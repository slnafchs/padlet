import { Component, Input } from '@angular/core';
import {Padlet, User, Userright} from '../shared/userright';
import { UserrightFactory } from '../shared/userright-factory';
import { PadletService } from '../shared/padlet.service';
import { UserFactory } from '../shared/user-factory';

@Component({
  selector: 'bs-userright-item',
  templateUrl: './userright-item.component.html',
  styles: [
  ]
})
export class UserrightItemComponent {
  @Input() userright : Userright = UserrightFactory.empty();
  user : User = UserFactory.empty();
  canDelete : boolean = true;

  constructor( private bs : PadletService) {}

  ngOnInit(): void {
    this.bs.getUserById(this.userright.user_id).subscribe((res: User) => {
      this.user = res;
      this.bs.getSinglePadlet(this.userright.padlet_id).subscribe((res: Padlet) => {
        if(this.userright.user_id == res.user_id) {
          this.canDelete = false;
        }
      });
    });
  }

  delete() : void {
    this.bs.deleteUserright(this.userright.padlet_id.toString(), this.userright.user_id.toString()).subscribe(() => {
      window.location.reload();
    });
  }
}
