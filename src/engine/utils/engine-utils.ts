import { Piece } from '../../models/piece';
import { Position } from '../../models/position';
import { Board } from '../../models/board';
import { Move } from '../../models/move';

export function positionKey(pos: Position): string {
  return `${pos.row},${pos.col}`;
}

export function checkSquare(pos: Position, board: Board): (Piece | null) {
  return board[pos.row][pos.col];
}