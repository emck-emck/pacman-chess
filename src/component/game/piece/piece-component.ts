import { Component, Input } from '@angular/core';
import { Piece } from '../../../models/piece';

@Component({
  selector: 'piece',
  templateUrl: './piece.html',
  styleUrl: './piece.css',
})
export class PieceComponent {
  @Input({ required: true }) piece!: Piece | null;

  ngOnInit() {}

  get displayPiece(): string {
    if (this.piece) {
      switch (this.piece.colour) {
        case 'white':
          switch (this.piece.type) {
            case 'pawn':
              return '♙';
            case 'rook':
              return '♖';
            case 'knight':
              return '♘';
            case 'bishop':
              return '♗';
            case 'queen':
              return '♕';
            case 'king':
              return '♔';
          }
        case 'black':
          switch (this.piece.type) {
            case 'pawn':
              return '♟';
            case 'rook':
              return '♜';
            case 'knight':
              return '♞';
            case 'bishop':
              return '♝';
            case 'queen':
              return '♛';
            case 'king':
              return '♚';
          }
      }
    }
    return '';
  }
}
