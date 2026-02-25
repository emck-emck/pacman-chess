import { Piece } from '../../../../../models/piece';
import { Position } from '../../../../../models/position';
import { Board } from '../../../../../models/board';
import { BOARDSIZE } from '../../../../constants';

import { moveColLeft, moveColRight } from '../../../moves-utils';
import { checkSquare } from '../../../../utils/engine-utils';

/**
 * The problems:
 * 1) Mod logic for going right - FIXED
 * 2) The "to" variable is seemingly mutating the data in bishopDirections even though it's constant..?
 */
export function getRBQAttacks(
  piece: Piece,
  pos: Position,
  board: Board,
  directions: Position[]
): Position[] {
  let to: Position;
  let occPiece: Piece | null = null;
  let ret: Position[] = [];

  for(let d = 0; d < directions.length; d++){
      for(let i = 1; i < BOARDSIZE ; i++){ //Variable i is equal to the number of diagonal squares away a piece is
        //Reinitialize what direction we're checking
        to = structuredClone(directions[d]);
        //Row logic is straightforward
        to.row = pos.row + to.row*i;
        //Col logic is modulus magic; it matters which side of the board we're checking
        if(to.col > 0){
          to.col = moveColRight(pos.col, i);
        }else if(to.col < 0){
          to.col = moveColLeft(pos.col, i);
        }else{
          to.col = pos.col;
        }

        //If the square we're checking doesn't exist, check next direction
        if(to.row > (BOARDSIZE-1) || to.row < 0) break;


        occPiece = checkSquare(to, board);
        if(!occPiece){
          ret.push({row: to.row, col: to.col});
        }else{
          if(piece.colour != occPiece.colour){
            ret.push({row: to.row, col: to.col});
          }
          break;
        }
    }
  }

  return ret;
}
