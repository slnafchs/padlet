import {Component, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {User} from "../shared/user";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  ngOnInit() {
    this.padlets = [
      new Padlet(1,
        'Padlet 1', true,
        new User(1, 'Susi', 'Huber', 'test@test.at', 'secret',
          'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png')),
      new Padlet(2,
        'Padlet 2', false,
        new User(2, 'Antonia', 'Kriegner', 'test@test.at', 'secret',
          'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'))
    ]
  }
}
