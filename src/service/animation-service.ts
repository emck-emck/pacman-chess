import { PieceType } from '../models/piece';
import { Move } from '../models/move';

import { BOARDSIZE } from '../constants';

import { Directive, Injectable } from '@angular/core';
import { Direction } from '../models/direction';
import { Position } from '../models/position';

@Injectable({ providedIn: 'root' })
export class AnimationService {

  private pieceLayer!: HTMLElement;
  private boardElement!: HTMLElement;

  init(board: HTMLElement, layer: HTMLElement) {
    this.boardElement = board;
    this.pieceLayer = layer;
  }

  animateMove(move: Move): Promise<void> {
    return new Promise((resolve) => {

      // Determine piece start and end pixels
      const start = this.getSquareCenter(move.from.row, move.from.col);
      const end = this.getSquareCenter(move.to.row, move.to.col);

      // Generate animation piece
      const wrapper = document.createElement("div");
      wrapper.className = "floating-wrapper";

      const piece = document.createElement("span");
      if(move.piece.colour === 'white'){
        piece.className = "floating-piece white";
      }else{
        piece.className = "floating-piece black";
      }
      piece.innerText = this.getPieceDrawing(move.piece.type);

      wrapper.appendChild(piece);

      wrapper.style.left = `${start.col}px`;
      wrapper.style.top = `${start.col}px`;

      this.pieceLayer.appendChild(wrapper);

      // Determine proper animation and find wrap squares if needed
      let midfromrow: number = move.from.row.valueOf();
      let midfromcol: number = move.from.col.valueOf();
      let midtorow: number = midfromrow.valueOf();
      let midtocol: number = midfromcol.valueOf();
      let isWrap = false;
      while(true){
        midfromrow = midfromrow + move.direction.row;
        midfromcol = midfromcol + move.direction.col;

        if(midfromrow === BOARDSIZE || midfromrow === -1 || midfromcol === BOARDSIZE || midfromcol === -1){
          isWrap = true;
          
          // Compute teleport square row
          if(midfromrow === BOARDSIZE){
            midtorow = 0;
          }else if(midfromrow === -1){
            midtorow = BOARDSIZE - 1;
          }

          // Compute teleport square col
          if(midfromcol === BOARDSIZE){
            midtocol = 0;
          }else if(midfromcol === -1){
            midtocol = BOARDSIZE - 1;
          }

          midfromrow = midfromrow - move.direction.row;
          midfromcol = midfromcol - move.direction.col;
          
          break;
        }else if(midfromrow === move.to.row && midfromcol === move.to.col){
          break;
        }
      }

      console.log(start);
      console.log(end);

      // Animate
      if(isWrap){
        // Get wrap pixel coordinates
        const midfrom = this.getMidFrom(midfromrow, midfromcol, move.direction);
        const midto = this.getMidTo(midtorow, midtocol, move.direction);

        // 2-frame animation
        requestAnimationFrame(() => {
          wrapper.style.left = `${midfrom.col}px`;
          wrapper.style.top = `${midfrom.row}px`;

          requestAnimationFrame(() => {
            wrapper.style.visibility = 'hidden';
            wrapper.style.left = `${midto.col}px`;
            wrapper.style.top = `${midto.row}px`;

            requestAnimationFrame(() => {
              wrapper.style.left = `${end.col}px`;
              wrapper.style.top = `${end.row}px`;
            });
          });
        });

      }else{
        requestAnimationFrame(() => {
          wrapper.style.left = `${end.col}px`;
          wrapper.style.top = `${end.row}px`;
        });
      }
      
      // Destroy animation element and return
      wrapper.addEventListener("transitionend", () => {
        console.log("Transition end");
        wrapper.remove();
        resolve();
      }, { once: true });

    });
  }

  private getSquareCenter(row: number, col: number): Position {

    const square = this.getSquareElement(row, col)

    const rect = square.getBoundingClientRect();
    const boardRect = this.boardElement.getBoundingClientRect();

    return {
      col: rect.left - boardRect.left + rect.width / 2,
      row: rect.top - boardRect.top + rect.height / 2
    };
  }

  getMidFrom(fromrow: number, fromcol: number, direction: Direction): Position {
    let mid = this.getSquareCenter(fromrow, fromcol);

    mid.row += (direction.row*60);
    mid.col += (direction.col*60);

    return mid;
  }

  getMidTo(fromrow: number, fromcol: number, direction: Direction): Position {
    let mid = this.getSquareCenter(fromrow, fromcol);

    mid.row -= (direction.row*60);
    mid.col -= (direction.col*60);

    return mid;
  }

  getPieceDrawing(type: PieceType): string {
    switch (type) {
        case 'pawn':
          return '♟';
        case 'rook':
          return '♜';
        case 'knight':
          return '♞';
        case 'bishop':
          return '♝';
        case 'queen':
          return '♛';
        case 'king':
          return '♚';
      }
  }

  getSquareElement(row: number, col: number): Element {
    const selector =`.s[row="${row}"][col="${col}"]`;
    const el = this.boardElement.querySelector(selector)!;
    return el;
  }
}