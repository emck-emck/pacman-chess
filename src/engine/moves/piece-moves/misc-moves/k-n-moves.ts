import { Piece } from '../../../../models/piece';
import { Position } from '../../../../models/position';
import { Board } from '../../../../models/board';
import { checkSquare } from '../../../utils/moves-utils';
import { BOARDSIZE } from '../../../constants';

export function getKNMoves(
  piece: Piece,
  board: Board,
  moves: Position[]
): Position[] {

  let occPiece: Piece | null = null;
  let ret: Position[] = []

  for(var d = 0; d < moves.length; d++){
    //Check bounds
    if((moves[d].row > (BOARDSIZE-1)) || moves[d].row < 0) continue;

    //Check piece in way
    occPiece = checkSquare(moves[d], board);
    //If no piece in way
    if(!occPiece || occPiece.colour != piece.colour) ret.push(moves[d]);

  }
  return ret;
}
