import { Piece } from '../../../../../models/piece';
import { Position } from '../../../../../models/position';
import { Board } from '../../../../../models/board';
import { moveColLeft, moveColRight } from '../../../moves-utils';
import { getKNAttacks } from './misc-attacks/k-n-attacks';

export function getKingAttacks(
  piece: Piece,
  pos: Position,
  board: Board
): Position[] {
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

  return getKNAttacks(piece, board, kingMoves);
}
