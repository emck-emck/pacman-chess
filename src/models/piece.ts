export type PieceType =
  | 'pawn'
  | 'rook'
  | 'knight'
  | 'bishop'
  | 'queen'
  | 'king';

export type Colour = 'white' | 'black';

export interface Piece {
  type: PieceType;
  colour: Colour;
  hasMoved: boolean;
}