import { Piece, Colour } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { Move } from '../../../models/move';

import { simultateMove, isInCheck } from '../moves-utils/moves-utils';

import { getAttacks } from './attacks/attacks';

export function kingLogic(
  piece: Piece,
  pos: Position,
  board: Board
): Move[] {
  const colour = piece.colour;
  let moves: Move[] = [];
  
  if(!isInCheck(colour, pos, board)){
    //Check for castling
    let castleMoves: Move[] = castlingMoves(piece, colour, board);
    for(const m of castleMoves){
      moves.push(m);
    }
  }  

   
  //Normal piece move logic
  let possible = getAttacks(piece, pos, board);
  possible = possible.filter(move => {
    const sim: Board = simultateMove(pos, move.to, board);
    return !isInCheck(colour, move.to, sim);
  });

  //Add possible moves to return array
  for(const p of possible){
    moves.push(p);
  }

  return moves;
}

function castlingMoves(king: Piece, colour: Colour, board: Board): Move[]{
  const backRank: number = colour == 'white'? 7: 0;
  let ret: Move[] = [];
  let validRook: Piece[];
  //Return empty array if king has moved
  if(king.hasMoved) return ret;
  //Find rooks
  const rooks = findRooks(board);
  for(const r of rooks){
    if(!r.hasMoved){

    }
  }
  //Check squares between rook and king are empty

  //Check king does not travel through check

  return ret;
}

function findRooks(board: Board): Piece[]{
  return [];
}