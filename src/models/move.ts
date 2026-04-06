import { Piece, PieceType } from "./piece";
import { Direction } from "./direction";
import { Position } from "./position";

type MoveType = 
    | 'normal' 
    | 'capture' 
    | 'en-passant' 
    | 'castle' 
    | 'promotion';

export interface Move {
    piece: Piece;
    type: MoveType;
    from: Position;
    to: Position;
    direction: Direction;
    capture?: Position;
    secondaryMoves?: {
        from: Position;
        to: Position;
    };
    promotion?: PieceType
};