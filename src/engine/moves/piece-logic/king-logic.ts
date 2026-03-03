import { Piece, Colour } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { Move } from '../../../models/move';

import { simultateMove, isInCheck } from '../moves-utils/moves-utils';

import { getAttacks } from './attacks/attacks';
import { getCastlingMoves } from './misc-piece-logic/king-castling';

export function kingLogic(
  piece: Piece,
  pos: Position,
  board: Board
): Move[] {
  const colour = piece.colour;
  const possibleCastle: Move[] = getCastlingMoves(piece, pos, board);
  const possibleMoves: Move[] = getAttacks(piece, pos, board);
  let moves: Move[] = [];

  for(const p of possibleCastle){
    moves.push(p);
  }

  for(const p of possibleMoves){
    moves.push(p);
  }

  moves = moves.filter(move => {
    const sim: Board = simultateMove(move, board);
    return !isInCheck(colour, move.to, sim);
  });

  return moves;
}

