import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { Piece, Colour } from '../../../models/piece';
import { Move } from '../../../models/move';

import { ChessEngine } from '../../chess-engine';

import { positionKey } from '../../utils/engine-utils';
import { getAttacks } from '../piece-logic/attacks/attacks';

export function findKing (colour: Colour, board: Board): Position | null{
  for(let row = 0; row < board.length; row++){
    for(let col = 0; col < board[row].length; col++){
      const piece: Piece | null = board[row][col];
      if(!piece) continue; //Don't check empty squares
      if(piece.colour === colour && piece.type === 'king'){
        return {row: row, col: col};
      }
    }
  }
  return null;
}

export function isInCheck(engine: ChessEngine, colour: Colour, kingPos: Position, board: Board): boolean{
  for(let row = 0; row < board.length; row++){
    for(let col = 0; col < board[row].length; col++){
      const piece: Piece | null = board[row][col];
      if(!piece) continue; //Don't check empty square attacks
      if(piece.colour == colour) continue; //Don't check ally piece attacks
      
      const pos: Position = {row: row, col: col}; //Get piece position
      const attacks = getAttacks(engine, piece, pos, board);
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

export function simulateMove(move: Move, board: Board): Board{
  let simBoard: Board = structuredClone(board);
  const piece: (Piece | null) = simBoard[move.from.row][move.from.col];
  // Implement capture tracking
      if(move.capture){
        simBoard[move.capture.row][move.capture.col] = null;
      }
      // MOVE LOGIC
      switch(move.type){
        case 'normal':
        case 'capture':
        case 'en-passant':
        case 'promotion':
          simBoard[move.from.row][move.from.col] = null;
          simBoard[move.to.row][move.to.col] = piece;
          break;
        case 'castle':
          break;
      }
  return simBoard;
}

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