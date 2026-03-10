import { Piece, Colour } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { Move } from '../../../models/move';

import { simulateMove, isInCheck } from '../moves-utils/moves-utils';

import { getAttacks } from './attacks/attacks';
import { getCastlingMoves } from './misc-piece-logic/king-castling';
import { ChessEngine } from '../../chess-engine';

export function kingLogic(
  engine: ChessEngine,
  piece: Piece,
  pos: Position,
  board: Board
): Move[] {
  const colour = piece.colour;
  const possibleCastle: Move[] = getCastlingMoves(engine, piece, pos, board);
  const possibleMoves: Move[] = getAttacks(engine, piece, pos, board);
  let moves: Move[] = [];

  for(const p of possibleCastle){
    moves.push(p);
  }

  for(const p of possibleMoves){
    moves.push(p);
  }

  moves = moves.filter(move => {
    const sim: Board = simulateMove(move, board);
    return !isInCheck(engine, colour, move.to, sim);
  });

  return moves;
}

