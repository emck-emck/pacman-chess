import { Position } from '../../models/position';

export function positionKey(pos: Position): string {
  return `${pos.row},${pos.col}`;
}