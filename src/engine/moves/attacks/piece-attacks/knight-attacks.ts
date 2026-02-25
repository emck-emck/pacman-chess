import { Piece } from '../../../../models/piece';
import { Position } from '../../../../models/position';
import { Board } from '../../../../models/board';
import { moveColLeft, moveColRight } from '../../moves-utils';
import { getKNAttacks } from './misc-attacks/k-n-attacks';

export function getKnightAttacks(
  piece: Piece,
  pos: Position,
  board: Board
): Position[] {

  const knightMoves: Position[] = [
    {row: pos.row-2, col: moveColRight(pos.col, 1)},
    {row: pos.row-2, col: moveColLeft(pos.col, 1)},
    {row: pos.row-1, col: moveColRight(pos.col, 2)},
    {row: pos.row-1, col: moveColLeft(pos.col, 2)},
    {row: pos.row+1, col: moveColRight(pos.col, 2)},
    {row: pos.row+1, col: moveColLeft(pos.col, 2)},
    {row: pos.row+2, col: moveColRight(pos.col, 1)},
    {row: pos.row+2, col: moveColLeft(pos.col, 1)}
  ];

  return getKNAttacks(piece, board, knightMoves);
}
