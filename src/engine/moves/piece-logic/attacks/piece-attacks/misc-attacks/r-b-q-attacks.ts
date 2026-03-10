import { Piece } from '../../../../../../models/piece';
import { Position } from '../../../../../../models/position';
import { Board } from '../../../../../../models/board';
import { Move } from '../../../../../../models/move';
import { BOARDSIZE } from '../../../../../constants';

import { generateNormalMove, generateCaptureMove } from '../../../../moves-utils/moves-factory';

import { ChessEngine } from '../../../../../chess-engine';


export function getRBQAttacks(
  engine: ChessEngine,
  piece: Piece,
  pos: Position,
  board: Board,
  directions: Position[]
): Move[] {
  let to: Position;
  let occPiece: Piece | null = null;
  let ret: Move[] = [];

  for(const d of directions){
      for(let i = 1; i < BOARDSIZE ; i++){ //Variable i is equal to the number of diagonal squares away a piece is
        //Reinitialize what direction we're checking
        to = structuredClone(d);
        //Row logic is straightforward
        to.row = pos.row + to.row*i;
        //Col logic is modulus magic; it matters which side of the board we're checking
        if(to.col > 0){
          to.col = engine.moveColRight(pos.col, i);
        }else if(to.col < 0){
          to.col = engine.moveColLeft(pos.col, i);
        }else{
          to.col = pos.col;
        }

        //If the square we're checking doesn't exist, check next direction
        if(!engine.isInBounds(to, board)) break;

        occPiece = engine.checkSquare(to, board);
        if(!occPiece){
          ret.push(generateNormalMove(pos, to));
        }else{
          if(piece.colour != occPiece.colour){
            ret.push(generateCaptureMove(pos, to, to));
          }
          break;
        }
    }
  }

  return ret;
}
