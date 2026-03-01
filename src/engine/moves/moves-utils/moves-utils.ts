import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { Piece, Colour } from '../../../models/piece';
import { Move } from '../../../models/move';
import { BOARDSIZE } from '../../constants';

import { positionKey } from '../../utils/engine-utils';
import { getAttacks } from '../piece-logic/attacks/attacks';

export function uniqueMoves(moves: Move[]): Move[] {
  const seen = new Set<string>();

  return moves.filter(move => {
    const key = positionKey(move.to);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function simultateMove(from: Position, to: Position, board: Board): Board{
  let simBoard: Board = structuredClone(board);
  const piece = simBoard[from.row][from.col];
  simBoard[to.row][to.col] = piece;
  simBoard[from.row][from.col] = null;
  return simBoard;
}

export function isInCheck(colour: Colour, kingPos: Position, board: Board): boolean{
  for(let row = 0; row < board.length; row++){
    for(let col = 0; col < board[row].length; col++){
      const piece: Piece | null = board[row][col];
      if(!piece) continue; //Don't check empty square attacks
      if(piece.colour == colour) continue; //Don't check ally piece attacks
      
      const pos: Position = {row: row, col: col}; //Get piece position
      const attacks = getAttacks(piece, pos, board);
      if (attacks.some(p =>                                                                                                                                    
        p.to.row === kingPos.row &&
        p.to.col === kingPos.col
      )) {
        return true;
      }
    }
  }

  return false;
}

export function findKing (colour: Colour, board: Board): Position | null{
  for(let row = 0; row < board.length; row++){
    for(let col = 0; col < board[row].length; col++){
      const piece: Piece | null = board[row][col];
      if(!piece) continue; //Don't check empty squares
      if(piece.colour == colour && piece.type == 'king'){
        return {row: row, col: col};
      }
    }
  }
  return null;
}

//MOVEBY MUST BE LESS THAN BOARD SIZE
export function moveColLeft(col: number, moveBy: number): number {
  return ((col + (BOARDSIZE - moveBy)) % BOARDSIZE)
}

export function moveColRight(col: number, moveBy: number): number{
  return ((col + moveBy) % BOARDSIZE);
}