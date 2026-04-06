import { Piece } from '../../../../../models/piece';
import { Position } from '../../../../../models/position';
import { Board } from '../../../../../models/board';
import { Move } from '../../../../../models/move';

import { getKNAttacks } from './misc-attacks/k-n-attacks';
import { ChessEngine } from '../../../../chess-engine';

export function getKingAttacks(
  engine: ChessEngine,
  piece: Piece,
  pos: Position,
  board: Board
): Move[] {
  const kingMoves: Position[] = [
    {row: -1, col: -1},
    {row: -1, col: 0},
    {row: -1, col: 1},
    {row: 0, col: -1},
    {row: 0, col: 1},
    {row: 1, col: -1},
    {row: 1, col: 0},
    {row: 1, col: 1}
  ];

  return getKNAttacks(engine, piece, pos, board, kingMoves);
}
