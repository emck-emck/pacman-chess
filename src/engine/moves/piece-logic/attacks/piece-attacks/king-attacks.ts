import { Piece } from '../../../../../models/piece';
import { Position } from '../../../../../models/position';
import { Board } from '../../../../../models/board';
import { Move } from '../../../../../models/move';

import { moveColLeft, moveColRight } from '../../../moves-utils/moves-utils';

import { getKNAttacks } from './misc-attacks/k-n-attacks';

export function getKingAttacks(
  piece: Piece,
  pos: Position,
  board: Board
): Move[] {
  const kingMoves: Position[] = [
    {row: pos.row -1, col: moveColLeft(pos.col, 1)},
    {row: pos.row -1, col: pos.col},
    {row: pos.row -1, col: moveColRight(pos.col, 1)},
    {row: pos.row, col: moveColLeft(pos.col, 1)},
    {row: pos.row, col: moveColRight(pos.col, 1)},
    {row: pos.row + 1, col: moveColLeft(pos.col, 1)},
    {row: pos.row + 1, col: pos.col},
    {row: pos.row + 1, col: moveColRight(pos.col, 1)}
  ];

  return getKNAttacks(piece, pos, board, kingMoves);
}
