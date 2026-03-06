import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardComponent } from './board/board-component';
import { PromotionComponent } from './promotion/promotion-component';

@Component({
  selector: 'game',
  templateUrl: './game.html',
  styleUrl: './game.css',
  imports: [CommonModule, BoardComponent, PromotionComponent],
})
export class GameComponent {

  constructor() {}
}
