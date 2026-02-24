import { Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { moveColLeft, moveColRight } from '../../utils/moves-utils';
import { getKNMoves } from './misc-moves/k-n-moves';

export function getKnightMoves(
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

  return getKNMoves(piece, board, knightMoves);
}
