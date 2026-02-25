import { PieceType, Piece } from '../../models/piece';
import { Position } from '../../models/position';
import { Board } from '../../models/board';

import { getAttacks } from './attacks/attacks';

export function checkLegalMoves(
  piece: (Piece | null),
  pos: Position,
  board: Board
): Position[] {

  if(!piece) return [];
  return getAttacks(piece, pos, board);
}
