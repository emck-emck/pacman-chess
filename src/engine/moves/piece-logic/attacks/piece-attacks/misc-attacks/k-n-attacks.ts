import { Piece } from '../../../../../../models/piece';
import { Position } from '../../../../../../models/position';
import { Board } from '../../../../../../models/board';
import { BOARDSIZE } from '../../../../../constants';

import { checkSquare } from '../../../../../utils/engine-utils';

export function getKNAttacks(
  piece: Piece,
  board: Board,
  moves: Position[]
): Position[] {

  let occPiece: Piece | null = null;
  let ret: Position[] = []

  for(const m of moves){
    //Check bounds
    if((m.row > (BOARDSIZE-1)) || m.row < 0) continue;

    //Check piece in way
    occPiece = checkSquare(m, board);
    //If no piece in way
    if(!occPiece || occPiece.colour != piece.colour) ret.push(m);

  }
  return ret;
}
