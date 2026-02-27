import { Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';

import { simultateMove, isInCheck, findKing } from '../moves-utils';

import { getAttacks } from './attacks/attacks';

export function pieceLogic(
  piece: Piece,
  pos: Position,
  board: Board
): Position[] {
  const colour = piece.colour;
  const possible = getAttacks(piece, pos, board);
  const kingPos: Position | null = findKing(colour, board);

  if (!kingPos) return [];

  return possible.filter(move => {
    const sim: Board = simultateMove(pos, move, board);
    return !isInCheck(colour, kingPos, sim);
  });
}
