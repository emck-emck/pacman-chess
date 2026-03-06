import { Piece, Colour } from '../../../../models/piece';
import { Position } from '../../../../models/position';
import { Board } from '../../../../models/board';
import { Move } from '../../../../models/move';

import { BOARDSIZE } from '../../../constants';

import { generateCastlingMove } from '../../moves-utils/moves-factory';
import { isInCheck } from '../../moves-utils/moves-utils';

function compareColumns(col1: number, col2: number, direction: number, extraParam: number = 0): boolean{
    if (direction > 0){
        return col1 < col2 + extraParam;
    }else{
        return col1 > col2 - extraParam;
    }
}

export function getCastlingMoves(king: Piece, pos: Position, board: Board): Move[]{
  const colour: Colour = king.colour
  const backRank: number = colour === 'white'? (BOARDSIZE - 1): 0;
  let ret: Move[] = [];

  //Return empty array if king has moved
  if(king.hasMoved) return ret;

  //Return empty array if king is in check
  if(isInCheck(colour, pos, board)) return ret;
  
  //Find rooks
  const rooks: Position[] = findRooks(board, colour, backRank);
  
  for(const r of rooks){
    //Figure out if it's the rook to the left or to the right
    const direction: number = (pos.col > r.col)? -1: 1; 

    //Check squares between rook and king are empty
    let clear: boolean = true;
    console.log('Checking squares are empty');
    for(let col = pos.col + direction; compareColumns(col, r.col, direction); col = col + direction){ 
        if(board[backRank][col]){
            clear = false;
            break;
        }
    }
    if(!clear) continue;

    console.log("Checking king does not travel through check");
    //Check king does not travel through check
    for(let col = pos.col + direction; compareColumns(col, pos.col, direction, 2); col = col + direction){
        const kingSimMove: Position = {row: backRank, col: col};
        if(isInCheck(colour, kingSimMove, board)){
            clear = false;
            break;
        }
    } 
    //Pass castle move to return array
    if(clear){
        const from: Position = {row: pos.row, col: pos.col};
        const to: Position = {row: pos.row, col: (pos.col + (direction*2))};
        const rFrom: Position = r;
        const rTo: Position = {row: r.row, col: (pos.col + direction)};
        ret.push(generateCastlingMove(from, to, rFrom, rTo));
        console.log('Adding castling move');
    }
    
  }

  return ret;
}

function findRooks(board: Board, colour: Colour, backRank: number): Position[]{
  let ret: Position[] = [];
  let piece: (Piece | null);

  //Find first rook
  piece = board[backRank][0];
  if(piece && piece.type === 'rook' && piece.colour === colour && !piece.hasMoved){
    ret.push({row: backRank, col: 0});
  }

  //Find second rook
  piece = board[backRank][BOARDSIZE-1];
  if(piece && piece.type === 'rook' && piece.colour === colour && !piece.hasMoved){
    ret.push({row: backRank, col: BOARDSIZE-1});
  }

  return ret;
}