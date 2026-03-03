import { Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { Move } from '../../../models/move';

import { BOARDSIZE } from '../../constants';

import { simultateMove, isInCheck, findKing } from '../moves-utils/moves-utils';

import { getAttacks } from './attacks/attacks';
import { getPawnMoves } from './misc-piece-logic/pawn-moves';
import { getPawnEnPassant } from './misc-piece-logic/pawn-en-passant';

import { generatePromotionMove } from '../moves-utils/moves-factory';

export function pawnLogic(
  piece: Piece,
  pos: Position,
  enPassantTarget: (Position | null),
  board: Board
): Move[] {
  const colour = piece.colour;
  let moves: Move[] = [];
  let ret: Move[] = [];
  const kingPos: Position | null = findKing(colour, board);
  const possibleAttacks: Move[] = getAttacks(piece, pos, board);
  const possibleMoves: Move[] = getPawnMoves(piece, pos, board);
  const possibleEnPassant: Move[] = getPawnEnPassant(piece, pos, enPassantTarget);
  const promoRank: number = piece.colour === 'white'? 0: (BOARDSIZE-1);
  
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

  // Identifes moves as promotions
  for(const m of moves){
    if(m.to.row === promoRank){
      const promoMove: Move = generatePromotionMove(m.from, m.to, m.capture);
      ret.push(promoMove);
    }else{
      ret.push(m);
    }
  }

  return ret.filter(move => {
    const sim: Board = simultateMove(move, board);
    return !isInCheck(colour, kingPos, sim);
  });
}
