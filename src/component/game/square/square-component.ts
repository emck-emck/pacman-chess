import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Piece } from '../../../models/piece';
import { Position } from '../../../models/position';

import { PieceComponent } from '../piece/piece-component';

@Component({
  selector: 'square',
  templateUrl: './square.html',
  styleUrl: './square.css',
  imports: [PieceComponent, CommonModule],
})
export class SquareComponent {
  @Input({ required: true }) row!: number;
  @Input({ required: true }) col!: number;
  @Input({ required: true }) piece!: Piece | null;
  @Input({ required: true }) isLight!: boolean;
  @Input({ required: true }) isLegal!: boolean;
  @Input({ required: true }) isSelected!: boolean;
  
  @Output() squareClick = new EventEmitter<Position>();

  handleSquareClick() {
    this.squareClick.emit({ row: this.row, col: this.col });
  }

}
