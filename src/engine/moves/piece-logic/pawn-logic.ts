import { Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';

import { simultateMove, isInCheck, findKing } from '../moves-utils';

import { getAttacks } from './attacks/attacks';
import { getPawnMoves } from './misc-piece-logic/pawn-moves';

export function pawnLogic(
  piece: Piece,
  pos: Position,
  board: Board
): Position[] {
  const colour = piece.colour;
  let moves: Position[] = [];
  const kingPos: Position | null = findKing(colour, board);
  const possibleAttacks: Position[] = getAttacks(piece, pos, board);
  const possibleMoves: Position[] = getPawnMoves(piece, pos, board);
  
  if(!kingPos) return [];

  for(const p of possibleAttacks){
    moves.push(p);
  }

  for(const p of possibleMoves){
    moves.push(p);
  }

  return moves.filter(move => {
    const sim: Board = simultateMove(pos, move, board);
    return !isInCheck(colour, kingPos, sim);
  });
}
