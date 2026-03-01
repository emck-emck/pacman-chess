import { PieceType, Piece } from '../../models/piece';
import { Position } from '../../models/position';
import { Board } from '../../models/board';
import { Move } from '../../models/move';

import { pieceLogic } from './piece-logic/piece-logic';
import { pawnLogic } from './piece-logic/pawn-logic';
import { kingLogic } from './piece-logic/king-logic';

const logicMap: Record<
  PieceType,
  (piece: Piece, pos: Position, board: Board) => Move[]
> = {
  pawn: pawnLogic,
  rook: pieceLogic,
  knight: pieceLogic,
  bishop: pieceLogic,
  queen: pieceLogic,
  king: kingLogic,
};

/*===============
  TO IMPLEMENT:
  EN PASSANT
  PAWN PROMOTION
  CASTLING
  ===============*/

export function checkLegalMoves(
  piece: (Piece | null),
  pos: Position,
  board: Board
): Move[] {

  if(!piece) return [];
  const generator = logicMap[piece.type];
  return generator(piece, pos, board);
}
