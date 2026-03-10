import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardComponent } from './board/board-component';

@Component({
  selector: 'game',
  templateUrl: './game.html',
  styleUrl: './game.css',
  imports: [CommonModule, BoardComponent],
})
export class GameComponent {

  constructor() {}
}
