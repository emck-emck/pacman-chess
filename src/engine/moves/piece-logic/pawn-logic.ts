import { Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { Move } from '../../../models/move';

import { simultateMove, isInCheck, findKing } from '../moves-utils/moves-utils';

import { getAttacks } from './attacks/attacks';
import { getPawnMoves } from './misc-piece-logic/pawn-moves';
import { getPawnEnPassant } from './misc-piece-logic/pawn-en-passant';

export function pawnLogic(
  piece: Piece,
  pos: Position,
  enPassantTarget: (Position | null),
  board: Board
): Move[] {
  const colour = piece.colour;
  let moves: Move[] = [];
  const kingPos: Position | null = findKing(colour, board);
  const possibleAttacks: Move[] = getAttacks(piece, pos, board);
  const possibleMoves: Move[] = getPawnMoves(piece, pos, board);
  const possibleEnPassant: Move[] = getPawnEnPassant(piece, pos, enPassantTarget);
  
  if(!kingPos) return [];

  for(const p of possibleAttacks){
    moves.push(p);
  }

  for(const p of possibleMoves){
    moves.push(p);
  }

  for(const p of possibleEnPassant){
    moves.push(p);
  }

  return moves.filter(move => {
    const sim: Board = simultateMove(move, board);
    return !isInCheck(colour, kingPos, sim);
  });
}
