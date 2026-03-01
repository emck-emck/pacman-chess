import { Colour, Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { Move } from '../../../models/move';

import { simultateMove, isInCheck, findKing } from '../moves-utils/moves-utils';

import { getAttacks } from './attacks/attacks';

export function pieceLogic(
  piece: Piece,
  pos: Position,
  board: Board
): Move[] {
  const colour: Colour = piece.colour;
  const possible: Move[] = getAttacks(piece, pos, board);
  const kingPos: Position | null = findKing(colour, board);

  if (!kingPos) return [];

  return possible.filter(move => {
    const sim: Board = simultateMove(pos, move.to, board);
    return !isInCheck(colour, kingPos, sim);
  });
}
