import { Position } from "./position";

export interface Move {
    type: 'normal' | 'capture' | 'en-passant' | 'castle' | 'promotion';
    from: Position;
    to: Position;
    capture?: Position;
    secondaryMoves?: {
        from: Position;
        to: Position;
    };
};