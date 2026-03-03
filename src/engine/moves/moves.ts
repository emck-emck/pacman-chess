import { PieceType, Piece } from '../../models/piece';
import { Position } from '../../models/position';
import { Board } from '../../models/board';
import { Move } from '../../models/move';

import { uniqueMoves } from './moves-utils/moves-utils';

import { pieceLogic } from './piece-logic/piece-logic';
import { pawnLogic } from './piece-logic/pawn-logic';
import { kingLogic } from './piece-logic/king-logic';

const logicMap: Record<
  PieceType,
  (piece: Piece, pos: Position, board: Board) => Move[]
> = {
  pawn: pieceLogic, // PAWN LOGIC NOT USED HERE
  rook: pieceLogic,
  knight: pieceLogic,
  bishop: pieceLogic,
  queen: pieceLogic,
  king: kingLogic,
};

/*===============
  TO IMPLEMENT:
  PAWN PROMOTION
  ===============*/

export function checkLegalMoves(
  piece: (Piece | null),
  pos: Position,
  enPassantTarget: (Position | null),
  board: Board
): Move[] {

  if(!piece) return [];

  // OVERRIDES LOGICMAP
  if(piece.type === 'pawn') return uniqueMoves(pawnLogic(piece, pos, enPassantTarget, board));

  const generator = logicMap[piece.type];
  return uniqueMoves(generator(piece, pos, board));
}
