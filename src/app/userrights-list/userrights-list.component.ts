import { Component, OnInit } from '@angular/core';
import { PadletService } from '../shared/padlet.service';
import { ActivatedRoute } from '@angular/router';
import { Userright } from '../shared/userright';

@Component({
  selector: 'bs-userrights-list',
  templateUrl: './userrights-list.component.html',
  styles: [
  ]
})
export class UserrightsListComponent implements OnInit{
  userrights : Userright[] = []

  constructor(
    private bs: PadletService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["padlet_id"];
    this.bs.getUserrightsForPadlet(id.toString()).subscribe((res: any[]) => {
      for(let obj of res) {
        this.userrights.push(Userright.mapUserright(obj));
      }
    });
  }

}
