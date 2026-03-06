import { PieceType } from "./piece";
import { Position } from "./position";

type MoveType = 
    | 'normal' 
    | 'capture' 
    | 'en-passant' 
    | 'castle' 
    | 'promotion';

export interface Move {
    type: MoveType;
    from: Position;
    to: Position;
    capture?: Position;
    secondaryMoves?: {
        from: Position;
        to: Position;
    };
    promotion?: PieceType
};