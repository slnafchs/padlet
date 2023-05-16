import { Injectable } from '@angular/core';
import {User, Padlet } from './padlet';
import { Entrie } from './entrie';

@Injectable({
  providedIn: 'root'
})
export class PadletService {
  padlets: Padlet[];
  entries: Entrie[];
  constructor() {
   this.padlets = [
      new Padlet(1,
        'Padlet 1', true,
        new User(1, 'Susi', 'Huber', 'test@test.at', 'secret',
          'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png')),
      new Padlet(2,
        'Padlet 2', false,
        new User(2, 'Antonia', 'Kriegner', 'test@test.at', 'secret',
          'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'))
    ],
     this.entries = [
       new Entrie(1, new User(1, 'Susi', 'Huber', 'test@test.at', 'secret',
           'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'), new Padlet(1,
           'Padlet 1', true,
           new User(3, 'Julia', 'Müller', 'test@test.at', 'secret',
             'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png')),
         'Erster Eintrag', 'Blablabla'),
       new Entrie(2, new User(2, 'Susi', 'Huber', 'test@test.at', 'secret',
           'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'), new Padlet(1,
           'Padlet 1', true,
           new User(3, 'Julia', 'Müller', 'test@test.at', 'secret',
             'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png')),
         'Zweiter Eintrag', 'Blablabla')
     ]
  }
  getAllPadlets() {
    return this.padlets;
  }

  getAllEntries() {
    return this.entries;
  }
}
