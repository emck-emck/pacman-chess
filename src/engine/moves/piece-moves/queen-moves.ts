import { Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';

import { getRBQMoves } from './misc-moves/r-b-q-moves';

export function getQueenMoves(
  piece: Piece,
  pos: Position,
  board: Board
): Position[] {
  
  const queenDirections: Position[] = [
    //Cross-wise
    {row: -1, col: 0},
    {row: 1, col: 0},
    {row: 0, col: -1},
    {row: 0, col: 1},
    //Diagonal
    {row: -1, col: -1},
    {row: -1, col: 1},
    {row: 1, col: -1},
    {row: 1, col: 1}
  ];
  
    return getRBQMoves(piece, pos, board, queenDirections);
}
