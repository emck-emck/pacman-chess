import { Component, Input } from '@angular/core';
import { Piece } from '../../models/piece';

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
              return 'WP';
            case 'rook':
              return 'WR';
            case 'knight':
              return 'WN';
            case 'bishop':
              return 'WB';
            case 'queen':
              return 'WQ';
            case 'king':
              return 'WK';
          }
        case 'black':
          switch (this.piece.type) {
            case 'pawn':
              return 'BP';
            case 'rook':
              return 'BR';
            case 'knight':
              return 'BN';
            case 'bishop':
              return 'BB';
            case 'queen':
              return 'BQ';
            case 'king':
              return 'BK';
          }
      }
    }
    return '';
  }
}
