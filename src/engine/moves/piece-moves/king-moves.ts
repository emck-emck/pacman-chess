import { Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { moveColLeft, moveColRight } from '../../utils/moves-utils';
import { getKNMoves } from './misc-moves/k-n-moves';

export function getKingMoves(
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

  return getKNMoves(piece, board, kingMoves);
}
