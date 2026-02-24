import { Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';

import { getRBQMoves } from './misc-moves/r-b-q-moves';

export function getRookMoves(
  piece: Piece,
  pos: Position,
  board: Board
): Position[] {
  
  const rookDirections: Position[] = [
    {row: -1, col: 0},
    {row: 1, col: 0},
    {row: 0, col: -1},
    {row: 0, col: 1},
  ];
  
    return getRBQMoves(piece, pos, board, rookDirections);
}
